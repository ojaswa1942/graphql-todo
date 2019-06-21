const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server');

const toggleCompletion = (_, {todoId}, {db, id, email, isAuthenticated}) => {

	if(isAuthenticated){
		return db.collection('todos').updateOne(
			{email},
		   	{ $bit: { "todos.$[elem].isCompleted": { xor: parseInt(1) } } },
			{ arrayFilters: [ { "elem.id": todoId } ] }
		).then(res => {
			if(res.result.ok){
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

module.exports = toggleCompletion;
