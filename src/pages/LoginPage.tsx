import { useState } from "react";
import Form from "../components/common/Form";
import TextInput from "../components/common/TextInput";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../auth.store";
import Alert from "../components/common/Alert";

function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [validationToken, setValidationToken] = useState("");
  const navigator = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
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
        HttpRequest.setTokens = {
          data: { accessToken, refreshToken },
          key: "tokens",
        };
        setTokens({ accessToken, refreshToken });
        setIsAuthenticated(true);
        //TODO : check if login callback exists if typeof === func use it as func
        //TODO : call closeloginDialog
      }
    } catch (error) {
      <Alert text="Can not Login or Register" />;
    } finally {
      //TODO if login call back did not exist
      navigator("/");
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
}

export default LoginPage;
