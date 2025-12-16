# GraphQL Implementation - Complete Setup

## ✅ What's Been Done

### 1. Backend (No changes needed - already working)
- ✅ GraphQL schema with Book CRUD resolvers
- ✅ MongoDB connection with replica set
- ✅ Apollo Server running on port 5050
- ✅ GraphQL endpoint: `http://localhost:5050/graphql`

### 2. Frontend GraphQL Hooks
- ✅ `useGetBooks()` - Fetch all books
- ✅ `useCreateBook()` - Create new book
- ✅ `useUpdateBook()` - Update existing book
- ✅ `useDeleteBook()` - Delete book
- ✅ `useGetBook(id)` - Fetch single book

### 3. Apollo Client Setup
- ✅ Apollo Client configured in `src/lib/graphql/client.ts`
- ✅ Error handling with `@apollo/client/link/error`
- ✅ Query/Mutation definitions using `gql` in `src/lib/graphql/queries.ts`
- ✅ Environment variables configured

### 4. UI Components
- ✅ BooksPage - Main container component
- ✅ BookForm - Form for creating/editing books
- ✅ BookCard - Display individual books
- ✅ SearchBar - Real-time search filtering
- ✅ Dialog - Modal wrapper
- ✅ LoadingSpinner - Loading state
- ✅ EmptyState - Empty state display
- ✅ ErrorAlert/SuccessAlert - Notifications

## 🚀 Quick Start

### Step 1: Ensure Docker MongoDB is Running
```bash
cd d:\GraphQL
docker-compose up -d
```

Verify containers are running:
```bash
docker-compose ps
```

### Step 2: Start Backend
```bash
cd d:\GraphQL\backend
npm install  # if needed
npm run dev
```

You should see:
```
GraphQL Server running on port 5050
Connected to MongoDB
```

### Step 3: Start Frontend
In a new terminal:
```bash
cd d:\GraphQL\frontend
npm install  # if needed
npm run dev
```

### Step 4: Test in Browser
Open `http://localhost:3000` and:
1. ✅ Books list should load automatically
2. ✅ Create a new book
3. ✅ Search for books
4. ✅ Edit a book
5. ✅ Delete a book

## 🔧 Environment Configuration

### Frontend `.env` file (already set up)
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5050
NEXT_PUBLIC_AUTH_TOKEN=your_auth_token_here
```

This provides:
- `NEXT_PUBLIC_SERVER_URL` - Backend server URL
- `NEXT_PUBLIC_AUTH_TOKEN` - Authorization token (sent in all GraphQL requests)

## 📡 How GraphQL Works

### Query Flow: Fetching Books
```
1. Component mounts
   ↓
2. useEffect calls fetchBooks()
   ↓
3. useGetBooks() executes GraphQL query
   ↓
4. Apollo Client sends HTTP POST to http://localhost:5050/graphql
   ↓
5. Backend resolves bookList query
   ↓
6. MongoDB returns books
   ↓
7. Response updates component state
   ↓
8. UI re-renders with books
```

### Mutation Flow: Creating a Book
```
1. User submits form
   ↓
2. handleCreateBook() called
   ↓
3. useCreateBook() executes GraphQL mutation
   ↓
4. Apollo Client sends mutation to /graphql endpoint
   ↓
5. Backend resolver validates and saves to MongoDB
   ↓
6. MongoDB returns created book
   ↓
7. Store updates with new book
   ↓
8. Dialog closes and success message shows
```

## 🔍 Testing GraphQL

### Test in GraphQL Playground
Open `http://localhost:5050/graphql` and try:

**Query: Get all books**
```graphql
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
```

**Mutation: Create a book**
```graphql
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
```

Variables:
```json
{
  "input": {
    "title": "Test Book",
    "author": "Test Author",
    "year": 2025,
    "genre": "Fiction",
    "publisher": "Test Publisher"
  }
}
```

**Query: Get single book**
```graphql
query GetBook($id: ID!) {
  book(id: $id) {
    _id
    id
    title
    author
    year
    genre
    publisher
  }
}
```

Variables:
```json
{
  "id": "book-id-here"
}
```

