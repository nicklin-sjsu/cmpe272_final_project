/*
api/admin/getAllEmployees - gets all employees 

api/admin/getByID 
api/admin/editByID
api/admin/deleteByID
api/admin/editSalary
api/admin/editTitle
*/
const db = require("../db_connection");

exports.getAllEmployees = (req, res) => {

    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name FROM employees \
    JOIN current_dept_emp ON current_dept_emp.emp_no = employees.emp_no \
    ORDER BY EMP_NO DESC LIMIT ? OFFSET ?"

    db.query(sql, [dept, count, offset], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
}

exports.getByID = (req, res) => {

    const id = req.query.id
    let sql = "SELECT employees.*, titles.title, salary FROM salaries \
    JOIN employees ON salaries.emp_no = employees.emp_no \
    JOIN titles ON titles.emp_no = employees.emp_no \
    WHERE salaries.emp_no = ? ORDER BY salaries.to_date DESC, titles.to_date DESC LIMIT 1"

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
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

exports.editByID = (req, res) => {

    const id = req.query.id
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const gender = req.query.gender
    const birth_date = req.query.birth_date
    const hire_date = req.query.hire_date

    let sql = "UPDATE employees SET first_name = ?, last_name = ?, gender = ?, birth_date = ?,  hire_date = ? WHERE emp_no = ?"

    db.query
        (
            sql,
            [first_name, last_name, gender, birth_date, hire_date, id],
            (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found"
                    })
                }
                return res.status(200).send({
                    status: "success",
                    results: results
                })
            }
        )
}

exports.deleteByID = (req, res) => {

    const id = req.query.id

    let sql = "DELETE FROM employees WHERE emp_no = ?"

    db.query
        (
            sql,
            [id],
            (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found"
                    })
                }
                return res.status(200).send({
                    status: "success",
                    results: results
                })
            }
        )
}

exports.editSalary = (req, res) => {

    const id = req.query.id
    const salary = req.query.salary

    let sql = "UPDATE salaries SET salary = ? WHERE emp_no = ?"

    db.query
        (
            sql,
            [salary, id],
            (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found"
                    })
                }
                return res.status(200).send({
                    status: "success",
                    results: results
                })
            }
        )
}

exports.editTitle = (req, res) => {
    
    const id = req.query.id
    const title = req.query.title

    let sql = "UPDATE titles SET title = ? WHERE emp_no = ?"

    db.query
        (
            sql,
            [title, id],
            (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found"
                    })
                }
                return res.status(200).send({
                    status: "success",
                    results: results
                })
            }
        )
}