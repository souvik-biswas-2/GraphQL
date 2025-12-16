# Frontend Components & Hooks Overview

## 📁 New Components Created

### UI Components

#### 1. **BookForm.tsx**
Form component for creating and editing books with validation.
- Validates all fields (title, author, year, genre, publisher)
- Supports edit mode with pre-filled data
- Clear error messages
- Loading state

```tsx
// Usage
<BookForm 
  initialData={book}
  onSubmit={handleSubmit}
  isLoading={isLoading}
  onCancel={handleCancel}
/>
```

#### 2. **BookCard.tsx**
Displays individual book information with action buttons.
- Shows all book details
- Edit and Delete buttons
- Responsive design
- Delete confirmation

```tsx
// Usage
<BookCard 
  book={bookData}
  onEdit={handleEdit}
  onDelete={handleDelete}
  isDeleting={isDeleting}
/>
```

#### 3. **Dialog.tsx**
Modal dialog wrapper for forms and content.
- Backdrop click to close
- Escape key support
- Smooth animations
- Prevents body scroll

```tsx
// Usage
<Dialog 
  isOpen={isOpen}
  onClose={handleClose}
  title="Add Book"
>
  <BookForm {...props} />
</Dialog>
```

#### 4. **SearchBar.tsx**
Search input with real-time filtering.
- Clear button when query exists
- Debounce-ready
- Placeholder text
- Loading state

```tsx
// Usage
<SearchBar 
  onSearch={setSearchQuery}
  placeholder="Search books..."
  isLoading={isLoading}
/>
```

#### 5. **LoadingSpinner.tsx**
Animated loading spinner.
- Smooth rotation animation
- Centered layout
- Customizable size

```tsx
// Usage
<LoadingSpinner />
```

#### 6. **EmptyState.tsx**
Empty state display with optional action.
- Icon display
- Title and description
- Action button

```tsx
// Usage
<EmptyState 
  title="No books found"
  description="Add your first book to get started"
  action={{ label: 'Add Book', onClick: handleAdd }}
/>
```

#### 7. **ErrorAlert.tsx** & **SuccessAlert.tsx**
Alert components for notifications.
- Auto-dismiss capability
- Close button
- Styled for error/success

```tsx
// Usage
<ErrorAlert message="Failed to load books" onDismiss={handleDismiss} />
<SuccessAlert message="Book added!" onDismiss={handleDismiss} />
```

#### 8. **BooksPage.tsx**
Complete page component with all functionality integrated.
- Book list display
- Search functionality
- Add/Edit/Delete operations
- Dialogs for forms
- Error handling
- Success/error notifications

---

## 🎣 Custom Hooks

### useBooks.ts
Located in `src/hooks/useBooks.ts`

#### useGetBooks()
Fetches all books from GraphQL.
```tsx
const { books, isLoading, error, fetchBooks, setBooks } = useGetBooks()
```

#### useCreateBook()
Creates a new book via GraphQL mutation.
```tsx
const { createBook, isLoading, error } = useCreateBook()
const newBook = await createBook({ title, author, ... })
```

#### useUpdateBook()
Updates an existing book via GraphQL mutation.
```tsx
const { updateBook, isLoading, error } = useUpdateBook()
const updated = await updateBook(id, { title, author, ... })
```

#### useDeleteBook()
Deletes a book via GraphQL mutation.
```tsx
const { deleteBook, isLoading, error } = useDeleteBook()
await deleteBook(bookId)
```

#### useGetBook(id)
Fetches a single book by ID.
```tsx
const { book, isLoading, error, fetchBook } = useGetBook(bookId)
```

---

## 🛍️ Store (Zustand)

State management using Zustand in `src/stores/useBookStore.ts`:

```tsx
const {
  // Add dialog
  isAddBookDialogOpen,
  showAddBookDialog,
  closeAddBookDialog,
  
  // Edit dialog
  isEditBookDialogOpen,
  editBookId,
  showEditBookDialog,
  closeEditBookDialog,
  
  // Book data
  bookList,
  setBookList,
  
  // Operations
  onBookCreate,
  onBookUpdate,
  onBookDelete,
} = useBookStore()
```

---

## 📊 Data Flow

```
BooksPage.tsx (Main Component)
    ↓
┌───────────────────────────────────────┐
│ useBookStore (UI State)                │
│ - Dialog states                        │
│ - Book list                            │
│ - Editing state                        │
└───────────────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│ useBooks Hooks (GraphQL Operations)    │
│ - useGetBooks()                        │
│ - useCreateBook()                      │
│ - useUpdateBook()                      │
│ - useDeleteBook()                      │
└───────────────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│ apolloClient (GraphQL Client)          │
│ Executes queries/mutations             │
└───────────────────────────────────────┘
    ↓
Backend GraphQL Server (localhost:5050/graphql)
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies (if needed)
```bash
npm install zustand @apollo/client graphql
```

### 2. Configure Environment
Create `.env.local` in frontend folder:
```
NEXT_PUBLIC_SERVER_URL=http://localhost:5050
NEXT_PUBLIC_AUTH_TOKEN=your_auth_token_here
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:5050/graphql
```

### 3. Implement GraphQL Queries
Edit `src/hooks/useBooks.ts` and add your GraphQL queries/mutations in the TODO sections.

Example with Apollo Client:
```typescript
import { useQuery, useMutation } from '@apollo/client'
import { BOOK_LIST_QUERY } from '@/lib/graphql/queries'

export function useGetBooks() {
  const { data, loading, error, refetch } = useQuery(BOOK_LIST_QUERY)
  
  return {
    books: data?.bookList || [],
    isLoading: loading,
    error: error?.message,
    fetchBooks: refetch,
  }
}
```

### 4. Use in Your Page
```tsx
'use client'

import { BooksPage } from '@/components/BooksPage'

export default function Page() {
  return <BooksPage />
}
```

---

## 📝 Example: Complete Flow

1. **User visits page** → BooksPage mounts
2. **useGetBooks hook executes** → Fetches books from GraphQL
3. **Books display** → Grid of BookCards
4. **User clicks "Add Book"** → Dialog opens, BookForm displays
5. **User submits form** → useCreateBook executes mutation
6. **Success** → Book added to list, dialog closes, success alert shows
7. **User searches** → SearchBar filters books in real-time
8. **User clicks Edit** → Dialog with pre-filled BookForm opens
9. **User submits** → useUpdateBook executes mutation, list updates
10. **User clicks Delete** → Confirmation, useDeleteBook executes, list updates

---

## 🎨 Styling

All components use Tailwind CSS with:
- Consistent color scheme (blue primary, gray neutral)
- Responsive design (mobile-first)
- Smooth transitions and hover effects
- Accessible form inputs and buttons
- Clear error and success states

---

## ✅ Features

- ✅ Create books with validation
- ✅ Read and display book list
- ✅ Edit existing books
- ✅ Delete books with confirmation
- ✅ Search and filter books
- ✅ Real-time UI updates
- ✅ Error handling with user feedback
- ✅ Loading states
- ✅ Responsive design
- ✅ Accessibility

---

## 📚 References

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hooks Guide](https://react.dev/reference/react)

---

## Next: Implement GraphQL

The hooks are ready with TODO comments. Implement them in `src/hooks/useBooks.ts` using your GraphQL client and see the magic happen! 🚀
