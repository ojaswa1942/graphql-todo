const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const secret = require('../../assets/serviceAccounts.json').JWTSecret;
const bcrypt = require('bcrypt');

const handleRegister = (_, {firstName, lastName, email, password}, {db}) => {
	if(!firstName || !lastName || !email || !password)
		return new UserInputError('Incorrect Form Submission');

	return db.collection('todos').find({email}).project({ _id: 1 }).toArray()
	.then(user => {
		if(!user.length){
			return bcrypt.hash(password, 10)
			.then(hash => {
				return db.collection('todos').insertOne({
					email,
					name: {
						first: firstName,
						last: lastName
					},
					password: hash,
					todos: []
				})
				.then(res => {
					if(res.result.ok){
						const payload = {
							email,
							id: res.ops[0]._id
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
					else throw new Error();
				})
			})
		}
		else{
			return new ForbiddenError('User already exists')
		}
	})
	.catch(err => {
		console.log(err);
		return new ApolloError('Something went wrong');
	})
}

module.exports = handleRegister;
