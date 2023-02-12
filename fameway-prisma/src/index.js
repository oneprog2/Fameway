import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
const stripe = require("stripe")(
  "sk_test_51KJFWxHJnxebaUHZYbEiNsZIzooHhBd1YFFJ6szXBK8rli2svGpskisJTMx6miB17J2bVP6D7kFICX2hOScmLf8600YjnWPKMR"
);
const prisma = new PrismaClient();

const typeDefs = `
  type User {
    email: String!
    username: String
  }

  type Query {
    allUsers: [User!]!
    createCheckoutSession: String 
  }
`;

const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    createQuerySession: async (parent, args, context, info) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "apple_pay", "google_pay"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              unit_amount: 20,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      return JSON.stringify({
        url: session.url,
      });
    },
  },
  Mutation: {
    insertUserAndCreateStore: (parent, args, context, info) => {
      const { id, email, username } = args;
      return prisma.user.create({
        data: {
          id: id,
          email: email,
          username: username,
          store: {
            create: {
              id: id,
              name: username,
            },
          },
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
