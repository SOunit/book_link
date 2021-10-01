import { buildSchema } from 'graphql';

export default buildSchema(`
    type RootQuery {
        itemsByTitle(title: String): [Item!]!
        getUsersByItems(itemIds: [String!]!, userId: String!): [User!]!
        user(id: ID!): User!
        item(id: ID!): Item!
        getUserCount(id: ID!): Int!
        getFollowingUsers(userId: ID!): [FollowingUser!]!
        following(userId: ID!, targetId: ID!): Following
        getUserChat(userIds: [ID!]!): Chat
        getUserChatList(userId: ID!): [Chat]
    }

    type RootMutation {
        createItem(data: CreateItemInput!): Item!
        createUser(id: ID!): User!
        updateUser(data: UpdateUserInput!): User!
        deleteUserItem(data: DeleteUserItemInput!): User!
        addUserItem(data: AddUserItemInput!): User!
        createFollowing(userId: ID!, targetId: ID!): Boolean
        deleteFollowing(userId: ID!, targetId: ID!): Boolean
        createChat(userId: ID!, targetId: ID!): Boolean
        createMessage(chatId: ID!, userId: ID!, text: String!): Message
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

    input AddUserItemInput {
        userId: ID!
        itemId: ID!
    }

    input DeleteUserItemInput {
        userId: ID!
        itemId: ID!
    }

    input UpdateUserInput {
        id: ID!
        name: String!
        imageUrl: String!
        about: String!
    }

    input CreateItemInput {
        title: String!
        author: String!
        imageUrl: String
    }

    type Item {
        id: ID!
        title: String!
        author: String!
        imageUrl: String
        users: [User]
    }

    type User {
        id: ID!
        name: String!
        about: String
        imageUrl: String
        items: [Item]
        chats: [Chat]
    }

    type FollowingUser {
        id: ID
        name: String
        imageUrl: String
        isFollowing: Boolean
    }

    type Following {
        userId: ID
        targetId: ID
    }

    type Chat {
        id: ID
        users: [User]
        messages: [Message]
    }

    type Message {
        id: ID
        chatId: ID
        userId: ID
        text: String
    }
`);
