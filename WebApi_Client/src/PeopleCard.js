//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

export class PeopleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let {
      title,
      peopleId,
      name,
      gender,
      culture,
      born,
      aliases,
      people_image
    } = this.props.people;
    return (
      <div>
        <Card style={{ marginBottom: '10px' }}>
          <CardImg top width="100%" src={people_image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText body className="text-center">
              {aliases}
            </CardText>

            <div>
              <Button outline color="primary" onClick={this.toggle}>
                {this.props.buttonLabel}
                Details
              </Button>{' '}
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>{name}</ModalHeader>
                <ListGroup>
                  <CardImg
                    top
                    width="100%"
                    height="220px"
                    src={people_image}
                    alt="Card image cap"
                  />
                  <ListGroupItem color="info">
                    <b color="black">Gender</b>: {gender}
                  </ListGroupItem>
                  <ListGroupItem color="info">
                    <b>Culture</b>: {culture}
                  </ListGroupItem>
                  <ListGroupItem color="info">
                    <b>Born</b>: {born}
                  </ListGroupItem>

                  <ListGroupItem>
                    <b>Description</b>
                  </ListGroupItem>

                  <ListGroupItem>{aliases}</ListGroupItem>
                </ListGroup>
              </Modal>
              <Button
                color="primary"
                onClick={() => this.props.removePeople(peopleId)}
              >
                Delete
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default PeopleCard;
