# Component & Hook Architecture Diagram

## Component Hierarchy

```
BooksPage (Main Container)
│
├─── Header Section
│    └─ Title & Description
│
├─── Alerts Section
│    ├─ SuccessAlert (conditional)
│    └─ ErrorAlert (conditional)
│
├─── Search & Action Section
│    ├─ SearchBar
│    │   └─ Real-time filtering
│    └─ "Add New Book" Button
│
├─── Content Section (conditional)
│    ├─ LoadingSpinner (if loading)
│    ├─ EmptyState (if no books)
│    └─ BookGrid (if books exist)
│        └─ BookCard × N
│            ├─ Book Info Display
│            ├─ Edit Button
│            └─ Delete Button
│
├─── Add Book Dialog
│    ├─ Title: "Add New Book"
│    └─ BookForm
│        ├─ Title Input
│        ├─ Author Input
│        ├─ Year Input
│        ├─ Genre Select
│        ├─ Publisher Input
│        ├─ Validation Messages
│        ├─ Submit Button
│        └─ Cancel Button
│
└─── Edit Book Dialog
     ├─ Title: "Edit Book"
     └─ BookForm (with initialData)
         └─ All fields pre-filled
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────┐
│         BooksPage Component                          │
└─────────────────────────────────────────────────────┘
                      │
                      ↓
        ┌─────────────────────────┐
        │   useBookStore (Zustand) │
        └─────────────────────────┘
        │
        ├─ Dialog State
        │  ├─ isAddBookDialogOpen
        │  ├─ isEditBookDialogOpen
        │  └─ editBookId
        │
        ├─ Data State
        │  └─ bookList: BookDoc[]
        │
        └─ Mutation Handlers
           ├─ onBookCreate()
           ├─ onBookUpdate()
           └─ onBookDelete()
                      │
                      ↓
        ┌─────────────────────────────────┐
        │   useBooks Hooks                │
        └─────────────────────────────────┘
        │
        ├─ useGetBooks() → BOOK_LIST_QUERY
        ├─ useCreateBook() → CREATE_BOOK_MUTATION
        ├─ useUpdateBook() → UPDATE_BOOK_MUTATION
        ├─ useDeleteBook() → DELETE_BOOK_MUTATION
        └─ useGetBook(id) → GET_BOOK_QUERY
                      │
                      ↓
        ┌─────────────────────────────────┐
        │   Apollo Client                 │
        │ (apolloClient instance)         │
        └─────────────────────────────────┘
                      │
                      ↓
        ┌─────────────────────────────────┐
        │   HTTP Request to Backend       │
        │   POST localhost:5050/graphql   │
        └─────────────────────────────────┘
                      │
                      ↓
        ┌─────────────────────────────────┐
        │   GraphQL Server                │
        │   - Query Resolvers             │
        │   - Mutation Resolvers          │
        │   - MongoDB Operations          │
        └─────────────────────────────────┘
                      │
                      ↓
        ┌─────────────────────────────────┐
        │   MongoDB Replica Set           │
        │   - mongo1 (PRIMARY)            │
        │   - mongo2 (SECONDARY)          │
        │   - mongo3 (SECONDARY)          │
        └─────────────────────────────────┘
```

---

## Data Flow: Create Book

```
User Input
   │
   ↓
BookForm Component
   │ (form validation)
   ↓
handleCreateBook() in BooksPage
   │
   ↓
useCreateBook() Hook
   │ (TODO: Call Apollo Mutation)
   ↓
CREATE_BOOK_MUTATION
   │
   ↓
Apollo Client
   │
   ↓
Backend GraphQL (bookCreate Mutation)
   │
   ↓
MongoDB (save new book)
   │
   ↓
Response with created book
   │
   ↓
onBookCreate() store update
   │
   ↓
bookList state updated
   │
   ↓
BooksPage re-renders
   │
   ↓
BookCard displays new book + Success Alert
```

---

## Data Flow: Search Books

```
User Types in SearchBar
   │
   ↓
handleChange() updates searchQuery state
   │
   ↓
filteredBooks computed from:
   - bookList (from store)
   - searchQuery (from useState)
   │
   ↓
BookCard components re-render
   │
   ↓ (filtered list displayed)
```

---

## Hook Lifecycle

### useGetBooks()
```
Component Mount
    ↓
useEffect(() => { fetchBooks() }, [])
    ↓
useGetBooks Hook executes
    ↓
setBooks(books) in store
    ↓
bookList state updated
    ↓
Component re-renders with books
```

### useCreateBook()
```
Form Submit
    ↓
handleCreateBook() called
    ↓
createBook(formData) executes
    ↓
Mutation sent to GraphQL
    ↓
onBookCreate() store update
    ↓
bookList updated
    ↓
Dialog closed
    ↓
Success alert shown
    ↓
Alert auto-dismisses after 3s
```

---

