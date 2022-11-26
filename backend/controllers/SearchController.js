const db = require("../db_connection");
const levenshtein = require('fast-levenshtein');

exports.searchName = (req, res) => {
    const name = req.query.name;
    let words = name.split(" ");
    if (words.length === 0) {
        return res.status(400).send({
            status: "error",
            message: "Please enter a name"
        })
    }

    let sql = `SELECT employees.emp_no, CONCAT(first_name, ' ', last_name) AS Name, titles.title, departments.dept_name FROM employees \
    JOIN titles ON titles.emp_no = employees.emp_no \
    JOIN dept_emp ON dept_emp.emp_no = employees.emp_no \
    JOIN departments ON departments.dept_no = dept_emp.dept_no \
    WHERE `;

    for (let i = 0; i < words.length; i++) {
        if (i === words.length - 1) {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%'`
        } else {
            sql += `first_name LIKE '%${words[i]}%' OR last_name LIKE '%${words[i]}%' OR `
        }
    }

    sql += " GROUP BY employees.emp_no LIMIT 10000" // LIMIT 10000 to prevent server from crashing
   
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

        let message = "success";
        if (results.length === 10000) {
            message = "Returned more than 10,000 results. Please refine your search for more accurate results."
        }

        //use levenshtein distance to find closest match to original search
        let searchResults = results
            .map((result) => {
                return {
                    ...result,
                    distance: levenshtein.get(name, result.Name)
                }
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 100); // only return top 100 results

        return res.status(200).send({
            status: message,
            results: searchResults
        })
    }
    )
};