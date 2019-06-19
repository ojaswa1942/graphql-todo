const me = (_, __, context) => {
	const db = context.db;
	
	return db.collection('todos').find().toArray()
	.then(res => {
		return 'Helllooo';
	})
}

module.exports = me;
