const me = require('./resolvers/query/me');
const allTodos = require('./resolvers/query/allTodos');
const handleLogin = require('./resolvers/mutations/login');
const addTodo = require('./resolvers/mutations/addTodo');
const toggleCompletion = require('./resolvers/mutations/toggleCompletion');
const deleteTodo = require('./resolvers/mutations/deleteTodo');
const handleRegister = require('./resolvers/mutations/register');

const resolvers = {
	Query: {
		me,
		allTodos,
		hello: () => 'World'
	},
	Mutation: {
		login: handleLogin,
		signup: handleRegister,
		addTodo,
		deleteTodo,
		toggleCompletion
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
				if(res.length){
					return res[0].todos
				}
			})
		}
	},
	Todo: {
		user: ({user}, __, {email, id}) => {
			if(email && id)
				return {
					email,
					id
				}
			else if(user.email && user.id)
				return {
					email: user.email,
					id: user.id
				}

		},
		isCompleted: ({isCompleted}) => {
			if(isCompleted)
				return true;
			else return false;
		}
	}
}

module.exports = resolvers;
