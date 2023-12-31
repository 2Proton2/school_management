const knex = require('knex')(require('../db/knexfile'));
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

exports.authenticate = async (req, res, next) => {
    try {
        console.log('User Entered Details => ', req.body);
        const { email, password } = req.body;

        const isEmailValid = await knex('users').where('email', email);
        
        if(!isEmailValid.length){
            throw new Error("Invalid Credentials")
        }

        let passwordMatch = await bcrypt.compare(password, isEmailValid[0].password);

        if(!passwordMatch){
            throw new Error("Invalid Credentials")
        }

        const apiKey = await knex('user_api').where('user_id', isEmailValid[0].id);
        if(!apiKey){
            throw new Error("Access Denied")
        }

        if(apiKey.expires_at < Date.now()){
            throw new Error("Invalid Credentials");
        }

        const newtoken = uuid.v4();
        const curTime = new Date();
        const newExpireTime = curTime.setDate(curTime.getDate() + 7);
        const updatedRow = await knex('user_api').where('user_id', isEmailValid[0].id).update({'token': newtoken, expires_at: curTime, updated_at: (new Date()).toISOString()});
        req.token = newtoken
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.isAuthorizedUser = async (req, res, next) => {
    try {
        let tokenToValid = req.headers.authorization;

        let result = await knex('user_api').where('token', tokenToValid);

        if(!result.length){
            throw new Error("Access Denied");
        }

        if(result.expires_at < (new Date()).toISOString){
            throw new Error("Access Denied");
        }

        next();  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
