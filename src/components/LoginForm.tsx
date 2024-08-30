import {  useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import useAuthStore from "../auth.store";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Alert from "./common/Alert";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import useAuth from "../hooks/useAuth";

export const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [validationToken, setValidationToken] = useState("");
  const navigator = useNavigate();
  const loginCallBack = useAuthStore((s) => s.loginCallBack);
  const closeLoginDialog = useAuthStore((s) => s.closeLoginDialog);
  const { setTokens } = useAuth();
  const getValidationToken = async () => {
    try {
      const response = await HttpRequest.post("/v1/auth/get-validation-token", {
        phone,
      });
      if (response?.data?.validationToken) {
        setValidationToken(response.data.validationToken);
        setStep((prevStep) => prevStep + 1); // Update step based on previous state
      }
    } catch (error) {
      <Alert text="Can not Login or Register" />;
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
        setTokens(accessToken, refreshToken);

        if (typeof loginCallBack == "function") {
          loginCallBack();
        }
        closeLoginDialog();
      }
    } catch (error) {
      <Alert text="Can not Login or Register" />;
    } finally {
      if (!loginCallBack) navigator("/");
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
    <div className="w-1/2 flex justify-center items-center mx-auto my-5">
      <Form
        className="flex flex-col space-y-6 w-full"
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
};

export default LoginForm;
