import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

import './index.css';
import App from './Components';


const render = () => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql',
  });

  const client = new ApolloClient({
    networkInterface,
  });

  const renderComponent = (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  ReactDOM.render(renderComponent, document.getElementById('root'));
};

export default render;
