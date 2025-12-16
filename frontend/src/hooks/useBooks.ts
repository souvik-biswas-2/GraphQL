import { useState, useCallback } from 'react'
import { apolloClient } from '@/lib/graphql/client'
import {
  BOOK_LIST_QUERY,
  GET_BOOK_QUERY,
  CREATE_BOOK_MUTATION,
  UPDATE_BOOK_MUTATION,
  DELETE_BOOK_MUTATION,
} from '@/lib/graphql/queries'
import { BookDoc } from '@/types'

/**
 * Hook for fetching all books
 */
export function useGetBooks() {
  const [books, setBooks] = useState<BookDoc[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBooks = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await apolloClient.query({
        query: BOOK_LIST_QUERY,
        fetchPolicy: 'network-only',
      })
      setBooks(data.bookList || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books')
      console.error('Error fetching books:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { books, isLoading, error, fetchBooks, setBooks }
}

/**
 * Hook for creating a book
 */
export function useCreateBook() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBook = useCallback(
    async (input: Omit<BookDoc, '_id' | 'id' | 'createdAt' | 'updatedAt'>) => {
      setIsLoading(true)
      setError(null)
      try {
        const { data } = await apolloClient.mutate({
          mutation: CREATE_BOOK_MUTATION,
          variables: { input },
        })
        return data.bookCreate
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create book'
        setError(errorMessage)
        console.error('Error creating book:', err)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { createBook, isLoading, error }
}

/**
 * Hook for updating a book
 */
export function useUpdateBook() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateBook = useCallback(
    async (id: string, input: Omit<BookDoc, '_id' | 'id' | 'createdAt' | 'updatedAt'>) => {
      setIsLoading(true)
      setError(null)
      try {
        const { data } = await apolloClient.mutate({
          mutation: UPDATE_BOOK_MUTATION,
          variables: { id, input },
        })
        return data.bookUpdate
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update book'
        setError(errorMessage)
        console.error('Error updating book:', err)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { updateBook, isLoading, error }
}

/**
 * Hook for deleting a book
 */
export function useDeleteBook() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteBook = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_BOOK_MUTATION,
        variables: { id },
      })
      return data.bookDelete
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete book'
      setError(errorMessage)
      console.error('Error deleting book:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { deleteBook, isLoading, error }
}

/**
 * Hook for fetching a single book
 */
export function useGetBook(id: string | null) {
  const [book, setBook] = useState<BookDoc | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBook = useCallback(async () => {
    if (!id) return

    setIsLoading(true)
    setError(null)
    try {
      const { data } = await apolloClient.query({
        query: GET_BOOK_QUERY,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      setBook(data.book || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch book')
      console.error('Error fetching book:', err)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  return { book, isLoading, error, fetchBook, setBook }
}
