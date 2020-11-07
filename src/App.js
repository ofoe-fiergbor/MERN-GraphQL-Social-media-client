import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SinglePost from "./pages/SinglePost.jsx";
import { AuthProvider } from "./context/Auth";
import AuthRoute from './utils/AuthRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route path="/" exact component={Home} />
          <AuthRoute path="/login" exact component={Login} />
          <AuthRoute path="/register" exact component={Register} />
          <Route path="/posts/:postId" exact component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
