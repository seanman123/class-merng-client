import React from 'react';
import App from './App'; 
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from 'apollo-link-context'; 

const httpLink = createHttpLink({
    uri: 'https://limitless-citadel-47087.herokuapp.com/'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken'); 
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)