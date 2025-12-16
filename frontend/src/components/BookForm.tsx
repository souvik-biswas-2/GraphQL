'use client'

import { BookDoc } from '@/types'
import { useState } from 'react'

interface BookFormProps {
  initialData?: BookDoc | null
  onSubmit: (data: Omit<BookDoc, '_id' | 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  isLoading?: boolean
  onCancel?: () => void
}

export function BookForm({
  initialData,
  onSubmit,
  isLoading = false,
  onCancel,
}: BookFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    year: initialData?.year || new Date().getFullYear(),
    genre: initialData?.genre || '',
    publisher: initialData?.publisher || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.author.trim()) newErrors.author = 'Author is required'
    if (!formData.year || formData.year < 1000 || formData.year > new Date().getFullYear() + 10) {
      newErrors.year = 'Please enter a valid year'
    }
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required'
    if (!formData.publisher.trim()) newErrors.publisher = 'Publisher is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await onSubmit(formData)
      // Reset form after successful submission if adding new book
      if (!initialData) {
        setFormData({
          title: '',
          author: '',
          year: new Date().getFullYear(),
          genre: '',
          publisher: '',
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy', 'Thriller', 'Biography']

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-8 rounded-2xl">
      <div>
        <label htmlFor="title" className="block text-sm font-bold text-slate-100 mb-2">
          📖 Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-3 bg-slate-900 text-slate-100 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
          } disabled:opacity-50`}
          placeholder="Enter book title"
        />
        {errors.title && <p className="text-red-400 text-sm mt-1 font-semibold">❌ {errors.title}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-bold text-slate-100 mb-2">
          👤 Author <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-3 bg-slate-900 text-slate-100 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
            errors.author ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
          } disabled:opacity-50`}
          placeholder="Enter author name"
        />
        {errors.author && <p className="text-red-400 text-sm mt-1 font-semibold">❌ {errors.author}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="year" className="block text-sm font-bold text-slate-100 mb-2">
            📅 Year <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            disabled={isLoading}
            className={`w-full px-4 py-3 bg-slate-900 text-slate-100 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
              errors.year ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
            } disabled:opacity-50`}
            placeholder="Year"
          />
          {errors.year && <p className="text-red-400 text-sm mt-1 font-semibold">❌ {errors.year}</p>}
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-bold text-slate-100 mb-2">
            🏷️ Genre <span className="text-red-400">*</span>
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            disabled={isLoading}
            className={`w-full px-4 py-3 bg-slate-900 text-slate-100 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
              errors.genre ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
            } disabled:opacity-50`}
          >
            <option value="">Select genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <p className="text-red-400 text-sm mt-1 font-semibold">❌ {errors.genre}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="publisher" className="block text-sm font-bold text-slate-100 mb-2">
          🏢 Publisher <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-3 bg-slate-900 text-slate-100 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
            errors.publisher ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
          } disabled:opacity-50`}
          placeholder="Enter publisher name"
        />
        {errors.publisher && <p className="text-red-400 text-sm mt-1 font-semibold">❌ {errors.publisher}</p>}
      </div>

      <div className="flex gap-3 pt-4 border-t border-slate-700">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg text-base"
        >
          {isLoading ? '⏳ Saving...' : initialData ? '✅ Update Book' : '✨ Add Book'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  )
}
