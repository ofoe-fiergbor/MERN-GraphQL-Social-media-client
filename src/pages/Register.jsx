import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from '../utils/hooks'
import {AuthContext} from '../context/Auth'

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const { onChange, onSubmit, values } = useForm(registerUser, initialState)

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            // console.log(result)
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values

    })

    function registerUser() {
        addUser()
    }




    return (
        <div className='form_container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''} >
                <h1>Register</h1>

                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name='username'
                    value={values.username}
                    error={errors.username ? true : false}
                    type="text"
                    onChange={onChange}
                />

                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    value={values.email}
                    name='email'
                    type="email"
                    error={errors.email ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    value={values.password}
                    name='password'
                    type="password"
                    error={errors.password ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    value={values.confirmPassword}
                    name='confirmPassword'
                    type="password"
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
      </Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )
            }

        </div>
    );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
