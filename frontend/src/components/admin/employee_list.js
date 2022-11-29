import React, { Fragment } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';

class employeeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
    }

    render() {
        const employees = this.props.employees;
        return (
            <>
                    {employees && employees.length ? employees.map((employee, index) => (
                        <Fragment key={`${employee}~${index}`}>
                            <Row>
                                <Card className="mb-1 items-body">
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                {employee.emp_no}
                                            </Col>
                                            <Col>
                                                {employee.first_name}
                                            </Col>
                                            <Col>
                                                {employee.last_name}
                                            </Col>
                                            <Col>
                                                {employee.dept_name}
                                            </Col>
                                            <Col>
                                                {employee.title}
                                            </Col>
                                            <Col>
                                                <a className="btn btn-primary" href={"/user?emp_no=" + employee.emp_no}>Details</a>
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </Row>
                        </Fragment>
                    ))
                        : <></>
                    }
                
                <br />
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

export default connect(mapStateToProps)(employeeItem);
