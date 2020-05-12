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

export enum YesNo {
  Yes = 'YES',
  No = 'NO'
}

export type Person = {
   __typename?: 'Person';
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address: Address;
  id: Scalars['ID'];
};

export type Address = {
   __typename?: 'Address';
  street: Scalars['String'];
  city: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  username: Scalars['String'];
  friends: Array<Person>;
  id: Scalars['ID'];
};

export type Token = {
   __typename?: 'Token';
  value: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  personCount: Scalars['Int'];
  allPersons: Array<Person>;
  findPerson?: Maybe<Person>;
  me?: Maybe<User>;
};


export type QueryAllPersonsArgs = {
  phone?: Maybe<YesNo>;
};


export type QueryFindPersonArgs = {
  name: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  addPerson?: Maybe<Person>;
  editNumber?: Maybe<Person>;
  createUser?: Maybe<User>;
  login?: Maybe<Token>;
  addAsFriend?: Maybe<User>;
};


export type MutationAddPersonArgs = {
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  city: Scalars['String'];
};


export type MutationEditNumberArgs = {
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAddAsFriendArgs = {
  name: Scalars['String'];
};

export type AllPersonsQueryVariables = {};


export type AllPersonsQuery = (
  { __typename?: 'Query' }
  & { allPersons: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'name' | 'phone' | 'id'>
  )> }
);

export type FindPersonByNameQueryVariables = {
  nameToSearch: Scalars['String'];
};


export type FindPersonByNameQuery = (
  { __typename?: 'Query' }
  & { findPerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'name' | 'phone'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city'>
    ) }
  )> }
);

export type CreatePersonMutationVariables = {
  name: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
};


export type CreatePersonMutation = (
  { __typename?: 'Mutation' }
  & { addPerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'name' | 'phone' | 'id'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city'>
    ) }
  )> }
);

export type EditNumberMutationVariables = {
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type EditNumberMutation = (
  { __typename?: 'Mutation' }
  & { editNumber?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'name' | 'phone' | 'id'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city'>
    ) }
  )> }
);

export type LoginMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'Token' }
    & Pick<Token, 'value'>
  )> }
);


export const AllPersonsDocument = gql`
    query allPersons {
  allPersons {
    name
    phone
    id
  }
}
    `;

/**
 * __useAllPersonsQuery__
 *
 * To run a query within a React component, call `useAllPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPersonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllPersonsQuery, AllPersonsQueryVariables>) {
        return ApolloReactHooks.useQuery<AllPersonsQuery, AllPersonsQueryVariables>(AllPersonsDocument, baseOptions);
      }
export function useAllPersonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllPersonsQuery, AllPersonsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllPersonsQuery, AllPersonsQueryVariables>(AllPersonsDocument, baseOptions);
        }
export type AllPersonsQueryHookResult = ReturnType<typeof useAllPersonsQuery>;
export type AllPersonsLazyQueryHookResult = ReturnType<typeof useAllPersonsLazyQuery>;
export type AllPersonsQueryResult = ApolloReactCommon.QueryResult<AllPersonsQuery, AllPersonsQueryVariables>;
export const FindPersonByNameDocument = gql`
    query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    name
    phone
    address {
      street
      city
    }
  }
}
    `;

/**
 * __useFindPersonByNameQuery__
 *
 * To run a query within a React component, call `useFindPersonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPersonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPersonByNameQuery({
 *   variables: {
 *      nameToSearch: // value for 'nameToSearch'
 *   },
 * });
 */
export function useFindPersonByNameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindPersonByNameQuery, FindPersonByNameQueryVariables>) {
        return ApolloReactHooks.useQuery<FindPersonByNameQuery, FindPersonByNameQueryVariables>(FindPersonByNameDocument, baseOptions);
      }
export function useFindPersonByNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindPersonByNameQuery, FindPersonByNameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindPersonByNameQuery, FindPersonByNameQueryVariables>(FindPersonByNameDocument, baseOptions);
        }
export type FindPersonByNameQueryHookResult = ReturnType<typeof useFindPersonByNameQuery>;
export type FindPersonByNameLazyQueryHookResult = ReturnType<typeof useFindPersonByNameLazyQuery>;
export type FindPersonByNameQueryResult = ApolloReactCommon.QueryResult<FindPersonByNameQuery, FindPersonByNameQueryVariables>;
export const CreatePersonDocument = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(name: $name, street: $street, city: $city, phone: $phone) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
    `;
export type CreatePersonMutationFn = ApolloReactCommon.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      name: // value for 'name'
 *      street: // value for 'street'
 *      city: // value for 'city'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, baseOptions);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = ApolloReactCommon.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const EditNumberDocument = gql`
    mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
    `;
export type EditNumberMutationFn = ApolloReactCommon.MutationFunction<EditNumberMutation, EditNumberMutationVariables>;

/**
 * __useEditNumberMutation__
 *
 * To run a mutation, you first call `useEditNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editNumberMutation, { data, loading, error }] = useEditNumberMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useEditNumberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditNumberMutation, EditNumberMutationVariables>) {
        return ApolloReactHooks.useMutation<EditNumberMutation, EditNumberMutationVariables>(EditNumberDocument, baseOptions);
      }
export type EditNumberMutationHookResult = ReturnType<typeof useEditNumberMutation>;
export type EditNumberMutationResult = ApolloReactCommon.MutationResult<EditNumberMutation>;
export type EditNumberMutationOptions = ApolloReactCommon.BaseMutationOptions<EditNumberMutation, EditNumberMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;