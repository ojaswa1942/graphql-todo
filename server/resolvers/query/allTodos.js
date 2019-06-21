const allTodos = (parent, __, {db}) => {
	return db.collection('todos').aggregate([
		{
			"$unwind": "$todos"
		}
	])
	.project({
		_id: 0,
		id: "$todos._id",
		title: "$todos.title",
		date: "$todos.date",
		isCompleted: "$todos.isCompleted",
		user: {
			id: "$_id",
			email: "$email",
			name: "$name"
		}
	})
	.toArray()
	.then(res => {
		return res;
	})
}

module.exports = allTodos;
