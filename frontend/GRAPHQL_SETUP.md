# GraphQL Frontend Implementation Guide

## Overview
This frontend has been set up with reusable components, hooks, and utilities for managing a book library via GraphQL. All GraphQL queries and mutations need to be implemented by you.

## Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookForm.tsx     # Form for creating/editing books
│   ├── BookCard.tsx     # Individual book display
│   ├── Dialog.tsx       # Modal dialog wrapper
│   ├── SearchBar.tsx    # Search functionality
│   ├── LoadingSpinner.tsx # Loading state
│   ├── EmptyState.tsx   # Empty state display
│   ├── ErrorAlert.tsx   # Error notifications
│   ├── SuccessAlert.tsx # Success notifications
│   └── BooksPage.tsx    # Main page component
├── hooks/
│   └── useBooks.ts      # Custom hooks for book operations (TODO: implement GraphQL calls)
├── lib/graphql/
│   ├── queries.ts       # GraphQL query/mutation strings
│   ├── client.ts        # GraphQL client setup
│   └── types.ts         # TypeScript types for GraphQL responses
├── stores/
│   └── useBookStore.ts  # Zustand store for UI state
└── types/
    └── doc.d.ts        # Book document type definitions
```

## Quick Start

### 1. Set up GraphQL Client
Choose one of the following GraphQL clients:

#### Option A: Apollo Client (Recommended)
```bash
npm install @apollo/client graphql
```

Edit `src/lib/graphql/client.ts`:
```typescript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5050/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
```

#### Option B: urql
```bash
npm install urql graphql
```

Edit `src/lib/graphql/client.ts`:
```typescript
import { createClient } from 'urql';

export const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5050/graphql',
});
```

### 2. Add GraphQL Endpoint
Create/edit `.env.local`:
```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:5050/graphql
```

### 3. Implement GraphQL Queries and Mutations
Edit `src/hooks/useBooks.ts` and implement the TODO sections:

#### Example with Apollo Client:
```typescript
import { useQuery, useMutation } from '@apollo/client';
import { BOOK_LIST_QUERY, CREATE_BOOK_MUTATION } from '@/lib/graphql/queries';

export function useGetBooks() {
  const { data, loading, error, refetch } = useQuery(BOOK_LIST_QUERY);
  
  return {
    books: data?.bookList || [],
    isLoading: loading,
    error: error?.message,
    fetchBooks: refetch,
  };
}

export function useCreateBook() {
  const [mutate, { loading, error }] = useMutation(CREATE_BOOK_MUTATION);
  
  const createBook = async (input) => {
    const { data } = await mutate({ variables: { input } });
    return data.bookCreate;
  };
  
  return { createBook, isLoading: loading, error };
}
```

## Available Components

### BookForm
Form for creating or editing books with validation.
```tsx
<BookForm 
  initialData={book}
  onSubmit={async (data) => { /* handle submit */ }}
  isLoading={false}
  onCancel={() => {}}
/>
```

### BookCard
Displays individual book with edit/delete actions.
```tsx
<BookCard 
  book={bookData}
  onEdit={(book) => {}}
  onDelete={(id) => {}}
  isDeleting={false}
/>
```

### Dialog
Modal dialog for forms.
```tsx
<Dialog 
  isOpen={true}
  onClose={() => {}}
  title="Add Book"
>
  {/* content */}
</Dialog>
```

### SearchBar
Search input with clear button.
```tsx
<SearchBar 
  onSearch={(query) => {}}
  placeholder="Search..."
  isLoading={false}
/>
```

### Alerts
```tsx
<SuccessAlert message="Success!" onDismiss={() => {}} />
<ErrorAlert message="Error!" onDismiss={() => {}} />
```

### LoadingSpinner & EmptyState
```tsx
<LoadingSpinner />
<EmptyState 
  title="No books"
  description="Add your first book"
  action={{ label: 'Add', onClick: () => {} }}
/>
```

## State Management

### Zustand Store (useBookStore)
All UI state is managed in `src/stores/useBookStore.ts`:
- Dialog open/close states
- Book list
- Editing state
- Update/delete/create operations

Access it in any component:
```tsx
const { bookList, isAddBookDialogOpen, showAddBookDialog } = useBookStore()
```

## Next Steps

1. ✅ Set up your GraphQL client
2. ✅ Add GraphQL endpoint to `.env.local`
3. ✅ Implement GraphQL queries in `src/hooks/useBooks.ts`
4. ✅ Add authentication headers if needed
5. ✅ Test each operation (create, read, update, delete)

## Backend Integration

Your backend GraphQL schema:
```graphql
type Query {
  bookList: [Book]!
  book(id: ID!): Book!
}

type Mutation {
  bookCreate(input: BookInput!): Book
  bookUpdate(id: ID!, input: BookInput!): Book
  bookDelete(id: ID!): Book
}

type Book {
  _id: ID!
  id: ID
  title: String
  author: String
  year: Int
  genre: String
  publisher: String
  createdAt: Date
  updatedAt: Date
}

input BookInput {
  title: String
  author: String
  year: Int
  genre: String
  publisher: String
}
```

## Authentication

If your backend requires authentication:

1. Add auth token to Apollo Client headers:
```typescript
link: new HttpLink({
  uri: 'http://localhost:5050/graphql',
  credentials: 'include',
  headers: {
    authorization: `Bearer ${token}`,
  },
})
```

2. Use from environment:
```typescript
headers: {
  authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
}
```

## Troubleshooting

### CORS Errors
Make sure your backend has CORS enabled for `http://localhost:3000`

### Connection Refused
Check that:
- Backend server is running (`npm run dev` in backend folder)
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT` is correct
- Backend is listening on the right port

### Queries Not Working
- Check Network tab in DevTools
- Verify query strings match backend schema
- Check for authorization headers requirement

Good luck learning GraphQL! 🚀
