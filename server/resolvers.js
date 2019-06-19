const me = require('./resolvers/query/me');
const allTodos = require('./resolvers/query/allTodos');
const handleLogin = require('./resolvers/mutations/login');

const resolvers = {
	Query: {
		me: me,
		allTodos: allTodos
	},
	Mutation: {
		login: handleLogin
	}
}

module.exports = resolvers;