## Component Dependencies

```
BookForm
  └─ No external dependencies (standalone)

BookCard
  ├─ BookDoc (type)
  └─ Handlers from parent

Dialog
  ├─ useEffect (keyboard listener)
  └─ Children (content)

SearchBar
  └─ useState (search query)

LoadingSpinner
  └─ CSS animations only

EmptyState
  ├─ Optional action button
  └─ Children support

ErrorAlert / SuccessAlert
  └─ Optional dismiss handler

BooksPage (Main)
  ├─ useBookStore (Zustand)
  ├─ useGetBooks (hook)
  ├─ useCreateBook (hook)
  ├─ useUpdateBook (hook)
  ├─ useDeleteBook (hook)
  ├─ useState (search, alerts)
  ├─ useEffect (fetch books)
  └─ All child components
```

---

## GraphQL Query/Mutation Flow

```
┌───────────────────────────────┐
│ GraphQL Query String          │
│ BOOK_LIST_QUERY               │
│ BOOK_QUERY                    │
│ CREATE_BOOK_MUTATION          │
│ UPDATE_BOOK_MUTATION          │
│ DELETE_BOOK_MUTATION          │
└───────────────────────────────┘
           ↓
┌───────────────────────────────┐
│ Apollo useMutation/useQuery   │
│ (client.ts config)            │
└───────────────────────────────┘
           ↓
┌───────────────────────────────┐
│ HTTP POST Request             │
│ Content-Type: application/json│
│ Body: { query, variables }    │
└───────────────────────────────┘
           ↓
┌───────────────────────────────┐
│ Backend GraphQL Server        │
│ :5050/graphql                 │
└───────────────────────────────┘
           ↓
┌───────────────────────────────┐
│ Resolvers execute             │
│ - Validate input              │
│ - Check authentication        │
│ - Execute MongoDB operation   │
│ - Return response             │
└───────────────────────────────┘
           ↓
┌───────────────────────────────┐
│ Response                      │
│ { data: { ... } } or          │
│ { errors: [ ... ] }           │
└───────────────────────────────┘
```

---

## Error Handling Flow

```
GraphQL Request
    ↓
┌─ Success? ─┐
│            ├─ Yes ─→ Update state → Re-render
│            │
│            └─ No
│                ↓
│        ┌─ Error Type ─┐
│        │              ├─ Network Error → Show ErrorAlert
│        │              ├─ GraphQL Error → Show ErrorAlert
│        │              └─ Validation Error → Show ErrorAlert
│        │
│        └─ Clear error after 3 seconds
```

---

## Responsive Layout

```
Mobile (< 768px)
┌─────────────────┐
│    Header       │
├─────────────────┤
│    SearchBar    │
├─────────────────┤
│    Add Button   │
├─────────────────┤
│   BookCard      │
│   (full width)  │
├─────────────────┤
│   BookCard      │
│   (full width)  │
└─────────────────┘

Tablet (768px - 1024px)
┌──────────────────────┐
│      Header          │
├──────────────────────┤
│      SearchBar       │
├──────────────────────┤
│    Add Button        │
├──────────────────────┤
│ BookCard │ BookCard  │
├──────────────────────┤
│ BookCard │ BookCard  │
└──────────────────────┘

Desktop (> 1024px)
┌─────────────────────────────┐
│          Header             │
├─────────────────────────────┤
│        SearchBar            │
├─────────────────────────────┤
│      Add Button             │
├─────────────────────────────┤
│ Card │ Card │ Card          │
├─────────────────────────────┤
│ Card │ Card │ Card          │
└─────────────────────────────┘
```

---

## Authentication Flow (Optional)

```
User Login
   ↓
Store Auth Token
   ↓
Apollo Client Headers
   ├─ Authorization: Bearer {token}
   └─ Included in all requests
   ↓
Backend validates token
   ├─ Valid → Execute query/mutation
   ├─ Invalid → 401 Unauthorized
   └─ Expired → Refresh token
   ↓
Update UI based on auth status
```

---

## TODO: Implement These

1. **In useBooks.ts**
   ```
   □ useGetBooks() - implement query
   □ useCreateBook() - implement mutation
   □ useUpdateBook() - implement mutation
   □ useDeleteBook() - implement mutation
   □ useGetBook() - implement query
   ```

2. **In client.ts**
   ```
   □ Verify Apollo Client is configured
   □ Add auth headers if needed
   □ Configure error handling
   ```

3. **In .env.local**
   ```
   □ Set NEXT_PUBLIC_SERVER_URL
   □ Set NEXT_PUBLIC_GRAPHQL_ENDPOINT
   □ Set NEXT_PUBLIC_AUTH_TOKEN (if needed)
   ```

---

This architecture ensures:
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Predictable state management
- ✅ Easy error handling
- ✅ Scalable structure
- ✅ Type safety
- ✅ Clear data flow
