# 📚 Book Library - GraphQL Full Stack Application

A modern, full-stack book management application built with **GraphQL**, **Next.js**, **Node.js**, and **MongoDB**. Features real-time data synchronization, dark theme UI, and a beautiful glowing card design.

## 🎨 Features

### Frontend (Next.js)
- **Dark Theme UI** - Modern dark mode with sleek design and glowing effects
- **Real-time Search** - Instant book filtering by title, author, genre, or publisher
- **Responsive Design** - Fully responsive layout that works on all devices
- **GraphQL Integration** - Apollo Client for optimized data fetching
- **Modern Components**:
  - Glowing card components with hover effects
  - Smooth dialog modals for create/update operations
  - Toast notifications for user feedback
  - Loading spinners and empty states
- **Form Validation** - Client-side validation with error messages
- **State Management** - Zustand for local state management

### Backend (Node.js + Express)
- **GraphQL API** - Full-featured GraphQL server with Apollo Server
- **MongoDB Integration** - Persistent data storage with MongoDB
- **Book Management Operations**:
  - Create new books
  - Read/retrieve books with filtering
  - Update existing books
  - Delete books
- **Type Safety** - TypeScript for type-safe code
- **Middleware** - Authentication and error handling middleware

## 📁 Project Structure

```
GraphQL/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── layout.tsx   # Root layout with dark theme
│   │   │   ├── page.tsx     # Home page
│   │   │   └── global.css   # Global styles
│   │   ├── components/      # React components
│   │   │   ├── BookCard.tsx          # Book display card with glow effect
│   │   │   ├── BookForm.tsx          # Book create/update form
│   │   │   ├── BooksPage.tsx         # Main books page
│   │   │   ├── Dialog.tsx            # Modal dialog component
│   │   │   ├── SearchBar.tsx         # Search functionality
│   │   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   │   ├── ErrorAlert.tsx        # Error notifications
│   │   │   ├── SuccessAlert.tsx      # Success notifications
│   │   │   └── EmptyState.tsx        # Empty state UI
│   │   ├── lib/
│   │   │   ├── graphql/
│   │   │   │   ├── client.ts         # Apollo Client configuration
│   │   │   │   ├── queries.ts        # GraphQL queries and mutations
│   │   │   │   └── types.ts          # TypeScript types
│   │   │   └── utils/
│   │   │       └── toast.ts          # Toast notification utilities
│   │   ├── hooks/
│   │   │   └── useBooks.ts           # Custom hooks for book operations
│   │   ├── stores/
│   │   │   └── useBookStore.ts       # Zustand store for state management
│   │   ├── contexts/
│   │   │   └── ToastContext.tsx      # Toast context provider
│   │   └── types/
│   │       └── *.d.ts                # TypeScript type definitions
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
├── backend/                  # Node.js/Express GraphQL server
│   ├── src/
│   │   ├── index.ts                  # Server entry point
│   │   ├── lib/
│   │   │   ├── db/
│   │   │   │   └── index.ts          # MongoDB connection
│   │   │   └── graphql/
│   │   │       ├── schema.ts         # GraphQL schema definition
│   │   │       └── global.schema.ts  # Global GraphQL types
│   │   ├── middleware/
│   │   │   ├── index.ts              # Middleware setup
│   │   │   └── graphql/
│   │   │       └── auth.middleware.ts # Authentication middleware
│   │   ├── model/
│   │   │   └── book.model.ts         # Book data model
│   │   └── types/
│   │       └── *.d.ts                # TypeScript type definitions
│   ├── package.json
│   ├── tsconfig.json
│   └── src/index.ts
│
├── docker-compose.yml        # Docker configuration for MongoDB
├── init-mongo.js             # MongoDB initialization script
├── mongo-keyfile             # Encryption key for MongoDB
└── package.json              # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Docker)
- Docker (for MongoDB container)

### Installation

1. **Clone the repository**
```bash
cd GraphQL
```

2. **Install dependencies**
```bash
npm install
```

This installs dependencies for both frontend and backend through the root package.json scripts.

3. **Setup MongoDB**
```bash
# Using Docker Compose
docker-compose up -d
```

4. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

5. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

### Running the Application

#### Start Both Frontend and Backend
```bash
npm run dev
```

This runs both the backend development server (port 4000) and frontend development server (port 3000) concurrently.

#### Start Only Backend
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:4000`

#### Start Only Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15+ with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS with dark theme
- **State Management**: Zustand
- **Data Fetching**: Apollo Client (GraphQL)
- **Notifications**: Custom Toast Context

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: Apollo Server (GraphQL)
- **Database**: MongoDB
- **Language**: TypeScript
- **ORM**: Mongoose (for MongoDB)

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: MongoDB with Docker

## 📊 API Documentation

### GraphQL Queries

**Get All Books**
```graphql
query GetBooks {
  books {
    _id
    title
    author
    genre
    year
    publisher
    createdAt
    updatedAt
  }
}
```

**Get Book by ID**
```graphql
query GetBook($id: ID!) {
  book(id: $id) {
    _id
    title
    author
    genre
    year
    publisher
  }
}
```

### GraphQL Mutations

**Create Book**
```graphql
mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    _id
    title
    author
    genre
    year
    publisher
  }
}
```

**Update Book**
```graphql
mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
  updateBook(id: $id, input: $input) {
    _id
    title
    author
    genre
    year
    publisher
  }
}
```

**Delete Book**
```graphql
mutation DeleteBook($id: ID!) {
  deleteBook(id: $id)
}
```

## 🎨 UI/UX Features

### Dark Theme
- Complete dark mode implementation with slate color palette
- Smooth transitions and hover effects
- High contrast for accessibility

### Glowing Effects
- Modern glow effects on cards on hover
- Gradient backgrounds with opacity transitions
- Smooth animation timing for elegant feel

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible grid layouts

### User Feedback
- Real-time form validation
- Toast notifications for success/error states
- Loading spinners during data operations
- Empty state messaging

## 🔒 Security Features

- Environment variables for sensitive data
- GraphQL input validation
- Error handling and logging
- Type-safe operations with TypeScript

## 📝 Book Model Schema

```typescript
{
  _id: ObjectId              // MongoDB ID
  title: String              // Book title (required)
  author: String             // Author name (required)
  genre: String              // Book genre (required)
  year: Number               // Publication year (required)
  publisher: String          // Publisher name (required)
  createdAt: Date            // Creation timestamp
  updatedAt: Date            // Last update timestamp
}
```

## 🎯 Available Genres

- Fiction
- Non-Fiction
- Mystery
- Romance
- Science Fiction
- Fantasy
- Thriller
- Biography

## 🚦 Development Workflow

1. **Frontend Development**
   - Components in `frontend/src/components/`
   - Styles with Tailwind CSS classes
   - State management with Zustand stores
   - GraphQL queries in `frontend/src/lib/graphql/`

2. **Backend Development**
   - GraphQL schema in `backend/src/lib/graphql/`
   - Models in `backend/src/model/`
   - Resolvers in schema definitions
   - Middleware in `backend/src/middleware/`

3. **Database**
   - MongoDB running in Docker
   - Automatic connection through environment variables
   - Data persists in Docker volumes

## 🐛 Troubleshooting

### Port Already in Use
- Frontend (3000): Kill process or use different port
- Backend (4000): Kill process or use different port

### MongoDB Connection Error
- Ensure Docker is running: `docker ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- Verify connection string in backend `.env`

### GraphQL Errors
- Check backend logs for resolver errors
- Verify query/mutation syntax
- Check Apollo DevTools in browser

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Last Updated**: December 16, 2025
**Version**: 1.0.0
