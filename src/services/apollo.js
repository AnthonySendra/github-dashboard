import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default token =>
  new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${token}`
      }
    }),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== 'production'
  })
