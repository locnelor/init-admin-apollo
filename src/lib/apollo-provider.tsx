"use client"

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "./cookie";
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from "@apollo/client/utilities";
import React, { useMemo } from "react";

const makeClient = () => {
    const authLink = setContext((_, { headers }) => {
        const token = getCookie("token")
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            },
        };
    });

    const httpLink = authLink.concat(new HttpLink({
        uri: `${import.meta.env.VITE_BASE_URL}/graphql`
    }))
    const wsLink = new GraphQLWsLink(
        createClient({
            url: `${import.meta.env.VITE_WSGRAPHQL}/graphql`,
            connectionParams: () => {
                const token = getCookie("token")
                return {
                    Authorization: `Bearer ${token}`,
                };
            },
        }),
    );
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([
            splitLink
        ])
    })
}
export const ApolloWrapper = ({ children }: React.PropsWithChildren) => {

    const client = useMemo(() => makeClient(), []);
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}