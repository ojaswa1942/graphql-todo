const me = require('./resolvers/query/me');
const allTodos = require('./resolvers/query/allTodos');
const handleLogin = require('./resolvers/mutations/login');
const handleRegister = require('./resolvers/mutations/register');

const resolvers = {
	Query: {
		me,
		allTodos,
		hello: () => 'World'
	},
	Mutation: {
		login: handleLogin,
		signup: handleRegister
	},
	User: {
		name: ({email}, _, { db }) => {
			return db.collection('todos').find({email})
			.project({ _id: 0, name: 1 })
			.toArray()
			.then(res => {
				if(res.length)
					return res[0].name
			})
		},
		todos: ({email}, __, {db}) => {
			return db.collection('todos').find({email})
			.project({ _id: 0, todos: 1 })
			.toArray()
			.then(res => {
				if(res.length)
					return res[0].todos
			})
		}
	},
	Todo: {
		user: (_, __, {email, id}) => {
			return {
				email,
				id
			}
		}
	}
}

module.exports = resolvers;
