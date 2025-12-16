'use client'

import LayoutProvider from '@/components/LayoutProvider'
import { BooksPage } from '@/components/BooksPage'

export default function Home() {
  return (
    <LayoutProvider>
      <BooksPage />
    </LayoutProvider>
  )
}
