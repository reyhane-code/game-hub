import { useState } from "react";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import { HttpRequest } from "../helpers/http-request-class.helper";
import AppForm from "./common/AppForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuthStore from "../auth.store";


enum AuthStep {
  PHONE = 1,
  CODE = 2,
  PASSWORD = 3
}

interface Props {
  callback?: () => void
}
export const LoginForm = ({ callback }: Props) => {
  const [step, setStep] = useState<AuthStep>(AuthStep.PHONE);
  const [validationToken, setValidationToken] = useState("");
  const [hasPassword, setHasPassword] = useState(false)
  const { setTokens } = useAuth();
  const navigate = useNavigate();
  const loginCallBack = useAuthStore((s) => s.loginCallBack);


  const getValidationToken = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/get-validation-token", {
      phone: data.phone,
    });
    if (response?.data?.hasPassword == true) {
      setStep(AuthStep.PASSWORD)
      setHasPassword(true)
    } else if (response?.data?.validationToken) {
      setValidationToken(response.data.validationToken);
      setStep(AuthStep.CODE); // Update step based on previous state
    }
    //TODO: else server error
  };

  //TODO : getvalidation with forcesendsms


  const loginOrRegister = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/login-or-register", {
      validationToken,
      code: data.code,
    });
    if (response?.data) {
      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      if (typeof loginCallBack == 'function') {
        loginCallBack()
      }

      if (typeof callback == 'function') { callback() } else navigate("/");
    }
  };

  const loginWithPassword = async (data: any) => { }

  const onSubmit = async (data: any) => {
    if (step == 1) {
      getValidationToken(data);
    } else if (step === 2) {
      loginOrRegister(data);
    } else if (hasPassword) {
      loginWithPassword(data)
    }
  };

  // Validation schema for step 1 (phone)
  const step1ValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
  });

  // Validation schema for step 2 (code)
  const step2ValidationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .length(4, "Code must be exactly 4 characters"), // Adjust length as needed
  });

  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required')
  })

  return (
    <div
      className="w-1/2 flex justify-center items-center mx-auto my-5"
      key={step}
    >
      <AppForm
        onSubmit={onSubmit}
        validationSchema={
          step == 1 ? step1ValidationSchema : step2ValidationSchema
        }
      >
        {step == 1 ? (
          <TextInput
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        ) : (
          //TODO: show phone - edit phone 
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
      //TODO: login with code and login with password (based on haspassword)
    </div>
  );
};

export default LoginForm;
