import React, { useRef, useState } from "react";
import Form from "../components/common/Form";
import TextInput from "../components/common/TextInput";
import { HttpMethod } from "../components/common/Form";
import Button from "../components/common/Button";

function LoginPage() {
  const namRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [register, setRegister] = useState(false);
  return (
    <div>
      {register ? (
        <div className="flex flex-col items-center">
          <h2>Sign Up!</h2>
          <Form method={HttpMethod.POST} action="#" submitText="Sign Up">
            <TextInput
              type="text"
              placeholder="Enter your name"
              refVal={namRef}
            ></TextInput>

            <TextInput
              type="email"
              placeholder="Email Address"
              refVal={emailRef}
            ></TextInput>

            <TextInput
              type="password"
              placeholder="Password"
              refVal={passwordRef}
            ></TextInput>
            <TextInput
              type="text"
              placeholder="Confirm password"
              refVal={confirmPasswordRef}
            ></TextInput>
          </Form>
          <Button color="link" size="md" onClick={() => setRegister(false)}>
            Already have an account? Login
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2>Login to your account!</h2>
          <Form action="/" method={HttpMethod.POST} submitText="Login">
            <TextInput
              type="email"
              placeholder="Email Address"
              refVal={emailRef}
            ></TextInput>

            <TextInput
              type="password"
              placeholder="Password"
              refVal={passwordRef}
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
