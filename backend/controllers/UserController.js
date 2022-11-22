const db = require("../db_connection");

exports.getByID = (req, res) => {

    const id = req.query.id
    let sql = "SELECT * FROM employees WHERE emp_no = ?"

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if(results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results                    
        })
    })

}

exports.getEmployeeCount = (req, res) => {

    let sql = "SELECT COUNT(*) FROM employees"

    db.query(sql, (err, results, fields) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        return res.status(200).send({
            status: "success",
            results: results,
            fields: fields
        })
    })

}