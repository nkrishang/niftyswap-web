export default function Container({children}: any) {
  return (
    <div className="max-w-6xl m-auto px-8 py-8">
      {children}
    </div>
  )
}