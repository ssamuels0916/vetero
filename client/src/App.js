import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import GetTemperature from  './components/getTemperature';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render(){
    return (
  <ApolloProvider client={client}>
    <div id="main">
    <header>
      <h1>vetero</h1>
      <h3>your weather app</h3>
    </header>
    <GetTemperature />
    </div>
  </ApolloProvider>
    );
  }
};

export default App;
