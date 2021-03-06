import { GraphQLResolveInfo } from 'graphql';
import { Context } from './';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  author: Author;
  genres?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
};

export type User = {
   __typename?: 'User';
  username: Scalars['String'];
  favoriteGenre: Scalars['String'];
  id: Scalars['ID'];
};

export type Token = {
   __typename?: 'Token';
  value: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  bookCount: Scalars['Int'];
  authorCount: Scalars['Int'];
  allBooks?: Maybe<Array<Book>>;
  allAuthors?: Maybe<Array<Author>>;
  me?: Maybe<User>;
};


export type QueryAllBooksArgs = {
  authorName?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  editAuthor?: Maybe<Author>;
  createUser?: Maybe<User>;
  login?: Maybe<Token>;
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


export type MutationCreateUserArgs = {
  username: Scalars['String'];
  favoriteGenre: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
   __typename?: 'Subscription';
  bookAdded: Book;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<any>,
  Boolean: ResolverTypeWrapper<any>,
  Author: ResolverTypeWrapper<any>,
  ID: ResolverTypeWrapper<any>,
  Int: ResolverTypeWrapper<any>,
  Book: ResolverTypeWrapper<any>,
  User: ResolverTypeWrapper<any>,
  Token: ResolverTypeWrapper<any>,
  Query: ResolverTypeWrapper<{}>,
  Mutation: ResolverTypeWrapper<{}>,
  Subscription: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: any,
  Boolean: any,
  Author: any,
  ID: any,
  Int: any,
  Book: any,
  User: any,
  Token: any,
  Query: {},
  Mutation: {},
  Subscription: {},
};

export type AuthorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  born?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  bookCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type BookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  published?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>,
  genres?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  favoriteGenre?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TokenResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bookCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  authorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  allBooks?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType, RequireFields<QueryAllBooksArgs, never>>,
  allAuthors?: Resolver<Maybe<Array<ResolversTypes['Author']>>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationAddBookArgs, 'title' | 'author' | 'published' | 'genres'>>,
  editAuthor?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<MutationEditAuthorArgs, 'name' | 'born'>>,
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'username' | 'favoriteGenre'>>,
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>,
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  bookAdded?: SubscriptionResolver<ResolversTypes['Book'], "bookAdded", ParentType, ContextType>,
};

export type Resolvers<ContextType = Context> = {
  Author?: AuthorResolvers<ContextType>,
  Book?: BookResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Token?: TokenResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
