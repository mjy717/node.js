const mysql = require('mysql2/promise');
// 创建连接池
const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin7',
    database: 'blog',
    connectionLimit: 10 // 连接池中连接的数量
});

async function query(sql, values) {
    try {
        const [rows, fields] = await pool.query(sql, values);
        return rows;
    } catch (error) {
        return console.error(error);
    }
}

module.exports = {
    query
};