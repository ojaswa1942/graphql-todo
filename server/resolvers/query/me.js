const { AuthenticationError } = require('apollo-server');

const me = (_, __, {db, email, isAuthenticated, id}) => {
	if(isAuthenticated){
		return {
			id,
			email
		};
	}
	else{
		throw new AuthenticationError('User Authentication required');
	}
}

module.exports = me;
