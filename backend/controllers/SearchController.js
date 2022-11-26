const db = require("../db_connection");

exports.searchName = (req, res) => {
    const name = req.query.name;
    let words = name.split(" ");
    if (words.length === 0) {
        return res.status(400).send({
            status: "error",
            message: "Please enter a name"
        })
    }
    let sql = `SELECT * FROM employees WHERE `;
    for (let i = 0; i < words.length; i++) {
        if (i === words.length - 1) {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%'`
        } else {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%' OR `
        }
    }
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(401).send({
                status: "error",
                message: "No results found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
};