import React, { Component } from 'react';
import axios from 'axios';
import ListResult from './ListResult';
import { Row, Col, Spinner, Button, Input } from 'reactstrap';
import URL from '../api'

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      results: [],
      loading: false,
      disabled: false
    }
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.makeSearch()
    }
  }


  handleInput = e => {
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  makeSearch = () => {
    this.setState({ loading: true, disabled: true })
    let url = `${URL}api/search?term=${this.state.search}`
    axios.get(url, {}, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({ results: res.data.data, loading: false, disabled: false })
        console.log(this.state.results)
      })
      .catch((err, code) => {
        this.setState({ disabled: true })
        console.log(err.code);
      });
  };


  render() {
    return (
      <div>
        <Row>
          <Col className="d-flex justify-content-center mb-3" >
            <Input type="text" className="searchInput" name="search" placeholder="Type your search" onChange={this.handleInput} onKeyDown={this._handleKeyDown} />
            <Button disabled={this.state.disabled} outline color="primary" onClick={this.makeSearch}>Search</Button>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            {this.state.loading ?
              <div className="mt-2">
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