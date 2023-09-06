export default function Youtube({
  id,
  title = "Youtube Video",
}: {
  id: string
  title?: string
}) {
  return (
    <iframe
      className="mt-6 aspect-[16/9] w-full rounded-lg"
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  )
}
