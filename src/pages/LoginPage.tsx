import React, { useRef, useState } from "react";
import Form from "../components/common/Form";
import TextInput from "../components/common/TextInput";
import { HttpMethod } from "../components/common/Form";
import Button from "../components/common/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface User {
  name?: string;
  email: string;
  password: string;
  registerd: boolean;
}

function LoginPage() {
  const addUser = useMutation({
    mutationFn: async (user: User) => {
      axios
        .post("http://127.0.0.1:80/gamehub/index.php", {
          user,
        })
        .then((response) => JSON.stringify(response))

        .then((data) => {
          // Handle the data received from the PHP script

          console.log("data", data);
        })
        .catch((e) => console.log("error", e));
    },
  });
  const namRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [registerForm, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {registerForm ? (
        <div className="flex flex-col items-center">
          <h2>Sign Up!</h2>
          <Form
            onSubmit={() => {
              addUser.mutate({
                name,
                email,
                password,
                registerd: false,
              });
            }}
            submitText="Sign Up"
          >
            <TextInput
              type="text"
              placeholder="Enter your name"
              refVal={namRef}
              name="name"
              onChange={(event) => setName(event.target.value)}
            ></TextInput>

            <TextInput
              type="email"
              placeholder="Email Address"
              refVal={emailRef}
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            ></TextInput>

            <TextInput
              type="password"
              placeholder="Password"
              refVal={passwordRef}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            ></TextInput>
          </Form>
          <Button color="link" size="md" onClick={() => setRegister(false)}>
            Already have an account? Login
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2>Login to your account!</h2>
          <Form
            onSubmit={() => {
              addUser.mutate({
                email,
                password,
                registerd: true,
              });
            }}
            submitText="Login"
          >
            <TextInput
              type="email"
              placeholder="Email Address"
              refVal={emailRef}
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></TextInput>

            <TextInput
              type="password"
              placeholder="Password"
              refVal={passwordRef}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            ></TextInput>
          </Form>
          <Button color="link" size="md" onClick={() => setRegister(true)}>
            Don't have an account? Sign up now
          </Button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
