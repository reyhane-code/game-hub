import { useState } from "react";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import { HttpRequest } from "../helpers/http-request-class.helper";
import AppForm from "./common/AppForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [validationToken, setValidationToken] = useState("");
  const { setTokens } = useAuth();
  const navigate = useNavigate();

  const getValidationToken = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/get-validation-token", {
      phone: data.phone,
    });
    if (response?.data?.validationToken) {
      setValidationToken(response.data.validationToken);
      setStep((prevStep) => prevStep + 1); // Update step based on previous state
    }
  };

  const loginOrRegister = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/login-or-register", {
      validationToken,
      code: data.code,
    });
    if (response?.data) {
      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      navigate("/");
    }
  };

  const onSubmit = async (data: any) => {
    if (step == 1) {
      getValidationToken(data);
    } else {
      loginOrRegister(data);
    }
  };

  return (
    <div
      className="w-1/2 flex justify-center items-center mx-auto my-5"
      key={step}
    >
      <AppForm onSubmit={onSubmit}>
        {step == 1 ? (
          <TextInput
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        ) : (
          <TextInput
            name="code"
            type="text"
            placeholder="Enter the given code"
          />
        )}
        <Button color="primary" type="submit">
          Confirm
        </Button>
      </AppForm>
    </div>
  );
};

export default LoginForm;
