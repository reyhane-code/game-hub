import React, { useRef, useState } from "react";
import Form from "../components/common/Form";
import TextInput from "../components/common/TextInput";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const phoneRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setcode] = useState();
  const [vlidationToken, setValidationToken] = useState("");

  const getValidationToken = async () => {
    const response = await HttpRequest.post("/auth/get-validation-token", {
      phone,
    });
    console.log(response)
    setValidationToken(response.data.validationToken);
    setStep(2);
  };

  const loginOrRegister = async () => {
    const response = await HttpRequest.post("/auth/get-validation-token", {
      vlidationToken,
      code,
    });
    localStorage.setItem("tokens", response.data);
    navigate("/");
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
            refVal={phoneRef}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        ) : (
          <TextInput
            type="string"
            refVal={codeRef}
            onChange={(e) => setcode(e.target.value)}
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
