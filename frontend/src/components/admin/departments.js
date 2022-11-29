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
            .then((response) => response.json())
            .then(data2 => {
                console.log(data2);
                if (data2.status === "success") {
                    fetch(api + "/api/user/getTitles")
                        .then((response) => response.json())
                        .then(data3 => {
                            if (data3.status === "success") {
                                this.setState({ departments: data2.results, titles: data3.results });
                            } else {
                                alert(data3.message);
                            }
                        });
                } else {
                    alert(data2.message);
                }
            });
    }

    handleAddFields() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/getEmployeesCurrentSorted?";
        fetch(api + api_name + new URLSearchParams({
            name: this.state.name,
            title: this.state.title,
            dept_name: this.state.dept_name,
            title: this.state.title,
            col: this.state.col,
            order: this.state.order,
            count: count,
            offset: (page - 1) * count,
            current: current,
        }))
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    const values = [...this.state.departments];
                    values.push({ dept_name: "Default Name" });
                    this.setState({ departments: values });
                } else {
                    alert(data.message);
                }
            });
    };

    handleRemoveFields(index) {
        const values = [...this.state.departments];
        values.splice(index, 1);
        this.setState({ departments: values });
    };

    handleInputChange(index, value) {
        const values = [...this.state.departments];
        values[index].name = value;
        this.setState({ departments: values })
    };

    render() {
        return (
            <>
                <Row className="mb-2">
                    {this.state.departments && this.state.departments.length ? this.state.departments.map((item, index) => (
                        <Fragment key={`${item}~${index}`}>
                            <Col xs="12" lg="3">
                                <Card className="mb-2 p-3 items-body">
                                    <Card.Title>{this.state.departments.name}</Card.Title>
                                    <div>
                                        <Col>
                                            <Form.Label htmlFor="option">
                                                Department {index + 1} <a href="#"><XCircle color="red" size="20" onClick={() => this.handleRemoveFields(index)} /></a>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                id={item.dept_no}
                                                value={item.dept_name}
                                                onChange={e => this.handleInputChange(index, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Card>
                            </Col>
                        </Fragment>
                    ))
                        : <></>
                    }
                </Row>
                <Button variant="primary" className="mb-2" onClick={() => this.handleAddFields()} >Add Category</Button><br />
                <Button variant="primary" onClick={() => this.handleAddFields()} >Save Changes</Button>
            </>
        )
    }
}

export default Departments;
