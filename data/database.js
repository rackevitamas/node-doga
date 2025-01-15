import sqlite from "sqlite3";

const db = new sqlite.Database("./database.sqlite");
async function initialize() {
    await dbRun("DROP TABLE IF EXISTS product");
    await dbRun("CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, brand STRING, description STRING, price INTEGER)");
    await dbRun('INSERT INTO product (name, brand, description, price) VALUES ("Star Wars Milennium Falcon", "Lego", "LEGO - for aduts, recommended for ages 18 and up, LEGO® Star Wars series, release year 2024, pack of 921 building blocks", 23760)');
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        })
    })
}

function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

export {db, dbRun, dbAll, dbGet, initialize };