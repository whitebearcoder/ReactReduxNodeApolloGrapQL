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
`;

export const resolvers = {
  Query: {
    users: async () => {
      return await db.users.findAll();
    },
    user: async (obj, args, context, info) => db.users.findByPk(args.id),
  },
};
