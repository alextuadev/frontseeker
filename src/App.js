import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { Container } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: []
    }
  }

  render() {
    return (
      <Container className="mt-5">
        <SearchBar />
      </Container>

    );
  }
}

export default App;
