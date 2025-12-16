# ⚡ Quick Reference Card

## 🚀 3-Step Launch

```bash
# Terminal 1
cd d:\GraphQL && docker-compose up -d

# Terminal 2  
cd d:\GraphQL\backend && npm run dev

# Terminal 3
cd d:\GraphQL\frontend && npm run dev

# Open browser: http://localhost:3000
```

---

## 🔗 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://localhost:3000` | React app |
| GraphQL API | `http://localhost:5050/graphql` | Query/Mutation endpoint |
| GraphQL Playground | `http://localhost:5050` | Interactive testing |

---

## 📡 Key Files

| File | Purpose |
|------|---------|
| `src/hooks/useBooks.ts` | All 5 GraphQL hooks |
| `src/lib/graphql/queries.ts` | Query/mutation definitions |
| `src/lib/graphql/client.ts` | Apollo Client config |
| `src/components/BooksPage.tsx` | Main page |
| `.env` | Backend URL & auth token |

---

## 🎣 Hook Usage

```typescript
// Fetch books
const { books, isLoading, error, fetchBooks } = useGetBooks()

// Create book
const { createBook, isLoading } = useCreateBook()
await createBook({ title: "...", author: "..." })

// Update book
const { updateBook, isLoading } = useUpdateBook()
await updateBook(bookId, { title: "..." })

// Delete book
const { deleteBook, isLoading } = useDeleteBook()
await deleteBook(bookId)

// Get single book
const { book, isLoading, fetchBook } = useGetBook(bookId)
```

---

## 🧪 Test Query (GraphQL Playground)

```graphql
query {
  bookList {
    id
    title
    author
    year
    genre
    publisher
  }
}
```

---

## 📊 Database Schema

```typescript
{
  _id: ObjectId,
  id: "uuid-string",
  title: "string",
  author: "string",
  year: number,
  genre: "Fiction|Non-Fiction|...",
  publisher: "string",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚨 Common Commands

```bash
# Check Docker
docker-compose ps

# View backend logs
cd backend && npm run dev

# View frontend logs
cd frontend && npm run dev

# Rebuild containers
docker-compose down && docker-compose up -d

# Access MongoDB shell
docker exec -it mongo1 mongosh

# Kill port 5050 (if stuck)
netstat -ano | findstr :5050
taskkill /PID <PID> /F
```

---

## ✅ Verification

```bash
# Backend responding?
curl http://localhost:5050/graphql

# Frontend running?
curl http://localhost:3000

# MongoDB healthy?
docker-compose ps | grep mongo

# No errors?
# Check browser console (F12)
# Check terminal output
```

---

## 🎨 UI Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `BooksPage` | none | Main container |
| `BookForm` | onSubmit, isLoading, onCancel | Create/edit form |
| `BookCard` | book, onEdit, onDelete | Display card |
| `SearchBar` | onSearch, isLoading | Search input |
| `Dialog` | isOpen, onClose, title | Modal |
| `LoadingSpinner` | none | Loading state |
| `EmptyState` | title, description, action | Empty msg |
| `ErrorAlert` | message, onDismiss | Error notification |
| `SuccessAlert` | message, onDismiss | Success notification |

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5050
NEXT_PUBLIC_AUTH_TOKEN=your_auth_token_here
```

---

## 🐛 Debug Mode

```typescript
// Enable in browser console:
localStorage.debug = '*'

// Or in Apollo Client config:
const link = from([
  errorLink,  // Logs errors
  httpLink
])
```

---

## 📈 Performance Tips

- Apollo caches queries automatically
- Use `fetchPolicy: 'cache-first'` for repeated queries
- Implement pagination for large lists
- Use debouncing on search (already done)

---

## 🎯 CRUD Operations Matrix

| Operation | Hook | Mutation | Variables |
|-----------|------|----------|-----------|
| Read All | `useGetBooks()` | `bookList` | none |
| Read One | `useGetBook(id)` | `book` | `{ id }` |
| Create | `useCreateBook()` | `bookCreate` | `{ input }` |
| Update | `useUpdateBook()` | `bookUpdate` | `{ id, input }` |
| Delete | `useDeleteBook()` | `bookDelete` | `{ id }` |

---

## 🚦 Status Codes

| Status | Meaning |
|--------|---------|
| ✅ 200 OK | Success |
| ⚠️ 400 Bad Request | Invalid input |
| 🔴 500 Server Error | Backend error |
| 🔴 Network Error | Connection failed |

---

## 🎓 Key Concepts

- **Query**: Fetch data (read-only)
- **Mutation**: Modify data (create/update/delete)
- **Variables**: Dynamic parameters in queries
- **Fragment**: Reusable query piece
- **Subscription**: Real-time updates (not implemented)

---

## 🏗️ Architecture Layers

```
┌─────────────────┐
│  React (UI)     │
├─────────────────┤
│  Hooks (Logic)  │
├─────────────────┤
│  Apollo (HTTP)  │
├─────────────────┤
│  GraphQL (API)  │
├─────────────────┤
│  MongoDB (DB)   │
└─────────────────┘
```

---

## 🔗 Data Binding

```
User Input → Form State → Hook Call → GraphQL → Backend → MongoDB
     ↑              ↑           ↑         ↑        ↑
   onClick      useState    useCallback  query  resolver
     
Response → Cache Update → Store Update → Re-render
   ↓            ↓              ↓            ↓
 Data      setBooks      onBookCreate   Component
```

---

## 📚 File Size Reference

| File | Lines | Purpose |
|------|-------|---------|
| `useBooks.ts` | ~163 | All hooks |
| `BooksPage.tsx` | ~223 | Main component |
| `client.ts` | ~40 | Apollo config |
| `queries.ts` | ~82 | GQL strings |

---

## ⏱️ Expected Times

| Task | Time |
|------|------|
| Docker startup | 10-30s |
| Backend startup | 5-10s |
| Frontend startup | 10-20s |
| First load (cold) | 5-10s |
| Subsequent loads | <1s (cached) |

---

## 🎉 Success = All Working!

- ✅ Load books automatically
- ✅ Create book with form
- ✅ Search filters books
- ✅ Edit book details
- ✅ Delete books
- ✅ Error messages show
- ✅ Success messages show
- ✅ No console errors

**If all above work → Implementation is complete! 🚀**

---

## 📖 Documentation

- `SETUP_COMPLETE.md` - Quick start
- `GRAPHQL_IMPLEMENTATION_GUIDE.md` - Full guide
- `GRAPHQL_IMPLEMENTATION_COMPLETE.md` - Summary
- `ARCHITECTURE.md` - Diagrams
- `VERIFICATION_CHECKLIST.md` - Testing
- This file → Quick reference

---

**Ready? Run the 3-Step Launch above! 🚀**
