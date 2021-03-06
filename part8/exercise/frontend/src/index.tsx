import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";

import "./index.css";
import App from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000"
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
