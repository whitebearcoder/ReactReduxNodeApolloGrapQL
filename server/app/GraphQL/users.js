import { gql } from 'apollo-server-express';
import * as db from '../database';

export const typeDefs = gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID!
    email: String
    name: String
  }

  input UserInput {
    name: String
    email: String
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(userId: ID!, userInput: UserInput): User
  }
`;

export const resolvers = {
  Query: {
    users: async () => {
      return await db.users.findAll();
    },
    user: async (obj, args, context, info) => db.users.findByPk(args.id),
  },
  Mutation: {
    createUser: async (obj, args, context, info) => {
      console.log(args);
      return db.users.create({ ...args });
    },
    updateUser: async (obj, args, context, info) => {
      const user = await db.users.findByPk(args.userId);
      console.log(user);
      if (!user) throw new Error(`Couldn’t find user with id ${args.userId}`);
      await user.set({ ...args.userInput });
      return user.save();
    },
  },
};
