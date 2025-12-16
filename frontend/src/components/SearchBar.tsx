'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  isLoading?: boolean
}

export function SearchBar({
  onSearch,
  placeholder = 'Search books by title, author, or genre...',
  isLoading = false,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleClear = () => {
    setSearchQuery('')
    onSearch('')
  }

  return (
    <div className="w-full">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          disabled={isLoading}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-slate-800 text-slate-100 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50 placeholder-slate-500 font-medium text-lg"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xl transition-colors font-bold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
