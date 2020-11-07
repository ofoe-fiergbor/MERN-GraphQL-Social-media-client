import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";


import {AuthContext} from '../context/Auth'
import { useForm } from "../utils/hooks";

function Login(props) {
  const context = useContext(AuthContext)
  
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm(allowUserLogin, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      // console.log(result)
      context.login(result.data.login)
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function allowUserLogin() {
    loginUser();
  }



  return (
    <div className="form_container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>

        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          type="text"
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          value={values.password}
          name="password"
          type="password"
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login( username: $username, password: $password ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
