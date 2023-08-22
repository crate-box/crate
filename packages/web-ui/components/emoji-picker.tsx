"use client"

import type { EmojiClickData } from "emoji-picker-react"
import Picker, { Emoji as EmojiContainer, EmojiStyle } from "emoji-picker-react"

function EmojiPicker({
  onSelect,
}: {
  onSelect: (emojiData: EmojiClickData) => void
}) {
  return <Picker emojiStyle={EmojiStyle.NATIVE} onEmojiClick={onSelect} />
}

function Emoji({ emoji, size = 18 }: { emoji: string; size?: number }) {
  return (
    <EmojiContainer
      unified={emoji}
      size={size}
      emojiStyle={EmojiStyle.NATIVE}
    />
  )
}

export { EmojiPicker, Emoji }
