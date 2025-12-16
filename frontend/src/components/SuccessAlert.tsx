interface SuccessAlertProps {
  message: string
  onDismiss?: () => void
}

export function SuccessAlert({ message, onDismiss }: SuccessAlertProps) {
  return (
    <div className="bg-green-900 border-2 border-green-700 text-green-100 px-5 py-4 rounded-lg flex items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-top">
      <div className="flex items-start gap-3">
        <span className="text-xl">✅</span>
        <div>
          <p className="font-bold text-green-100">Success</p>
          <p className="text-sm text-green-200">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-green-300 hover:text-green-100 ml-2 text-xl font-bold transition-colors flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  )
}
