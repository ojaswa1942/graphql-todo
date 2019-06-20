const jwt = require('jsonwebtoken');
const secret = require('./assets/serviceAccounts.json').JWTSecret;

const provideContext = (request, database) => {
	const req = request.req;
	let email = null, 
		auth = req.headers.authorization || null, 
		isAuthenticated = false, 
		id = null;

	if(auth){
		const token = auth.substring(7, auth.length);
		jwt.verify(token, secret, function(err, decoded) {
	      if (err) {
	      	console.log('Error at JWT Verification')
	      } 
	      else {
	        email = decoded.email;
	        id = decoded.id;
	        isAuthenticated = true;
	      }
	    });
	}

	return {
		db: database,
		email,
		id,
		isAuthenticated
	};
}

module.exports = provideContext