import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import EmployeeList from '../admin/employee_list';
import TablePopup from '../admin/table_popup';
import { connect } from 'react-redux';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

const count = 100;
const searchParams = new URLSearchParams(document.location.search);
var page = searchParams.get('page') || 1;
const col = searchParams.get('col') || "emp_no";
const order = searchParams.get('order') || "ASC";
const mode = searchParams.get('mode') || "default";
const name = searchParams.get('name') || "";
const dept_name = searchParams.get('dept_name') || "";
const title = searchParams.get('title') || "";
console.log(mode);

class AdminMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            col: col,
            order: order,
            mode: mode,
            name: name,
            dept_name: dept_name,
            title: title,
            employees: [],
        };
        this.getData();
        if (mode === "search") {
            this.handleSearch();
        } else {
            this.getList();
        }
    }
    getData() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        fetch(api + "/api/user/getDepartments")
            .then((response) => response.json())
            .then(data2 => {
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
    getList() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        fetch(api + "/api/admin/getEmployeesCurrentSorted?" + new URLSearchParams({
            col: this.state.col,
            order: this.state.order,
            count: count,
            offset: (page - 1) * count,
        }))
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    this.setState({ employees: data.results });
                } else {
                    alert(data.message);
                }
            });
    }
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleDeptChange(e) {
        this.setState({ dept_name: e.target.value });
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    async handleSort(col) {
        let order = "DESC";
        if (this.state.col !== col || this.state.order === "DESC") {
            order = "ASC"
        }
        await this.setState({ col: col, order: order });
        if (this.state.mode === "default") {
            this.getList();
        } else {
            this.handleSearch();
        }
    }

    handleSearch() {
        if (this.state.title !== "" && this.state.dept_name === "") {
            alert("Please select department when searching with title");
        } else {
            const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
            fetch(api + "/api/search/searchEverything?" + new URLSearchParams({
                name: this.state.name,
                title: this.state.title,
                dept_name: this.state.dept_name,
                title: this.state.title,
                col: this.state.col,
                order: this.state.order,
                count: count,
                offset: (page - 1) * count,
            }))
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "success") {
                        this.setState({ employees: data.results, mode: "search" });
                    } else {
                        alert(data.message);
                    }
                });
        }
    }

    render() {
        const searchParams = new URLSearchParams(document.location.search);
        const page = parseInt(searchParams.get('page') || 1);
        return (
            <>
                <Container>
                    <Row>
                        <Card className="mb-2">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={this.state.name} onChange={e => this.handleNameChange(e)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Department</Form.Label>
                                            <Form.Select value={this.state.dept_name} onChange={(e) => this.handleDeptChange(e)}>
                                                <option value=""></option>
                                                {this.state.departments && this.state.departments.length ? this.state.departments.map((department, index) => (
                                                    <Fragment key={`${department}~${index}`}>
                                                        <option value={department.dept_name}>{department.dept_name}</option>
                                                    </Fragment>
                                                ))
                                                    :
                                                    <></>
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Select value={this.state.title} onChange={(e) => this.handleTitleChange(e)}>
                                                <option value=""></option>
                                                {this.state.titles && this.state.titles.length ? this.state.titles.map((title, index) => (
                                                    <Fragment key={`${title}~${index}`}>
                                                        <option value={title.title}>{title.title}</option>
                                                    </Fragment>
                                                ))
                                                    :
                                                    <></>
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/*<Button variant="primary" onClick={e => this.handleSearch(e)} className="my-4">*/}
                                        {/*    Search*/}
                                        {/*</Button>*/}
                                        <a href={"/admin?" + new URLSearchParams({
                                            page: 1,
                                            name: this.state.name,
                                            title: this.state.title,
                                            dept_name: this.state.dept_name,
                                            title: this.state.title,
                                            mode: "search",
                                            col: this.state.col,
                                            order: this.state.order,
                                        })} className="my-4 btn btn-primary">
                                            Search
                                        </a>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className="mb-2 items-body">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        #
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("emp_no")}>
                                            {this.state.col === "emp_no" && this.state.order === "ASC"
                                                ?
                                                <CaretUpFill />
                                                :
                                                <CaretDownFill />
                                            }
                                        </a>
                                    </Col>
                                    <Col>
                                        First Name
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("first_name")}>
                                            {this.state.col === "first_name" && this.state.order === "ASC"
                                                ?
                                                <CaretUpFill />
                                                :
                                                <CaretDownFill />
                                            }
                                        </a>
                                    </Col>
                                    <Col>
                                        Last Name
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("last_name")}>
                                            {this.state.col === "last_name" && this.state.order === "ASC"
                                                ?
                                                <CaretUpFill />
                                                :
                                                <CaretDownFill />
                                            }
                                        </a>
                                    </Col>
                                    <Col>
                                        Department
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("dept_name")}>
                                            {this.state.col === "dept_name" && this.state.order === "ASC"
                                                ?
                                                <CaretUpFill />
                                                :
                                                <CaretDownFill />
                                            }
                                        </a>
                                    </Col>
                                    <Col>Title
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("title")}>
                                            {this.state.col === "title" && this.state.order === "ASC"
                                                ?
                                                <CaretUpFill />
                                                :
                                                <CaretDownFill />
                                            }
                                        </a>
                                    </Col>
                                    <Col>Action</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                    <EmployeeList employees={this.state.employees} />
                </Container>
                <div className="d-flex">
                    <span className="me-auto">
                        {page > 1 ?
                            <>
                                <a className="btn btn-primary me-1" href="/admin?page=1">{"<<First"}</a>
                                {page > 10 ?
                                    <a className="btn btn-primary me-1" href={"/admin?" + new URLSearchParams({
                                        page: page - 10,
                                        name: this.state.name,
                                        title: this.state.title,
                                        dept_name: this.state.dept_name,
                                        title: this.state.title,
                                        mode: this.state.mode,
                                        col: this.state.col,
                                        order: this.state.order,
                                    })}>{"<Prev 10"}</a>
                                    :
                                    <></>
                                }
                                <a className="btn btn-primary me-1" href={"/admin?" + new URLSearchParams({
                                    page: page - 1,
                                    name: this.state.name,
                                    title: this.state.title,
                                    dept_name: this.state.dept_name,
                                    title: this.state.title,
                                    mode: this.state.mode,
                                    col: this.state.col,
                                    order: this.state.order,
                                })}>{"<Prev"}</a>
                            </>
                            :
                            <></>
                        }

                    </span>
                    <span>
                        <a className="btn btn-primary me-1" href={"/admin?" + new URLSearchParams({
                            page: page + 1,
                            name: this.state.name,
                            title: this.state.title,
                            dept_name: this.state.dept_name,
                            title: this.state.title,
                            mode: this.state.mode,
                            col: this.state.col,
                            order: this.state.order,
                        })}>{"Next>"}</a>
                        <a className="btn btn-primary me-1" href={"/admin?" + new URLSearchParams({
                            page: page + 10,
                            name: this.state.name,
                            title: this.state.title,
                            dept_name: this.state.dept_name,
                            title: this.state.title,
                            mode: this.state.mode,
                            col: this.state.col,
                            order: this.state.order,
                        })}>{"Next 10>>"}</a>
                    </span>
                </div>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(AdminMain);