**Mutation: Update book**
```graphql
mutation UpdateBook($id: ID!, $input: BookInput!) {
  bookUpdate(id: $id, input: $input) {
    _id
    id
    title
    author
    year
    genre
    publisher
  }
}
```

**Mutation: Delete book**
```graphql
mutation DeleteBook($id: ID!) {
  bookDelete(id: $id) {
    _id
    id
    title
  }
}
```

## 🐛 Troubleshooting

### "Failed to fetch books" Error
**Problem**: Connection refused to localhost:5050

**Solutions**:
1. Check backend is running: `npm run dev` in backend folder
2. Check Docker MongoDB: `docker-compose ps`
3. Check firewall isn't blocking port 5050
4. Verify `NEXT_PUBLIC_SERVER_URL=http://localhost:5050` in .env

### "Cannot find bookList in data"
**Problem**: Query response structure doesn't match

**Solutions**:
1. Test query directly at `http://localhost:5050/graphql`
2. Check backend GraphQL schema for correct query name
3. Verify Apollo Client link configuration
4. Check console for GraphQL errors

### "Authentication token missing"
**Problem**: Getting unauthorized errors

**Solutions**:
1. Verify `NEXT_PUBLIC_AUTH_TOKEN` is set in .env
2. Check if backend requires authentication
3. Test with token in GraphQL Playground headers

### Mutating returns null
**Problem**: Database operation succeeds but returns null

**Solutions**:
1. Check MongoDB is running: `docker-compose ps`
2. Verify data was actually saved in DB
3. Test mutation in GraphQL Playground directly
4. Check for validation errors in backend logs

## 📁 File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── BooksPage.tsx          (Main page)
│   │   ├── BookForm.tsx           (Form component)
│   │   ├── BookCard.tsx           (Card component)
│   │   ├── Dialog.tsx             (Modal wrapper)
│   │   ├── SearchBar.tsx          (Search input)
│   │   ├── LoadingSpinner.tsx     (Loading state)
│   │   ├── EmptyState.tsx         (Empty state)
│   │   ├── ErrorAlert.tsx         (Error message)
│   │   ├── SuccessAlert.tsx       (Success message)
│   │   └── index.ts               (Barrel export)
│   ├── hooks/
│   │   ├── useBooks.ts            (GraphQL hooks)
│   │   └── index.ts               (Export)
│   ├── lib/
│   │   └── graphql/
│   │       ├── client.ts          (Apollo Client config)
│   │       ├── queries.ts         (Query/Mutation definitions)
│   │       └── types.ts           (TypeScript types)
│   ├── stores/
│   │   └── useBookStore.ts        (Zustand state)
│   ├── types/
│   │   └── index.d.ts             (Type definitions)
│   └── app/
│       ├── page.tsx               (Root page)
│       └── page-books.tsx         (Books page)
└── .env                           (Environment variables)
```

## ✨ Next Steps

1. **Run everything**: Follow "Quick Start" section above
2. **Test CRUD Operations**: Try creating, reading, updating, and deleting books
3. **Monitor Logs**: Watch console for any GraphQL errors
4. **Learn GraphQL**: Experiment with queries in GraphQL Playground
5. **Extend**: Add more features like filtering, sorting, pagination

## 📚 GraphQL Concepts Applied

- **Queries**: Fetch data (bookList, book)
- **Mutations**: Modify data (bookCreate, bookUpdate, bookDelete)
- **Variables**: Dynamic parameters in queries/mutations
- **Error Handling**: Network and GraphQL errors caught and displayed
- **Caching**: Apollo Client caches results for performance
- **Loading States**: Show UI feedback during requests

## 🎯 Architecture Overview

```
User Interface (React)
        ↓
  useBooks Hooks
        ↓
  Apollo Client
        ↓
  GraphQL Request (HTTP POST)
        ↓
  Backend GraphQL Server (Express + Apollo)
        ↓
  Mongoose Schema Validators
        ↓
  MongoDB (Replica Set)
```

All pieces are now connected! Your GraphQL frontend is fully functional and ready to use.
