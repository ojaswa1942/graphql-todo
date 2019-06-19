const allTodos = (_, __, context) => {
	const db = context.db;
	
	return db.collection('todos').aggregate([
		{
			"$unwind": "$todos"
		}
	])
	.project({
		title: "$todos.title",
		date: "$todos.date",
		isCompleted: "$todos.isCompleted",
		by: {
			name: "$name",
			email: "$email"
		}
	})
	.toArray()
	.then(res => {
		return res;
	})
}

module.exports = allTodos;
