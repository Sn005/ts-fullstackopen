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

export type Query = {
   __typename?: 'Query';
  personCount: Scalars['Int'];
  allPersons: Array<Person>;
  findPerson?: Maybe<Person>;
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
  YesNo: ResolverTypeWrapper<any>,
  Person: ResolverTypeWrapper<any>,
  ID: ResolverTypeWrapper<any>,
  Address: ResolverTypeWrapper<any>,
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<any>,
  Mutation: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: any,
  Boolean: any,
  YesNo: any,
  Person: any,
  ID: any,
  Address: any,
  Query: {},
  Int: any,
  Mutation: {},
};

export type PersonResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  personCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  allPersons?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryAllPersonsArgs, never>>,
  findPerson?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryFindPersonArgs, 'name'>>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPerson?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<MutationAddPersonArgs, 'name' | 'street' | 'city'>>,
  editNumber?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<MutationEditNumberArgs, 'name' | 'phone'>>,
};

export type Resolvers<ContextType = Context> = {
  Person?: PersonResolvers<ContextType>,
  Address?: AddressResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
