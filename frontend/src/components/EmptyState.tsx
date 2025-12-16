interface EmptyStateProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-7xl mb-6 animate-bounce">📚</div>
      <h3 className="text-3xl font-bold text-slate-100 mb-3">{title}</h3>
      {description && (
        <p className="text-slate-400 mb-8 max-w-md text-lg">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg transition-all font-bold shadow-lg hover:shadow-xl text-base"
        >
          ✨ {action.label}
        </button>
      )}
    </div>
  )
}
