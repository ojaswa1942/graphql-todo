const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server');

const getRandomInt = (max) =>{
	return Math.floor(Math.random() * Math.floor(max));
}

const addTodo = (_, {title}, {db, id, email, isAuthenticated}) => {

	if(isAuthenticated){
		const newTodo = {
			id: `${id}-${getRandomInt(999999)}`,
			title,
			isCompleted: 0,
			date: new Date().getTime()
		};
		return db.collection('todos').updateOne(
			{email},
			{
				$push: {
					todos: newTodo
				}
			}
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
			else return new ApolloError('Some problem occurred');
		})
	}
	else{
		return new ForbiddenError('Authentication Required');
	}
}

module.exports = addTodo;
