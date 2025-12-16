# 🚀 GraphQL Frontend Setup - Complete!

## ✅ What's Been Implemented

### 1. **Apollo Client Configuration** ✓
   - File: `src/lib/graphql/client.ts`
   - Features:
     - HTTP link to backend (`http://localhost:5050/graphql`)
     - Error handling for network and GraphQL errors
     - Authorization header with Bearer token
     - In-memory cache for query results
     - Fetch policies configured

### 2. **GraphQL Queries & Mutations** ✓
   - File: `src/lib/graphql/queries.ts`
   - Queries:
     - `GetBooks` - Fetch all books
     - `GetBook($id)` - Fetch single book
   - Mutations:
     - `CreateBook($input)` - Create new book
     - `UpdateBook($id, $input)` - Update book
     - `DeleteBook($id)` - Delete book

### 3. **Custom React Hooks** ✓
   - File: `src/hooks/useBooks.ts`
   - `useGetBooks()` - Fetch all books with loading/error states
   - `useCreateBook()` - Create book mutation
   - `useUpdateBook()` - Update book mutation
   - `useDeleteBook()` - Delete book mutation
   - `useGetBook(id)` - Fetch single book by ID

### 4. **UI Components** ✓
   - `BooksPage` - Main page component
   - `BookForm` - Create/edit form
   - `BookCard` - Book display card
   - `SearchBar` - Real-time search
   - `Dialog` - Modal wrapper
   - `LoadingSpinner` - Loading state
   - `EmptyState` - Empty message
   - `ErrorAlert` / `SuccessAlert` - Notifications

### 5. **State Management** ✓
   - Zustand store for UI state (dialogs, book list)
   - React hooks for form state
   - Apollo Client cache for data

### 6. **Environment Configuration** ✓
   - File: `.env`
   - `NEXT_PUBLIC_SERVER_URL=http://localhost:5050`
   - `NEXT_PUBLIC_AUTH_TOKEN=your_auth_token_here`

---

## 🎬 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Node.js 18+ installed

### Step 1: Start MongoDB
```bash
cd d:\GraphQL
docker-compose up -d
```

### Step 2: Start Backend Server
```bash
cd d:\GraphQL\backend
npm install  # if needed
npm run dev
```

Expected output:
```
GraphQL Server running on port 5050
Connected to MongoDB
```

### Step 3: Start Frontend
```bash
cd d:\GraphQL\frontend
npm install  # if needed
npm run dev
```

Expected output:
```
▲ Next.js 16.0.10
- Local:        http://localhost:3000
- Environments: .env

✓ Ready in 2.5s
```

### Step 4: Test in Browser
Open `http://localhost:3000` and:
- ✅ See loading spinner
- ✅ Books list loads
- ✅ Add a new book
- ✅ Search for books
- ✅ Edit book details
- ✅ Delete a book

---

## 🧪 Testing GraphQL

### Test Directly in GraphQL Playground
Open: `http://localhost:5050/graphql`

**Test Query 1: Get all books**
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
  }
}
```

**Test Mutation 1: Create a book**
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
  }
}
```
Variables:
```json
{
  "input": {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "genre": "Fiction",
    "publisher": "Scribner"
  }
}
```

---

## 📊 Data Flow

```
Browser (Frontend)
     ↓
React Component
     ↓
useBooks Hook
     ↓
Apollo Client
     ↓
HTTP POST to :5050/graphql
     ↓
Backend GraphQL Server
     ↓
MongoDB Query
     ↓
Response sent back
     ↓
Cache updated
     ↓
UI re-renders
```

---

## 🔗 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `http://localhost:5050/graphql` | POST | GraphQL queries & mutations |
| `http://localhost:5050` | GET | GraphQL Playground (dev only) |
| `http://localhost:3000` | GET | Frontend UI |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                    (Root page with LayoutProvider)
│   │   └── page-books.tsx              (Example page)
│   ├── components/
│   │   ├── BooksPage.tsx               (Main container)
│   │   ├── BookForm.tsx                (Create/Edit form)
│   │   ├── BookCard.tsx                (Book card)
│   │   ├── Dialog.tsx                  (Modal)
│   │   ├── SearchBar.tsx               (Search input)
│   │   ├── LoadingSpinner.tsx          (Loading)
│   │   ├── EmptyState.tsx              (Empty state)
│   │   ├── ErrorAlert.tsx              (Error notification)
│   │   ├── SuccessAlert.tsx            (Success notification)
│   │   ├── LayoutProvider.tsx          (Apollo Provider wrapper)
│   │   └── index.ts                    (Barrel export)
│   ├── hooks/
│   │   ├── useBooks.ts                 (All GraphQL hooks)
│   │   └── index.ts                    (Export)
│   ├── lib/
│   │   └── graphql/
│   │       ├── client.ts               (Apollo Client instance)
│   │       ├── queries.ts              (GQL query strings)
│   │       └── types.ts                (TypeScript types)
│   ├── stores/
│   │   └── useBookStore.ts             (Zustand state)
│   └── types/
│       └── index.d.ts                  (Type definitions)
├── .env                                (Environment variables)
├── package.json                        (Dependencies)
└── tsconfig.json                       (TypeScript config)
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /graphql"
**Cause**: Backend not running

**Solution**:
```bash
cd backend
npm run dev
```

### Issue: "Network error when fetching graphql"
**Cause**: Wrong URL or backend not accessible

**Solution**:
1. Check `NEXT_PUBLIC_SERVER_URL` in `.env`
2. Verify backend is running on port 5050
3. Check no firewall blocking port 5050

### Issue: "Authorization header missing"
**Cause**: `NEXT_PUBLIC_AUTH_TOKEN` not set

**Solution**:
1. Check `.env` file has `NEXT_PUBLIC_AUTH_TOKEN` set
2. Restart frontend after changing .env
3. Backend should show auth errors in logs

### Issue: "No books showing"
**Cause**: MongoDB not running or no data

**Solution**:
1. Check Docker containers: `docker-compose ps`
2. MongoDB should show "healthy" status
3. Create a test book via GraphQL Playground
4. Check backend logs for errors

---

## 📚 Learning Resources

- [GraphQL Guide](https://graphql.org/learn/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## 🎯 Next Steps

1. ✅ **Run Everything**: Follow Quick Start above
2. ✅ **Test CRUD**: Create, read, update, delete books
3. ✅ **Check Console**: Look for any errors
4. ✅ **Monitor Network**: Check GraphQL requests in DevTools
5. ✅ **Experiment**: Try different queries in Playground

---

## 💡 Tips

- **Dev Tools**: Open DevTools (F12) → Network tab to see GraphQL requests
- **Apollo DevTools**: Install Apollo DevTools extension to inspect cache
- **GraphQL Playground**: Test queries before implementing in components
- **Hot Reload**: Frontend and backend both support hot reload
- **Error Messages**: Check browser console and terminal for detailed errors

---

## 🚦 Status Indicators

| Component | Status | Health Check |
|-----------|--------|--------------|
| Frontend | ✅ Running | http://localhost:3000 loads |
| Backend | ✅ Running | http://localhost:5050/graphql responds |
| MongoDB | ✅ Running | `docker-compose ps` shows "healthy" |
| Apollo Client | ✅ Connected | Network tab shows GraphQL requests |
| Zustand Store | ✅ Ready | No console errors |
| TypeScript | ✅ Compiling | `npm run dev` runs without errors |

---

**Everything is ready to go! Start with Step 1 above.** 🎉
