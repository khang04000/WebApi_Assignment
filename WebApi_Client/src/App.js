// heroku
import React, { Component } from 'react';
import './App.css';
import PeopleCard from './PeopleCard';
import Carousal from './Carousal';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      alertSuccess: false,
      name: '',
      peopleId: '',
      peoples: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
    this.setState({ alertSuccess: false });
  }

  getAllPeoples = () => {
    axios
      .get('https://powerful-lake-10593.herokuapp.com/getallpeople')
      .then(result => {
        this.setState({ peoples: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllPeoples();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://powerful-lake-10593.herokuapp.com/addPeople?name=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        } else {
          this.setState({ alertSuccess: true });
          setTimeout(() => {
            this.setState({ alertSuccess: false });
          }, 2000);
        }
        this.getAllPeoples();
      })
      .catch(error => {
        // alert('Error: ', error);
        this.setState({ alertVisible: true });
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removePeople(peopleId) {
    this.setState({
      peoples: this.state.peoples.filter(people => {
        if (people.peopleId !== peopleId) return people;
      })
    });
    const query = `https://powerful-lake-10593.herokuapp.com/deletepeople?peopleId=${peopleId}`;
    axios
      .get(query)
      .then(result => {
        this.getAllPeoples();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let peopleCards = this.state.peoples.map(people => {
      return (
        <Col sm="3" key={people.peopleId}>
          <PeopleCard
            removePeople={this.removePeople.bind(this)}
            people={people}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <h1 style={{ padding: '20px' }}>Games Of Thrones</h1>
        <Container fluid>
          <Carousal id="jumboheader" />
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Character not found
              </Alert>

              <Alert
                color="success"
                isOpen={this.state.alertSuccess}
                toggle={this.onDismiss}
              >
                Character added
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit} inline>
                <FormGroup>
                  <Input
                    style={{ width: '1400px' }}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter character name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button style={{ marginLeft: '8px' }} color="primary">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{peopleCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
