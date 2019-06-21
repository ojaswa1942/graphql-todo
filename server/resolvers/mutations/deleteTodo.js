const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server');

const getRandomInt = (max) =>{
	return Math.floor(Math.random() * Math.floor(max));
}

const deleteTodo = (_, {todoId}, {db, id, email, isAuthenticated}) => {

	if(isAuthenticated){
		return db.collection('todos').updateOne(
			{email},
			{
				$pull: {
					todos: {
						id: todoId
					}
				}
			}
		).then(res => {
			if(res.result.nModified){
				return {
					success: true,
					user: {
						email,
						id
					}
				}
			}
			else if(res.result.ok && !res.result.nModified)
				return new ApolloError('No such todo');
			else return new ApolloError('Some problem occurred');
		})
	}
	else{
		return new ForbiddenError('Authentication Required');
	}
}

module.exports = deleteTodo;
