/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
   __typename?: 'Author';
  name: Scalars['String'];
  id: Scalars['ID'];
  born?: Maybe<Scalars['Int']>;
  bookCount: Scalars['Int'];
};

export type Book = {
   __typename?: 'Book';
  title: Scalars['String'];
  published: Scalars['Int'];
  author: Scalars['String'];
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
};

export type Query = {
   __typename?: 'Query';
  bookCount: Scalars['Int'];
  authorCount: Scalars['Int'];
  allBooks?: Maybe<Array<Book>>;
  allAuthors?: Maybe<Array<Author>>;
};


export type QueryAllBooksArgs = {
  author?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  editAuthor?: Maybe<Author>;
};


export type MutationAddBookArgs = {
  title: Scalars['String'];
  author: Scalars['String'];
  published: Scalars['Int'];
  genres: Array<Scalars['String']>;
};


export type MutationEditAuthorArgs = {
  name: Scalars['String'];
  born: Scalars['Int'];
};

export type AllBooksQueryVariables = {};


export type AllBooksQuery = (
  { __typename?: 'Query' }
  & { allBooks?: Maybe<Array<(
    { __typename?: 'Book' }
    & Pick<Book, 'title' | 'published' | 'author'>
  )>> }
);

export type AllAuthorsQueryVariables = {};


export type AllAuthorsQuery = (
  { __typename?: 'Query' }
  & { allAuthors?: Maybe<Array<(
    { __typename?: 'Author' }
    & Pick<Author, 'name' | 'born' | 'bookCount'>
  )>> }
);

export type AddBookMutationVariables = {
  title: Scalars['String'];
  author: Scalars['String'];
  published: Scalars['Int'];
  genres: Array<Scalars['String']>;
};


export type AddBookMutation = (
  { __typename?: 'Mutation' }
  & { addBook?: Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'title' | 'author' | 'published' | 'genres'>
  )> }
);

export type EditAuthorMutationVariables = {
  name: Scalars['String'];
  born: Scalars['Int'];
};


export type EditAuthorMutation = (
  { __typename?: 'Mutation' }
  & { editAuthor?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, 'name' | 'id' | 'born' | 'bookCount'>
  )> }
);


export const AllBooksDocument = gql`
    query allBooks {
  allBooks {
    title
    published
    author
  }
}
    `;

/**
 * __useAllBooksQuery__
 *
 * To run a query within a React component, call `useAllBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBooksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllBooksQuery, AllBooksQueryVariables>) {
        return ApolloReactHooks.useQuery<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, baseOptions);
      }
export function useAllBooksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllBooksQuery, AllBooksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, baseOptions);
        }
export type AllBooksQueryHookResult = ReturnType<typeof useAllBooksQuery>;
export type AllBooksLazyQueryHookResult = ReturnType<typeof useAllBooksLazyQuery>;
export type AllBooksQueryResult = ApolloReactCommon.QueryResult<AllBooksQuery, AllBooksQueryVariables>;
export const AllAuthorsDocument = gql`
    query allAuthors {
  allAuthors {
    name
    born
    bookCount
  }
}
    `;

/**
 * __useAllAuthorsQuery__
 *
 * To run a query within a React component, call `useAllAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAuthorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllAuthorsQuery, AllAuthorsQueryVariables>) {
        return ApolloReactHooks.useQuery<AllAuthorsQuery, AllAuthorsQueryVariables>(AllAuthorsDocument, baseOptions);
      }
export function useAllAuthorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllAuthorsQuery, AllAuthorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllAuthorsQuery, AllAuthorsQueryVariables>(AllAuthorsDocument, baseOptions);
        }
export type AllAuthorsQueryHookResult = ReturnType<typeof useAllAuthorsQuery>;
export type AllAuthorsLazyQueryHookResult = ReturnType<typeof useAllAuthorsLazyQuery>;
export type AllAuthorsQueryResult = ApolloReactCommon.QueryResult<AllAuthorsQuery, AllAuthorsQueryVariables>;
export const AddBookDocument = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author
    published
    genres
  }
}
    `;
export type AddBookMutationFn = ApolloReactCommon.MutationFunction<AddBookMutation, AddBookMutationVariables>;

/**
 * __useAddBookMutation__
 *
 * To run a mutation, you first call `useAddBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookMutation, { data, loading, error }] = useAddBookMutation({
 *   variables: {
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      published: // value for 'published'
 *      genres: // value for 'genres'
 *   },
 * });
 */
export function useAddBookMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
        return ApolloReactHooks.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, baseOptions);
      }
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = ApolloReactCommon.MutationResult<AddBookMutation>;
export type AddBookMutationOptions = ApolloReactCommon.BaseMutationOptions<AddBookMutation, AddBookMutationVariables>;
export const EditAuthorDocument = gql`
    mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    id
    born
    bookCount
  }
}
    `;
export type EditAuthorMutationFn = ApolloReactCommon.MutationFunction<EditAuthorMutation, EditAuthorMutationVariables>;

/**
 * __useEditAuthorMutation__
 *
 * To run a mutation, you first call `useEditAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAuthorMutation, { data, loading, error }] = useEditAuthorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      born: // value for 'born'
 *   },
 * });
 */
export function useEditAuthorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditAuthorMutation, EditAuthorMutationVariables>) {
        return ApolloReactHooks.useMutation<EditAuthorMutation, EditAuthorMutationVariables>(EditAuthorDocument, baseOptions);
      }
export type EditAuthorMutationHookResult = ReturnType<typeof useEditAuthorMutation>;
export type EditAuthorMutationResult = ApolloReactCommon.MutationResult<EditAuthorMutation>;
export type EditAuthorMutationOptions = ApolloReactCommon.BaseMutationOptions<EditAuthorMutation, EditAuthorMutationVariables>;