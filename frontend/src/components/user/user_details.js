import React, { Component } from 'react';
import { Card, Form, Col, Button, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';

const searchParams = new URLSearchParams(document.location.search);
const emp_no = searchParams.get('emp_no');

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "emp_no": 10001,
                "birth_date": "1953-09-02T07:00:00.000Z",
                "first_name": "Georgi",
                "last_name": "Facello",
                "gender": "M",
                "hire_date": "1986-06-26T07:00:00.000Z",
                "salary": 88958,
                "title": "Senior Engineer"
            },
            result: {},
            loading: true,
        }
    }
    componentDidMount() {
        this.getDetails();
    }

    getDetails() {
        if (this.props.user.level === "admin") {
            var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
            if (emp_no !== null) {
                fetch(api + "/api/admin/getByID?" + new URLSearchParams({
                    id: emp_no,
                }))
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === "success") {
                            this.setState({ result: data.results, loading: false });
                        } else {
                            alert(data.status);
                        }
                    });
            }
        }
    }
    render() {
        if (this.state.loading) {
            return (<></>);
        }
        var user = this.state.user;
        if (this.props.user.level === "admin") {
            user = this.state.result.userData;
            user.salary = this.state.result.salaryData[0].salary;
        }
        return (
            <Container>
                <h3>Employee Details</h3>
                <Card>
                    {/*<Card.Img variant="top" src="https://randomuser.me/api/portraits/men/52.jpg" />*/}
                    <Card.Body>
                        <Card.Title> <span className='text-primary'>
                            {user.first_name} {user.last_name}
                        </span> </Card.Title>
                        <Card.Subtitle>{user.title}</Card.Subtitle>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Employee Id</div>
                                {user.emp_no}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Gender</div>
                                {user.gender}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Hire Date</div>
                                {user.hire_date}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Salary</div>
                                <span className='text-success'>$ {user.salary}</span>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <a className="btn btn-primary" href={"/edituser?emp_no=" + emp_no }>Edit Details</a>
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

export default connect(mapStateToProps)(UserDetails);
