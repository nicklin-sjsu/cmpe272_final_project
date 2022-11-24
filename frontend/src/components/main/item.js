import React from "react";
import { Image, Button, Card, Row, Col } from "react-bootstrap";
import Popup from "../main/popup"
import { VolumeDownFill } from 'react-bootstrap-icons';

const imgDivStyle = {
    width: '100%',
};
const imgStyle = {
    objectFit: 'contain',
    aspectRatio: 1.2,
    m: 'auto',
};

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            modalShow: false,
        };
    }

    popup(item) {
        this.setState({ item: item, modalShow: true });
    }
    onPlaySound(id) {
        var audio = document.getElementById("audio_" + id);
        audio.play();
    }

    render() {
        return (
            <Card className="m-3 p-2">
                <Popup
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    item={this.state.data}
                />
                <div style={imgDivStyle}>
                    <Image className="card-img-top img-fluid" src={this.state.data.image} alt="Card image cap" style={imgStyle} />
                </div>
                <Card.Body>
                    <Card.Title as="h5">{this.state.data.name}
                        <a onClick={() => this.onPlaySound(this.state.data.id)}><VolumeDownFill/></a>
                        <audio id={"audio_" + this.state.data.id} src={"https://dkmcc8ag33.execute-api.us-west-1.amazonaws.com/default/polly-project?voice=Matthew&text=" + this.state.data.name} />
                    </Card.Title>
                    <Card.Text>${this.state.data.price}</Card.Text>
                    <Card.Text>{this.state.data.description}</Card.Text>
                    <Button variant="primary" onClick={() => this.popup(this.state.data)}>
                        Add To Order
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Item;



