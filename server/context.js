const provideContext = (request, database) => {
	const req = request.req;
	return({
		db: database
	})
}

module.exports = provideContext