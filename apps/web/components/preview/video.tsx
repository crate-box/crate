import ReactPlayer from "react-player"

export default function Video({ url }: { url: string }) {
  return (
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      className="mt-6 overflow-hidden rounded-lg"
    />
  )
}
