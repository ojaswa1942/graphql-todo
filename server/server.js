const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });

const url = "http://localhost:3000"
server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});