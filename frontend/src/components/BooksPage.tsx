'use client'

import { useEffect, useState } from 'react'
import { useBookStore } from '@/stores/useBookStore'
import {
  BookForm,
  BookCard,
  Dialog,
  SearchBar,
  LoadingSpinner,
  EmptyState,
  ErrorAlert,
  SuccessAlert,
} from '@/components'
import { useGetBooks, useCreateBook, useUpdateBook, useDeleteBook } from '@/hooks/useBooks'
import { BookDoc } from '@/types'

export function BooksPage() {
  const {
    isAddBookDialogOpen,
    showAddBookDialog,
    closeAddBookDialog,
    isEditBookDialogOpen,
    showEditBookDialog,
    closeEditBookDialog,
    editBookId,
    bookList,
    setBookList,
    onBookCreate,
    onBookUpdate,
    onBookDelete,
  } = useBookStore()

  const { books, isLoading: isBooksLoading, error: booksError, fetchBooks } = useGetBooks()
  const { createBook, isLoading: isCreating } = useCreateBook()
  const { updateBook, isLoading: isUpdating } = useUpdateBook()
  const { deleteBook, isLoading: isDeleting } = useDeleteBook()

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  // Update book list when books are fetched
  useEffect(() => {
    if (books.length > 0) {
      setBookList(books)
    }
  }, [books, setBookList])

  // Filter books based on search query
  const filteredBooks = bookList.filter((book) => {
    const query = searchQuery.toLowerCase()
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query)
    )
  })

  const handleCreateBook = async (data: Omit<BookDoc, '_id' | 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Creating book:', data)
      const newBook = await createBook(data)
      console.log('Book created:', newBook)
      if (newBook) {
        onBookCreate(newBook)
        setSuccessMessage('Book created successfully!')
        closeAddBookDialog()
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        setErrorMessage('Failed to create book - no data returned')
      }
    } catch (error) {
      console.error('Create book error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create book')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleUpdateBook = async (data: Omit<BookDoc, '_id' | 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editBookId) return

    try {
      console.log('Updating book:', editBookId, data)
      const updated = await updateBook(editBookId, data)
      console.log('Book updated:', updated)
      if (updated) {
        onBookUpdate(updated)
        setSuccessMessage('Book updated successfully!')
        closeEditBookDialog()
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        setErrorMessage('Failed to update book - no data returned')
      }
    } catch (error) {
      console.error('Update book error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update book')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleDeleteBook = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return

    try {
      await deleteBook(id)
      onBookDelete(id)
      setSuccessMessage('Book deleted successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete book')
    }
  }

  const editingBook = editBookId ? bookList.find((b) => b._id === editBookId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-7xl font-black bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight">
            📚 Book Library
          </h1>
          <p className="text-xl text-slate-300 font-light">Organize and manage your favorite books</p>
        </div>

        {/* Alerts */}
        <div className="space-y-4 mb-8 fixed top-6 right-6 w-96 z-50">
          {successMessage && (
            <SuccessAlert
              message={successMessage}
              onDismiss={() => setSuccessMessage(null)}
            />
          )}
          {errorMessage && (
            <ErrorAlert
              message={errorMessage}
              onDismiss={() => setErrorMessage(null)}
            />
          )}
          {booksError && (
            <ErrorAlert
              message={booksError}
              onDismiss={() => {}}
            />
          )}
        </div>

        {/* Search and Actions - Centered */}
        <div className="mb-12 flex flex-col items-center gap-6 w-full">
          <div className="w-full max-w-2xl">
            <SearchBar
              onSearch={setSearchQuery}
              isLoading={isBooksLoading}
            />
          </div>
          <button
            onClick={showAddBookDialog}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 text-lg"
          >
            ✨ Add New Book
          </button>
        </div>

        {/* Books Grid */}
        {isBooksLoading ? (
          <LoadingSpinner />
        ) : filteredBooks.length === 0 ? (
          <EmptyState
            title="No books found"
            description={
              searchQuery
                ? 'Try adjusting your search query'
                : 'Start by adding your first book'
            }
            action={{
              label: 'Add Book',
              onClick: showAddBookDialog,
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={(b) => {
                  showEditBookDialog(b._id as string)
                }}
                onDelete={handleDeleteBook}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Book Dialog */}
      <Dialog
        isOpen={isAddBookDialogOpen}
        onClose={closeAddBookDialog}
        title="✨ Add New Book"
      >
        <BookForm
          onSubmit={handleCreateBook}
          isLoading={isCreating}
          onCancel={closeAddBookDialog}
        />
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog
        isOpen={isEditBookDialogOpen}
        onClose={closeEditBookDialog}
        title="✏️ Edit Book"
      >
        {editingBook ? (
          <BookForm
            initialData={editingBook}
            onSubmit={handleUpdateBook}
            isLoading={isUpdating}
            onCancel={closeEditBookDialog}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Dialog>
    </div>
  )
}
