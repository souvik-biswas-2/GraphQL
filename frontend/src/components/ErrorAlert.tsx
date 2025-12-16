interface ErrorAlertProps {
  message: string
  onDismiss?: () => void
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="bg-red-900 border-2 border-red-700 text-red-100 px-5 py-4 rounded-lg flex items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-top">
      <div className="flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="font-bold text-red-100">Error</p>
          <p className="text-sm text-red-200">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-300 hover:text-red-100 ml-2 text-xl font-bold transition-colors flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  )
}
