import { gql } from '@apollo/client'

// GraphQL Queries
export const BOOK_LIST_QUERY = gql`
  query GetBooks {
    bookList {
      _id
      id
      title
      author
      year
      genre
      publisher
      createdAt
      updatedAt
    }
  }
`

export const GET_BOOK_QUERY = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      _id
      id
      title
      author
      year
      genre
      publisher
      createdAt
      updatedAt
    }
  }
`

// GraphQL Mutations
export const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($input: BookInput!) {
    bookCreate(input: $input) {
      _id
      id
      title
      author
      year
      genre
      publisher
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook($id: ID!, $input: BookInput!) {
    bookUpdate(id: $id, input: $input) {
      _id
      id
      title
      author
      year
      genre
      publisher
      createdAt
      updatedAt
    }
  }
`

export const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($id: ID!) {
    bookDelete(id: $id) {
      _id
      id
      title
      author
      year
      genre
      publisher
    }
  }
`
