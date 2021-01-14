import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";

import "./Register.css";
import axios from "axios";
import makeToast from "../../../toast";

const Register = () => {
  let user = {
    fname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  let errors = [];

  const [userState, setUserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);

  const handleInput = (event) => {
    let target = event.target;
    setUserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please fill is all fields" })
      );
      return false;
    } else if (!checkPassword()) {
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return (
      !userState.username.length ||
      !userState.email.length ||
      !userState.password.length ||
      !userState.confirmpassword.length
    );
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      seterrorState((error) =>
        error.concat({
          message: "Password length should be 8 or greater than 8 ",
        })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      seterrorState((error) =>
        error.concat({
          message: "Password not match with the Confirm Password",
        })
      );
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (event) => {
    let fname = userState.fname;
    let username = userState.username;
    let email = userState.email;
    let password = userState.password;
    let confirmpassword = userState.confirmpassword;

    seterrorState(() => []);
    if (checkForm()) {
      axios
        .post("http://localhost:8080/user/signup", {
          fname,
          username,
          email,
          password,
          confirmpassword,
        })
        .then((res) => {
          console.log(res.data);
          makeToast("success", res.data.message);
          // props.history.push("/login");
        })
        .catch((err) => {
          makeToast("error", err.res.data.message);
        });
    }
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-box">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2">
          <Icon name="slack" />
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="fname"
              value={userState.name}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="name"
            />
            <Form.Input
              name="username"
              value={userState.username}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="Username"
            />
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="password"
            />
            <Form.Input
              name="confirmpassword"
              value={userState.confirmpassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="confirmpassword"
            />
            <Button>Submit</Button>
          </Segment>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Register;
