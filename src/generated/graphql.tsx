import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  messages?: Maybe<Array<Message>>;
  participants: Array<UsersInConversations>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  author: User;
  conversationId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  read: Scalars['Boolean'];
  text: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assingConversation: UsersInConversations;
  createConversation: Conversation;
  createPost: Post;
  createProfile: Profile;
  deletePost: Scalars['Boolean'];
  editProfile: UserResponse;
  findByUsername: Profile;
  follow: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  readMessage: Scalars['Boolean'];
  register: UserResponse;
  sendMessage: Message;
  unfollow: Scalars['Boolean'];
  updatePost: Post;
  vote: Scalars['Boolean'];
};


export type MutationAssingConversationArgs = {
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateProfileArgs = {
  bio: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationEditProfileArgs = {
  bio: Scalars['String'];
  email: Scalars['String'];
};


export type MutationFindByUsernameArgs = {
  username: Scalars['String'];
};


export type MutationFollowArgs = {
  userId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationReadMessageArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationSendMessageArgs = {
  conversationId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  newContent: Scalars['String'];
  newTitle: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['String'];
  value: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  points: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  id: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  activeConversations: Array<Conversation>;
  argumentedPost: PaginatedPosts;
  conversationFromId: Conversation;
  findUser: User;
  followers: Array<User>;
  followings: Array<User>;
  hello: Scalars['String'];
  me: User;
  messagesInConversation: Array<Message>;
  participants: Conversation;
  participantsFromConversationId: Array<Conversation>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  profile: Profile;
  profileFromId: Profile;
};


export type QueryArgumentedPostArgs = {
  numberPosts: Scalars['Float'];
};


export type QueryConversationFromIdArgs = {
  id: Scalars['String'];
};


export type QueryFindUserArgs = {
  username: Scalars['String'];
};


export type QueryMessagesInConversationArgs = {
  id: Scalars['String'];
};


export type QueryParticipantsArgs = {
  id: Scalars['String'];
};


export type QueryParticipantsFromConversationIdArgs = {
  id: Array<Scalars['String']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryProfileFromIdArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  followExecuted: Scalars['Boolean'];
  messageSent: Message;
  unfollowExecuted: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  conversations: Array<UsersInConversations>;
  email: Scalars['String'];
  id: Scalars['String'];
  posts: Array<Post>;
  profile?: Maybe<Profile>;
  username: Scalars['String'];
};

export type UserCount = {
  __typename?: 'UserCount';
  Message: Scalars['Int'];
  conversations: Scalars['Int'];
  followedBy: Scalars['Int'];
  following: Scalars['Int'];
  posts: Scalars['Int'];
  upvotes: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  profile?: Maybe<Profile>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersInConversations = {
  __typename?: 'UsersInConversations';
  conversationId: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type PostSnippetFragment = { __typename?: 'Post', id: string, createdAt: any, title: string, content?: Maybe<string>, points: number, voteStatus?: Maybe<number>, author: { __typename?: 'User', id: string, username: string } };

export type AssingConversationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AssingConversationMutation = { __typename?: 'Mutation', assingConversation: { __typename?: 'UsersInConversations', conversationId: string, userId: string } };

export type CreateConversationMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', id: string, createdAt: any } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, createdAt: any, title: string, content?: Maybe<string>, userId: string } };

export type CreateProfileMutationVariables = Exact<{
  bio: Scalars['String'];
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', id: string, bio: string, user: { __typename?: 'User', id: string, email: string, username: string } } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type EditProfileMutationVariables = Exact<{
  email: Scalars['String'];
  bio: Scalars['String'];
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UserResponse', profile?: Maybe<{ __typename?: 'Profile', bio: string, user: { __typename?: 'User', email: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type FindByUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FindByUsernameMutation = { __typename?: 'Mutation', findByUsername: { __typename?: 'Profile', id: string, bio: string, user: { __typename?: 'User', id: string, email: string, username: string } } };

export type FollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, email: string, username: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ReadMessageMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ReadMessageMutation = { __typename?: 'Mutation', readMessage: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string }> } };

export type SendMessageMutationVariables = Exact<{
  conversationId: Scalars['String'];
  text: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, text: string, createdAt: any } };

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: boolean };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  newTitle: Scalars['String'];
  newContent: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, title: string, content?: Maybe<string> } };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type ActiveConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveConversationsQuery = { __typename?: 'Query', activeConversations: Array<{ __typename?: 'Conversation', id: string, participants: Array<{ __typename?: 'UsersInConversations', user?: Maybe<{ __typename?: 'User', id: string, username: string }> }> }> };

