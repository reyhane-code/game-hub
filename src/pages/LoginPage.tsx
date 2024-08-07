import { useState } from "react";
import Form from "../components/common/Form";
import TextInput from "../components/common/TextInput";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Button from "../components/common/Button";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [validationToken, setValidationToken] = useState("");

  const getValidationToken = async () => {
    const response = await HttpRequest.post("/v1/auth/get-validation-token", {
      phone,
    });
    if (response?.data?.validationToken) {
      setValidationToken(response.data.validationToken);
      setStep((prevStep) => prevStep + 1); // Update step based on previous state
    }
  };

  const loginOrRegister = async () => {
    try {
      const response = await HttpRequest.post("v1/auth/login-or-register", {
        validationToken,
        code,
      });
      if (response?.data) {
        const { accessToken, refreshToken } = response.data;
        HttpRequest.setTokens = {
          data: { accessToken, refreshToken },
          key: "tokens",
        };
      }
    } catch (error) {
      console.log("an error occured", error);
    } finally {
      return <Navigate to="/" />;
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
