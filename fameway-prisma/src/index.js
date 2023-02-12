import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51KJFWxHJnxebaUHZYbEiNsZIzooHhBd1YFFJ6szXBK8rli2svGpskisJTMx6miB17J2bVP6D7kFICX2hOScmLf8600YjnWPKMR"
);

const prisma = new PrismaClient();

const typeDefs = `
  type User {
    email: String!
    username: String
  }

  type Item {
    id: ID
    name: String
    description: String
    image: String
    price: Int
    quantity: Int
  }

  type Cart {
    id: ID
    ownerID: String
    item: [Item]
  }

  input CheckoutSessionInput {
    cartId: ID!
  }

  type CheckoutSession {
    id: ID!
    url: String!
  }

  type Query {
    hello: String
  }
  
  type Mutation {
    createCheckoutSession(input: CheckoutSessionInput!): CheckoutSession!
  }
  `;

const resolvers = {
  Query: {
    hello() {
      return "Hello world!";
    },
  },
  Mutation: {
    createCheckoutSession: async (_, { input }) => {
      const { cartId } = input;

      const cart = await prisma.cart.findUnique({
        where: { id: cartId },
      });

      if (!cart) {
        // throw new GraphQLError("Invalid cart");
        return;
      }
      console.log(cart);
      const cartItems = await prisma.cart
        .findUnique({
          where: { id: cartId },
        })
        .items();

      if (!cartItems || cartItems.length === 0) {
        // throw new GraphQLError("Cart is empty");
        return;
      }
      const line_items = cartItems.map((item) => {
        return {
          quantity: item.quantity,
          price_data: {
            currency: "eur",
            unit_amount: item.price,
            product_data: {
              name: item.name,
              description: item.description || undefined,
              images: item.image ? [item.image] : [],
            },
          },
        };
      });
      const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart?cancelled=true`,
        line_items,
        metadata: {
          cartId: cart.id,
        },
        mode: "payment",
      });
      return {
        id: session.id,
        url: session.url,
      };
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
