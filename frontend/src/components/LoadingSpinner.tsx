export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-16">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 animate-spin" />
      </div>
      <span className="text-slate-400 font-semibold text-lg">Loading books...</span>
    </div>
  )
}
