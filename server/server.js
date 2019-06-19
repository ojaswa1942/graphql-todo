const { ApolloServer } = require('apollo-server');
const MongoClient = require('mongodb').MongoClient;
const serviceAccounts = require('./assets/serviceAccounts.json');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const provideContext = require('./context')

MongoClient.connect(serviceAccounts.host, {
	auth: {
		user: serviceAccounts.username,
		password: serviceAccounts.password
	},
	useNewUrlParser: true
})
.then((client) => {
	const db = client.db(serviceAccounts.database);
	const server = new ApolloServer({ 
		typeDefs, 
		resolvers,
		context: (req) => provideContext(req, db)
	});

	const url = "http://localhost:5000";

	server.listen().then(({url}) => {
  		console.log(`Server ready at ${url}`);
	});
})
.catch(err => {
	console.log('I caught something', err);
})

	