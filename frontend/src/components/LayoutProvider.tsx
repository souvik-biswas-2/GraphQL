'use client'

import { apolloClient } from '@/lib/graphql/client';
import { ApolloProvider } from '@apollo/client';
import { ToastProvider } from '@/contexts/ToastContext';

type Props = {
    children : React.ReactNode
}


export default function LayoutProvider({ children }: Props) {
  return (
    <ApolloProvider client={apolloClient}>
      <ToastProvider>{children}</ToastProvider>
    </ApolloProvider>
  )
}
