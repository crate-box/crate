interface SettingsOptionProps extends React.PropsWithChildren {
  title: string
  description: string
}
export default function SettingsOption({
  title,
  description,
  children,
}: SettingsOptionProps) {
  return (
    <div className="flex flex-col items-stretch gap-2 py-4">
      <h3 className="font-medium">{title}</h3>
      <p className="text-slate-300">{description}</p>
      <div>{children}</div>
    </div>
  )
}
