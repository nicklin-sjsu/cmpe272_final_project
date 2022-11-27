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
            //{
            //    this.state.modalShow ?
            //        <TablePopup
            //            show={this.state.modalShow}
            //            onHide={() => this.setState({ modalShow: false })}
            //            table={this.state.item}
            //            operation={this.state.operation}
            //            getTables={this.getTables}
            //        />
            //        :
            //        <></>
            //}
            //    <Card.Title>{table.name}</Card.Title>
            //            <p className="card-text">Capacity: {table.capacity}</p>
            //            <p className="card-text">Description: {table.description}</p>
            //            <p className="card-text">Table Status: {statusMap[table.status]}</p>
            //            <Form.Group>
            //                <Form.Label>Status</Form.Label>
            //                <Form.Select aria-label="Default select example" className="w-25" value={table.status} onChange={(e) => this.handleStatusChange(e)}>
            //                    <option value="In_Use">In Use</option>
            //                    <option value="Empty">Empty</option>
            //                </Form.Select>
            //            </Form.Group>
            //            <Form.Label>Customers</Form.Label>
            //            <Form.Control type="number" className="w-25" min="0" defaultValue={table.guest_n} />
            //                {
            //    this.state.orders && this.state.orders.length ? this.state.orders.map((order, index) => (
            //        <Fragment key={`${order}~${index}`}>
            //            <Row className="my-3">
            //                <Col>
            //                    <Order data={order} getTables={this.props.getTables} getOrders={this.getOrders} />
            //                </Col>
            //            </Row>
            //        </Fragment>
            //    )) : null
            //}
            //<div className="d-flex justify-content-end">
            //    <a href={qr} target="_blank" download><Button variant="info" className="m-2">QR Code</Button></a>
            //    <Button variant="secondary" className="m-2" onClick={() => this.props.handleAdd("update", table)}>Edit Table</Button>
            //    <Button variant="danger" className="m-2" onClick={() => this.handleStatusChange("Empty")}>Close Table</Button>
            //    <Button variant="primary" className="m-2" onClick={() => this.handleStatusChange("In_Use")}>Open Table</Button>
            //</div>
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
