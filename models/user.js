const e = require('express');
const { query } = require('./db');

async function getUserByEmail(email) {
    console.log('getUserByEmail', email)
    let sql = 'SELECT * FROM users WHERE email = ? ';
    let values = [email];
    try {
        let result = await query(sql, values);
        console.log('result', result)
        return { user: result[0] };
    } catch (error) {
        return { error: error };
    }
}

async function addUser(user) {
    try {
        console.log('addUser', user)
        let sql = 'INSERT INTO users SET ? ';
        let values = [user];
        let result = await query(sql, values);
        if (!result.insertId) {
            return { error: 'add user failed' };
        } else {
            user.id = result.insertId;
            return { user: user };
        }
    } catch (error) {
        return { error: error };
    }
}

async function login(email, password) {

    console.log('login', email, password)
    try {
        let { error, user } = await getUserByEmail(email);
        if (error) {
            return { error: error };
        }
        if (!user) {
            return { error: 'user not exist' };
        }
        if (user.password !== password) {
            return { error: 'password error' };
        }
        return { user: user };
    } catch (error) {
        return { error: error };
    }
}


async function register(user) {
    console.log('register', user)
    try {
        let getUser = await getUserByEmail(user.email);
        if (getUser.error) {
            return { error: getUser.error };
        }
        if (getUser.user) {
            return { error: 'user exist' };
        }
        let result = await addUser(user);
        if (result.error) {
            return { error: result.error };
        }
        return { user: result.user };
    } catch (error) {
        return { error: error };
    }
}
//  {"username":"test", "email":"lisi@qq.com","password":"123456"}

module.exports = {
    login, register
};