const db = require("../db_connection");

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

exports.getEmployeeCount = (req, res) => {

    let sql = "SELECT COUNT(*) AS EmpCount FROM employees"

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

exports.editByID = (req, res) => {

    const id = req.query.id
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const gender = req.query.gender

    let sql = "UPDATE employees SET first_name = ?, last_name = ?, gender = ?  WHERE emp_no = ?"

    db.query
        (
            sql,
            [first_name, last_name, gender, id],
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


exports.getByDepartment = (req, res) => {

    const dept = req.query.dept
    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name FROM employees \
    JOIN current_dept_emp ON current_dept_emp.emp_no = employees.emp_no \
    WHERE dept_no = ? ORDER BY EMP_NO DESC LIMIT ? OFFSET ?"

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

exports.getDepartmentsManagers = (req, res) => {

    let sql = "SELECT departments.dept_no, departments.dept_name, employees.first_name, employees.last_name, employees.emp_no \
    FROM departments \
    JOIN dept_manager ON dept_manager.dept_no = departments.dept_no \
    JOIN employees ON employees.emp_no = dept_manager.emp_no \
    WHERE dept_manager.to_date = '9999-01-01'"

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No departments found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getDepartments = (req, res) => {

    let sql = "SELECT * FROM departments"
    
    db.query(sql, (err ,results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No departments found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}