export type ArgumentedPostQueryVariables = Exact<{
  numberPosts: Scalars['Float'];
}>;


export type ArgumentedPostQuery = { __typename?: 'Query', argumentedPost: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, createdAt: any, title: string, voteStatus?: Maybe<number>, points: number, content?: Maybe<string>, author: { __typename?: 'User', id: string, username: string } }> } };

export type ConversationFromIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ConversationFromIdQuery = { __typename?: 'Query', conversationFromId: { __typename?: 'Conversation', messages?: Maybe<Array<{ __typename?: 'Message', id: number, text: string, createdAt: any, author: { __typename?: 'User', id: string, username: string } }>> } };

export type FollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type FollowersQuery = { __typename?: 'Query', followers: Array<{ __typename?: 'User', id: string, username: string }> };

export type FollowingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FollowingsQuery = { __typename?: 'Query', followings: Array<{ __typename?: 'User', id: string, username: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, username: string } };

export type MessagesInConversationQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MessagesInConversationQuery = { __typename?: 'Query', messagesInConversation: Array<{ __typename?: 'Message', id: number, text: string, createdAt: any, author: { __typename?: 'User', id: string, username: string } }> };

export type ParticipantsFromConversationIdQueryVariables = Exact<{
  id: Array<Scalars['String']> | Scalars['String'];
}>;


export type ParticipantsFromConversationIdQuery = { __typename?: 'Query', participantsFromConversationId: Array<{ __typename?: 'Conversation', participants: Array<{ __typename?: 'UsersInConversations', userId: string, user?: Maybe<{ __typename?: 'User', username: string }> }> }> };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: string, createdAt: any, title: string, content?: Maybe<string>, author: { __typename?: 'User', id: string, username: string } }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, createdAt: any, title: string, voteStatus?: Maybe<number>, points: number, content?: Maybe<string>, author: { __typename?: 'User', id: string, username: string } }> } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', id: string, bio: string, user: { __typename?: 'User', username: string, email: string, _count?: Maybe<{ __typename?: 'UserCount', posts: number, followedBy: number, following: number }>, posts: Array<{ __typename?: 'Post', id: string, title: string, createdAt: any, content?: Maybe<string>, points: number, voteStatus?: Maybe<number>, author: { __typename?: 'User', id: string, username: string } }> } } };

export type ProfileFromIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProfileFromIdQuery = { __typename?: 'Query', profileFromId: { __typename?: 'Profile', id: string, bio: string, user: { __typename?: 'User', username: string, id: string, email: string, _count?: Maybe<{ __typename?: 'UserCount', posts: number, followedBy: number, following: number }>, posts: Array<{ __typename?: 'Post', id: string, createdAt: any, title: string, content?: Maybe<string>, voteStatus?: Maybe<number>, points: number, author: { __typename?: 'User', id: string, username: string } }> } } };

export type FollowExecutedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type FollowExecutedSubscription = { __typename?: 'Subscription', followExecuted: boolean };

export type MessageSentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSentSubscription = { __typename?: 'Subscription', messageSent: { __typename: 'Message', id: number, text: string, createdAt: any, userId: string, author: { __typename: 'User', id: string, username: string } } };

