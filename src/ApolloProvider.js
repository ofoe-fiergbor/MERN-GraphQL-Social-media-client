import React from 'react'
import App from './App'
import {setContext} from 'apollo-link-context'
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client'


const httpLink = createHttpLink({
    uri:'https://hi-world-mern-graphql.herokuapp.com/'
})

const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken')
    return{
        headers:{
            Authorization: token ? `Bearer ${token}`:''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})


export default(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)