export default function Container({children}: any): JSX.Element {
  return (
    <div className="max-w-6xl m-auto p-8">
      {children}
    </div>
  )
}