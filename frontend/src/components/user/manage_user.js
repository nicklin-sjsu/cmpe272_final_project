import React, { Component, Fragment } from 'react';
import { Card, Form, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isEmpty } from '../utils';

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            first_name: "",
            last_name: "",
            gender: 'M',
            dept: "Development",
            title: "Senior Engineer",
            salary: 0,
            result: {},
            loading: true,
        }
    }
    componentDidMount() {
        if (this.props.mode === "edit") {
            this.getDetails();
        }
        this.getData();
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
                                this.setState({ departments: data2.results, titles: data3.results, loading: false });
                            } else {
                                alert(data3.message);
                            }
                        });
                } else {
                    alert(data2.message);
                }
            });
    }
    getDetails() {
        if (this.props.user.level === "admin") {
            const searchParams = new URLSearchParams(document.location.search);
            const emp_no = searchParams.get('emp_no');
            var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
            if (emp_no !== null) {
                fetch(api + "/api/admin/getByID?" + new URLSearchParams({
                    id: emp_no,
                }))
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === "success") {
                            this.setState({
                                result: data.results,
                                id: data.results.userData.emp_no,
                                first_name: data.results.userData.first_name,
                                last_name: data.results.userData.last_name,
                                gender: data.results.userData.gender,
                                birth_date: data.results.userData.birth_date.split('T')[0],
                                hire_date: data.results.userData.hire_date.split('T')[0],
                                dept_no: data.results.deptData[0].dept_no,
                                title: data.results.titleData[0].title,
                                salary: data.results.salaryData[0].salary,
                            });
                        } else {
                            alert(data.status);
                        }
                    });
            }
        }
    }
    handleFirstNameChange(e) {
        this.setState({ first_name: e.target.value });
    }
    handleLastNameChange(e) {
        this.setState({ last_name: e.target.value });
    }
    handleGenderChange(e) {
        this.setState({ gender: e.target.value });
    }
    handleBirthDateChange(e) {
        this.setState({ birth_date: e.target.value });
    }
    handleHireDateChange(e) {
        this.setState({ hire_date: e.target.value });
    }
    handleDeptChange(e) {
        this.setState({ dept_no: e.target.value });
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    handleSalaryChange(e) {
        this.setState({ salary: e.target.value });
    }
    handleManage() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        var api_path = "/api/admin/editById?";
        var user = {
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            gender: this.state.gender,
            birth_date: this.state.birth_date,
            hire_date: this.state.hire_date,
        };
        if (this.props.operation === "edit") {
            api_path = "/api/admin/editById?";
        }
        fetch(api + api_path + new URLSearchParams(user))
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    window.location.pathname = window.location.pathname.replace('edituser', 'user');
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
        if (this.state.loading) {
            return (<></>);
        }
        return (
            <Container>
                <h3>Manage Employee Details</h3>
                <Card>
                    {/*<Card.Img variant="top" src="https://randomuser.me/api/portraits/men/52.jpg" />*/}
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={this.state.first_name} onChange={e => this.handleFirstNameChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={this.state.last_name} onChange={e => this.handleLastNameChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={this.state.gender} onChange={(e) => this.handleGenderChange(e)}>
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="date" value={this.state.birth_date} onChange={e => this.handleBirthDateChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hire Date</Form.Label>
                            <Form.Control type="date" value={this.state.hire_date} onChange={e => this.handleHireDateChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select value={this.state.dept_no} onChange={(e) => this.handleDeptChange(e)}>
                                {this.state.departments && this.state.departments.length ? this.state.departments.map((department, index) => (
                                    <Fragment key={`${department}~${index}`}>
                                        <option value={department.dept_no}>{department.dept_name}</option>
                                    </Fragment>
                                ))
                                    :
                                    <></>
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Select value={this.state.title} onChange={(e) => this.handleTitleChange(e)}>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" value={this.state.salary} onChange={e => this.handleSalaryChange(e)} />
                        </Form.Group>
                        <Button variant="primary" onClick={e=> this.handleManage() }>Save</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(ManageUser);
