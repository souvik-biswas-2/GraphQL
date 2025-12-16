import mongoose, { Model } from 'mongoose';
import { BookDoc, GraphContext } from '../types';
import gql from 'graphql-tag';

// for mongoose documents, we need to extend the document interface from mongoose
interface BookMongoDoc extends BookDoc {

}

// for mongoose models, we need to extend the Model interface from mongoose
interface BookMongoModel extends Model<BookMongoDoc> {
    
}

const BookSchema = new mongoose.Schema<BookMongoDoc>(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // created time and update time set up automatically
  }
)

// Create unique index for id field
BookSchema.index({ id: 1 }, { unique: true })

// Create indexes for search
BookSchema.index(
  { title: 'text', author: 'text', genre: 'text', publisher: 'text' },
  { default_language: 'none' },
)

// Hooks 
BookSchema.pre('save', async function (next) {
  // Generate unique id for new document if id is not given
  if (!this.id) {
    // Generate a id for the document
    this.id = `book_${this._id}`
  }

  next()
})

const BookModel = mongoose.model<BookMongoDoc, BookMongoModel>(
  'book',
  BookSchema,
)

export default BookModel

// GraphQL types
// Defining
export const BookTypeDef = gql `

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

  extend type Query {
    bookList: [Book]!
    book(id: ID!): Book!
  }

  extend type Mutation {
    # model name then action 
    bookCreate(input: BookInput!): Book
    bookUpdate(id: ID!, input: BookInput!): Book
    bookDelete(id: ID!): Book
  }

`

export const BookResolver = {
//   Query: {
//     bookList: async (_: any, __: any, { req }: GraphContext) => {
//       authMiddlewareGraph(req)
//       const books = BookModel.find().sort({ createdAt: -1 })
//       return books
//     },
//     book: async (_: any, { id }: any, { req }: GraphContext) => {
//       authMiddlewareGraph(req)
//       const book = BookModel.findById(id)
//       return book
//     },
//   },
  Mutation: {
    // _ never used next input and next context (req) in index.js 
    // app.js->>expressMiddleware->>context
    bookCreate: async (_: any, { input }: any, { req }: GraphContext) => {
    // for auhtentication in express we can use middleware here but in graphQL can't 
    // we have to set up functions for authentication
    //   authMiddlewareGraph(req)
      const book = new BookModel(input)
      await book.save()
      return book
    },
    // bookUpdate: async (_: any, { id, input }: any, { req }: GraphContext) => {
    //   authMiddlewareGraph(req)
    //   return await BookModel.findByIdAndUpdate(id, input, { new: true })
    // },
    // bookDelete: async (_: any, { id }: any, { req }: GraphContext) => {
    //   authMiddlewareGraph(req)
    //   return await BookModel.findByIdAndDelete(id)
    // },
  },
}