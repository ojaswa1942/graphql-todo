const { gql } = require('apollo-server');
const typeDefs = gql`
	type Query {
	  todos: [Todo]!
	  allTodos: [Todo]!
	  me: User
	}

	type Todo {
	  id: ID!
	  title: String
	  date: String
	  isCompleted: Boolean!
	  by: User
	}

	type User {
		id: ID!
		name: Name
		email: String
		password: String
		todos: [Todo]!
	}

	type Name {
		first: String
		last: String
	}

	type Mutation {
		addTodo(title: String): EditMutationResponse
		
		deleteTodo(todoId: ID!): EditMutationResponse

		toggleCompletion(todoId: ID!): EditMutationResponse

		login(email: String!, password: String!): String!
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
	}
`;


module.exports = typeDefs;