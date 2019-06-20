const { gql } = require('apollo-server');
const typeDefs = gql`
	type Query {
	  todos: [Todo]!
	  allTodos: [Todo!]
	  me: User
	  hello: String!
	}

	type Todo {
	  id: ID!
	  title: String
	  date: String
	  isCompleted: Boolean!
	  user: User
	}

	type User {
		id: ID!
		name: Name
		email: String
		todos: [Todo!]
	}

	type Name {
		first: String
		last: String
	}

	type Mutation {
		addTodo(title: String): EditMutationResponse
		
		deleteTodo(todoId: ID!): EditMutationResponse

		toggleCompletion(todoId: ID!): EditMutationResponse

		login(email: String!, password: String!):LoginResponse

		signup(firstName: String!, lastName: String!, email: String!, password: String!): LoginResponse

	}

	type EditMutationResponse {
		success: Boolean!
		message: String
		todos: [Todo]!
	}

	type LoginResponse {
		success: Boolean!
		message: String
		token: String
		user: User
	}
`;


module.exports = typeDefs;