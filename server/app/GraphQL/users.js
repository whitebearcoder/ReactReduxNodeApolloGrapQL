import { gql } from 'apollo-server-express'
import * as db from '../database'

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
    }
`

export const resolvers = {
    Query: {
        users: async () => {
            console.log('**************')
            return await db.users.findAll()
        },
        user: async (obj, args, context, info) => User.findByPk(args.id),
    },
    Mutation: {
        createUser: (obj, args, context, info) => {
            return User.create({ ...args })
        },
    },
}
