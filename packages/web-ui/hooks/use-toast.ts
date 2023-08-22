import * as React from "react"

import type { ToastActionElement, ToastRootProps } from "../components/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastRootProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

enum ToastActionType {
  ADD_TOAST = "ADD_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  DISMISS_TOAST = "DISMISS_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Action =
  | { type: ToastActionType.ADD_TOAST; toast: ToasterToast }
  | { type: ToastActionType.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: ToastActionType.DISMISS_TOAST; id?: ToasterToast["id"] }
  | { type: ToastActionType.REMOVE_TOAST; id?: ToasterToast["id"] }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(id: string) {
  if (toastTimeouts.has(id)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(id)
    dispatch({ type: ToastActionType.REMOVE_TOAST, id })
  }, TOAST_REMOVE_DELAY)
  return timeout
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ToastActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    case ToastActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
    case ToastActionType.DISMISS_TOAST: {
      if (action.id) {
        addToRemoveQueue(action.id)
      } else {
        state.toasts.forEach((t) => {
          addToRemoveQueue(t.id)
        })
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id || action.id === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }
    case ToastActionType.REMOVE_TOAST: {
      if (action.id) {
        return {
          ...state,
          toasts: [],
        }
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      }
    }
    default:
      return state
  }
}

const listeners: React.Dispatch<React.SetStateAction<State>>[] = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()
  const update = (props: ToasterToast) =>
    dispatch({ type: ToastActionType.UPDATE_TOAST, toast: { ...props, id } })
  const dismiss = () => dispatch({ type: ToastActionType.DISMISS_TOAST, id })

  dispatch({
    type: ToastActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (id?: string) =>
      dispatch({ type: ToastActionType.DISMISS_TOAST, id }),
  }
}

export { toast, useToast }
