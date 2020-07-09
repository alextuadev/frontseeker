import React, { Component } from 'react';
import axios from 'axios';
import ListResult from './ListResult';
import { Row, Col, Spinner, Button, Input } from 'reactstrap';


class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      results: [],
      loading: false
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  makeSearch = () => {
    this.setState({ loading: true })
    let url = `http://localhost:8000/api/search?term=${this.state.search}`
    axios.get(url, {}, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({ results: res.data.data, loading: false })
        console.log(this.state.results)
      })
      .catch((err, code) => {
        console.log(err.code);
      });
  };


  render() {
    return (
      <div>
        <Row>
          <Col className="d-flex justify-content-center mb-3" >
            <Input type="text" className="searchInput" name="search" placeholder="Type your search" onChange={this.handleInput} />
            <Button outline color="primary" onClick={this.makeSearch}>Search</Button>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            {this.state.loading ?
              <div>
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="secondary" />
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="danger" />
              </div>
              :
              <div>
                {this.state.results.length > 0 &&
                  <ListResult
                    results={this.state.results} />
                }
              </div>
            }
          </Col>
        </Row>
      </div>
    );

  }

}

export default SearchBar;