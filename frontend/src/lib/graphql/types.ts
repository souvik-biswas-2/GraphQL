// Type definitions for GraphQL operations
export interface BookListResponse {
  bookList: Array<{
    _id: string
    id: string
    title: string
    author: string
    year: number
    genre: string
    publisher: string
    createdAt: string
    updatedAt: string
  }>
}

export interface BookResponse {
  book: {
    _id: string
    id: string
    title: string
    author: string
    year: number
    genre: string
    publisher: string
    createdAt: string
    updatedAt: string
  }
}

export interface CreateBookResponse {
  bookCreate: {
    _id: string
    id: string
    title: string
    author: string
    year: number
    genre: string
    publisher: string
    createdAt: string
    updatedAt: string
  }
}

export interface UpdateBookResponse {
  bookUpdate: {
    _id: string
    id: string
    title: string
    author: string
    year: number
    genre: string
    publisher: string
    createdAt: string
    updatedAt: string
  }
}

export interface DeleteBookResponse {
  bookDelete: {
    _id: string
    id: string
  }
}
