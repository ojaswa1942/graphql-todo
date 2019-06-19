const handleLogin = (_, {email, password}, {db}) => {
	console.log(email, password);
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
		return {
			success: true,
			token: 'boo'
		}
		// return res;
	})
}

module.exports = handleLogin;
