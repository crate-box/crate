import type { SVGProps } from "./types"

export default function Logo(props: SVGProps) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2_3)">
        <rect
          x="40"
          y="40"
          width="432"
          height="432"
          stroke="currentColor"
          strokeWidth="80"
        />
      </g>
    </svg>
  )
}
