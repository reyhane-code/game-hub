import React, { useRef, useState } from "react";
import Form from "../components/common/Form";
import TextInput from "../components/common/TextInput";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [validationToken, setValidationToken] = useState("");

  const getValidationToken = async () => {
    const response = await HttpRequest.post("/auth/get-validation-token", {
      phone,
    });
    if (response?.data?.validationToken) {
      setValidationToken(response.data.validationToken);
      setStep((prevStep) => prevStep + 1); // Update step based on previous state
    }
  };

  const loginOrRegister = async () => {
    const response = await HttpRequest.post("/auth/login-or-register", {
      validationToken,
      code,
    });
    if (response?.data) {
      localStorage.setItem("tokens", response.data);
      navigate("/");
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (step == 1) {
      getValidationToken();
    } else {
      loginOrRegister();
    }
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        {step == 1 ? (
          <TextInput
            type="string"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        ) : (
          <TextInput
            type="string"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the given code"
          />
        )}
        <Button color="primary" type="submit">
          Confirm
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
