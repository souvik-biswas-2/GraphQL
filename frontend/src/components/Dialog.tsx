'use client'

import { ReactNode, useEffect } from 'react'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  // Close dialog on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] border border-slate-600 relative overflow-hidden group flex flex-col">
          {/* Glowing effect background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-600 bg-gradient-to-r from-blue-600 to-blue-500 relative z-10 flex-shrink-0">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-100 text-2xl leading-none font-bold transition-colors hover:scale-110 transform duration-200"
            >
              ×
            </button>
          </div>

          {/* Content - scrollable area */}
          <div className="p-6 relative z-10 overflow-y-auto flex-1 scrollbar-hide">{children}</div>
        </div>
      </div>
    </>
  )
}
