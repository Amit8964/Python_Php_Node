const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected ');
});

class User {
    //user methods-------->
static createUser(userData, callback) {
        const query = 'INSERT INTO user (name, phone, email, password) VALUES (?, ?, ?, ?)';

        db.query(query, [userData.name, userData.phone, userData.email, userData.password], (err, result) => {
            
            if (err) return callback(err);
            console.log("i am working 1 ")
            callback(null, result);
            console.log("i am working 2")
        });
    }

    static findUserByEmail(email, callback) {
        const query = 'SELECT * FROM user WHERE email = ?';
        db.query(query, [email], (err, result) => {
            if (err) return callback(err);
            if (result.length === 0) {
                callback(null, null);
            } else {
                callback(null, result[0]);
            }
        });
    }


//admin methods---------------->

static createAdmin(userData, callback) {
    const query = 'INSERT INTO admin (email, password) VALUES (?, ?)';

    db.query(query, [userData.email, userData.password], (err, result) => {

        
        if (err) return callback(err);
        
        callback(null, result);
        
    });
}



static findAdminByEmail(email, callback) {
    const query = 'SELECT * FROM admin WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) {
            callback(null, null);
        } else {
            callback(null, result[0]);
        }
    });
}







}

module.exports = User;
