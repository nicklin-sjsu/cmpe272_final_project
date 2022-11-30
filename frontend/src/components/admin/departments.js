import React, { Fragment } from "react";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import Item from "../admin_menu/item"
import { PlusCircle, XCircle } from 'react-bootstrap-icons';

class Departments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { departments: [] };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        fetch(api + "/api/user/getDepartments")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then(data => {
                fetch(api + "/api/user/getDepartmentsManagers")
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            alert(response.statusText);
                        }
                    })
                    .then(data2 => {
                        var managers = {}
                        data2.results.forEach(manager => {
                            if (manager.title === "Manager") {
                                managers[manager.dept_no] = manager.emp_no;
                            }
                        })
                        this.setState({ departments: data.results, managers: managers, managers_original: managers });
                    });
            });
    }

    handleAddFields() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/addDepartment?";
        var department = { id: Math.floor(Math.random() * 100), dept_name: "Default Name" };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then((data) => {
                const values = [...this.state.departments];
                department.dept_no = department.id;
                values.push(department);
                this.setState({ departments: values });
            });
    };

    handleRemoveFields(index) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/deleteDepartment?";
        var department = { id: this.state.departments[index].dept_no };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then((data) => {
                const values = [...this.state.departments];
                values.splice(index, 1);
                this.setState({ departments: values });
            });
    };

    handleInputChange(index, value) {
        const values = [...this.state.departments];
        values[index].dept_name = value;
        this.setState({ departments: values });
    };

    handleManagerChange(index, value) {
        const dept_no = this.state.departments[index].dept_no;
        const values = { ...this.state.managers };
        values[dept_no] = value;
        this.setState({ managers: values });
    };

    handleSave(index) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/editDepartment?";
        const dept_no = this.state.departments[index].dept_no;
        const dept_name = this.state.departments[index].dept_name;
        var department = { dept_no: dept_no, dept_name: dept_name };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })

        if (this.state.managers_original[dept_no] !== this.state.managers[dept_no] && !(!this.state.managers_original[dept_no] && this.state.managers[dept_no] === "")) {
            var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
            var api_name = "/api/admin/editDeptManager?";
            fetch(api + api_name + new URLSearchParams({
                id: this.state.managers[dept_no],
                dept_no: dept_no,
            }))
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        alert(response.statusText);
                    }
                })
        }
    }

    render() {
        return (
            <>
                <h1>Departments</h1>
                <Row className="mb-2">
                    {this.state.departments && this.state.departments.length ? this.state.departments.map((item, index) => (
                        <Fragment key={`${item}~${index}`}>
                            <Col xs="12" lg="4">
                                <Card className="mb-2 p-3 items-body">
                                    <Card.Title>{this.state.departments.name}</Card.Title>
                                    <Form.Label htmlFor="option">
                                        Department {index + 1} <a href="#"><XCircle color="red" size="20" onClick={() => this.handleRemoveFields(index)} /></a>
                                    </Form.Label>
                                    <Row>
                                        <Col lg="9">
                                            <Form.Control
                                                type="text"
                                                id={item.dept_no}
                                                value={item.dept_name}
                                                onChange={e => this.handleInputChange(index, e.target.value)}
                                            /><br/>
                                            <Form.Label>Manager id</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={this.state.managers[item.dept_no]}
                                                onChange={e => this.handleManagerChange(index, e.target.value)}
                                            />
                                        </Col>
                                        <Col className="d-flex align-items-center">
                                            <Button variant="primary" onClick={() => this.handleSave(index)} >Save</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Fragment>
                    ))
                        : <></>
                    }
                </Row>
                <Button variant="primary" className="mb-2" onClick={() => this.handleAddFields()} >Add Department</Button><br />
            </>
        )
    }
}

export default Departments;
