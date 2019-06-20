const allTodos = (parent, __, context) => {
	const db = context.db;
	console.log(parent);
	return db.collection('todos').aggregate([
		{
			"$unwind": "$todos"
		}
	])
	.project({
		title: "$todos.title",
		date: "$todos.date",
		isCompleted: "$todos.isCompleted",
		user: {
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
