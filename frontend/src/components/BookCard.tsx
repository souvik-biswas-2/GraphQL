'use client'

import { BookDoc } from '@/types'

interface BookCardProps {
  book: BookDoc
  onEdit?: (book: BookDoc) => void
  onDelete?: (id: string) => void
  isDeleting?: boolean
}

export function BookCard({ book, onEdit, onDelete, isDeleting = false }: BookCardProps) {
  return (
    <div className="group relative bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-600 hover:border-blue-500 transform hover:-translate-y-2 overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-transparent to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      {/* Card Header with gradient */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700 relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{book.title}</h3>
        <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {book.genre}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4 relative z-10">
        <div>
          <p className="text-slate-400 font-semibold text-sm">👤 Author</p>
          <p className="text-slate-100 font-medium text-lg">{book.author}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 font-semibold text-sm">📅 Year</p>
            <p className="text-slate-100 font-medium text-lg">{book.year}</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold text-sm">🏢 Publisher</p>
            <p className="text-slate-100 font-medium text-lg">{book.publisher}</p>
          </div>
        </div>

        <div className="text-xs text-slate-500 border-t border-slate-700 pt-4">
          Added on {new Date(book.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Card Footer with Actions */}
      <div className="bg-slate-900 px-6 py-4 flex gap-3 border-t border-slate-700 relative z-10">
        {onEdit && (
          <button
            onClick={() => onEdit(book)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm"
          >
            ✏️ Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(book._id as string)}
            disabled={isDeleting}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-2 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? '⏳ Deleting...' : '🗑️ Delete'}
          </button>
        )}
      </div>
    </div>
  )
}