export type UnfollowExecutedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UnfollowExecutedSubscription = { __typename?: 'Subscription', unfollowExecuted: boolean };

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  title
  content
  author {
    id
    username
  }
  points
  voteStatus
}
    `;
export const AssingConversationDocument = gql`
    mutation AssingConversation($id: String!) {
  assingConversation(id: $id) {
    conversationId
    userId
  }
}
    `;

export function useAssingConversationMutation() {
  return Urql.useMutation<AssingConversationMutation, AssingConversationMutationVariables>(AssingConversationDocument);
};
export const CreateConversationDocument = gql`
    mutation CreateConversation {
  createConversation {
    id
    createdAt
  }
}
    `;

export function useCreateConversationMutation() {
  return Urql.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    createdAt
    title
    content
    userId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateProfileDocument = gql`
    mutation CreateProfile($bio: String!) {
  createProfile(bio: $bio) {
    id
    bio
    user {
      id
      email
      username
    }
  }
}
    `;

export function useCreateProfileMutation() {
  return Urql.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const EditProfileDocument = gql`
    mutation EditProfile($email: String!, $bio: String!) {
  editProfile(email: $email, bio: $bio) {
    profile {
      bio
      user {
        email
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useEditProfileMutation() {
  return Urql.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument);
};
export const FindByUsernameDocument = gql`
    mutation FindByUsername($username: String!) {
  findByUsername(username: $username) {
    id
    bio
    user {
      id
      email
      username
    }
  }
}
    `;

export function useFindByUsernameMutation() {
  return Urql.useMutation<FindByUsernameMutation, FindByUsernameMutationVariables>(FindByUsernameDocument);
};
export const FollowDocument = gql`
    mutation Follow($userId: String!) {
  follow(userId: $userId)
}
    `;

export function useFollowMutation() {
  return Urql.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ReadMessageDocument = gql`
    mutation ReadMessage($id: String!) {
  readMessage(id: $id)
}
    `;

export function useReadMessageMutation() {
  return Urql.useMutation<ReadMessageMutation, ReadMessageMutationVariables>(ReadMessageDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($conversationId: String!, $text: String!) {
  sendMessage(conversationId: $conversationId, text: $text) {
    id
    text
    createdAt
  }
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const UnfollowDocument = gql`
    mutation Unfollow($userId: String!) {
  unfollow(userId: $userId)
}
    `;

export function useUnfollowMutation() {
  return Urql.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: String!, $newTitle: String!, $newContent: String!) {
  updatePost(id: $id, newTitle: $newTitle, newContent: $newContent) {
    id
    title
    content
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: String!) {
  vote(value: $value, postId: $postId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const ActiveConversationsDocument = gql`
    query ActiveConversations {
  activeConversations {
    id
    participants {
      user {
        id
        username
      }
    }
  }
}
    `;

export function useActiveConversationsQuery(options: Omit<Urql.UseQueryArgs<ActiveConversationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ActiveConversationsQuery>({ query: ActiveConversationsDocument, ...options });
};
export const ArgumentedPostDocument = gql`
    query argumentedPost($numberPosts: Float!) {
  argumentedPost(numberPosts: $numberPosts) {
    posts {
      id
      createdAt
      title
      voteStatus
      points
      content
      author {
        id
        username
      }
    }
    hasMore
  }
}
    `;

export function useArgumentedPostQuery(options: Omit<Urql.UseQueryArgs<ArgumentedPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ArgumentedPostQuery>({ query: ArgumentedPostDocument, ...options });
};
export const ConversationFromIdDocument = gql`
    query ConversationFromId($id: String!) {
  conversationFromId(id: $id) {
    messages {
      id
      text
      createdAt
      author {
        id
        username
      }
    }
  }
}
    `;

export function useConversationFromIdQuery(options: Omit<Urql.UseQueryArgs<ConversationFromIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ConversationFromIdQuery>({ query: ConversationFromIdDocument, ...options });
};
export const FollowersDocument = gql`
    query Followers {
  followers {
    id
    username
  }
}
    `;

export function useFollowersQuery(options: Omit<Urql.UseQueryArgs<FollowersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FollowersQuery>({ query: FollowersDocument, ...options });
};
export const FollowingsDocument = gql`
    query Followings {
  followings {
    id
    username
  }
}
    `;

export function useFollowingsQuery(options: Omit<Urql.UseQueryArgs<FollowingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FollowingsQuery>({ query: FollowingsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MessagesInConversationDocument = gql`
    query MessagesInConversation($id: String!) {
  messagesInConversation(id: $id) {
    id
    text
    createdAt
    author {
      id
      username
    }
  }
}
    `;

export function useMessagesInConversationQuery(options: Omit<Urql.UseQueryArgs<MessagesInConversationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesInConversationQuery>({ query: MessagesInConversationDocument, ...options });
};
export const ParticipantsFromConversationIdDocument = gql`
    query ParticipantsFromConversationId($id: [String!]!) {
  participantsFromConversationId(id: $id) {
    participants {
      userId
      user {
        username
      }
    }
  }
}
    `;

export function useParticipantsFromConversationIdQuery(options: Omit<Urql.UseQueryArgs<ParticipantsFromConversationIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ParticipantsFromConversationIdQuery>({ query: ParticipantsFromConversationIdDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    id
    createdAt
    title
    content
    author {
      id
      username
    }
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    posts {
      id
      createdAt
      title
      voteStatus
      points
      content
      author {
        id
        username
      }
    }
    hasMore
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    bio
    user {
      username
      email
      _count {
        posts
        followedBy
        following
      }
      posts {
        id
        title
        createdAt
        content
        points
        voteStatus
        author {
          id
          username
        }
      }
    }
  }
}
    `;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options });
};
export const ProfileFromIdDocument = gql`
    query ProfileFromId($id: String!) {
  profileFromId(id: $id) {
    id
    bio
    user {
      username
      id
      email
      _count {
        posts
        followedBy
        following
      }
      posts {
        id
        createdAt
        title
        content
        voteStatus
        points
        author {
          id
          username
        }
      }
    }
  }
}
    `;

export function useProfileFromIdQuery(options: Omit<Urql.UseQueryArgs<ProfileFromIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfileFromIdQuery>({ query: ProfileFromIdDocument, ...options });
};
export const FollowExecutedDocument = gql`
    subscription FollowExecuted {
  followExecuted
}
    `;

export function useFollowExecutedSubscription<TData = FollowExecutedSubscription>(options: Omit<Urql.UseSubscriptionArgs<FollowExecutedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<FollowExecutedSubscription, TData>) {
  return Urql.useSubscription<FollowExecutedSubscription, TData, FollowExecutedSubscriptionVariables>({ query: FollowExecutedDocument, ...options }, handler);
};
export const MessageSentDocument = gql`
    subscription MessageSent {
  messageSent {
    __typename
    id
    text
    createdAt
    userId
    author {
      __typename
      id
      username
    }
  }
}
    `;

export function useMessageSentSubscription<TData = MessageSentSubscription>(options: Omit<Urql.UseSubscriptionArgs<MessageSentSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MessageSentSubscription, TData>) {
  return Urql.useSubscription<MessageSentSubscription, TData, MessageSentSubscriptionVariables>({ query: MessageSentDocument, ...options }, handler);
};
export const UnfollowExecutedDocument = gql`
    subscription UnfollowExecuted {
  unfollowExecuted
}
    `;

export function useUnfollowExecutedSubscription<TData = UnfollowExecutedSubscription>(options: Omit<Urql.UseSubscriptionArgs<UnfollowExecutedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<UnfollowExecutedSubscription, TData>) {
  return Urql.useSubscription<UnfollowExecutedSubscription, TData, UnfollowExecutedSubscriptionVariables>({ query: UnfollowExecutedDocument, ...options }, handler);
};