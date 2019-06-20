const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const secret = require('../../assets/serviceAccounts.json').JWTSecret;
const bcrypt = require('bcrypt');

const handleLogin = (_, {email, password}, {db}) => {
	if(!email || !password)
		return{
			success: false,
			message: 'Incorrect Form Submission'
		};

	return db.collection('todos').find({email}).toArray()
	.then(user => {
		if(user.length){
			return bcrypt.compare( password, user[0].password )
			.then(match => {
				if(match){
					const payload = {
						email,
						id: user[0]._id
					};
			        const token = jwt.sign(payload, secret, {
			        	expiresIn: '30d'
			        });
			        console.log(token);
					return {
						success: true,
						token,
						user: {
							email
						}
					}
				}
				else throw new AuthenticationError('Incorrect Credentials')
			})
		}
		else{
			throw new AuthenticationError('No such user')
			// return{
			// 	success: false,
			// 	message: 'No such user'
			// }
		}
	})
}

module.exports = handleLogin;
