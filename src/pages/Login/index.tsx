import React from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

import axios from "src/utils/axios";
import { H1 } from "../../components/Typography";
import Card from "../../components/Card";
import InputField from "../../components/InputField";
import { PrimaryButton } from "../../components/Button";

interface LoginProps {}

interface FormValues {
  username: string;
  password: string;
}
const initialValues: FormValues = { username: "", password: "" };

const Login: React.FC<LoginProps> = () => {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Please Enter your password")
      .min(6, "Password must be at least 6 characters long")
      .max(32)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must have one Uppercase, one Lowercase, one Number and one special Character"
      ),
  });

  const history = useHistory();
  const notify = (message) => toast.warning(message);

  React.useEffect(() => {
    axios.get("/user");
  }, []);

  const handleSubmit = async (values) => {
    try {
      const resp = await axios.post("/user/login", values);
      localStorage.setItem("tok", resp.data);
      history.push("/");
    } catch (err: any) {
      const { status, data } = err.response;
      if (status === 400) {
        notify(data);
      } else {
        notify("Couldn't login! Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center bg-map bg-center bg-cover py-6 w-full h-screen">
      <Card className="shadow-md rounded-lg p-8 mt-16 mx-auto w-1/4">
        <span className="text-center text-purple">
          <H1>Login</H1>
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-7">
              <ToastContainer />
              <Field
                component={InputField}
                htmlFor="username"
                label="Username"
                id="username"
                name="username"
                placeholder="Enter username"
                inputType="text"
                error={touched.username && errors.username}
                className="w-full"
              />
              <br />
              <Field
                component={InputField}
                htmlFor="password"
                label="Password"
                id="password"
                name="password"
                placeholder="Enter password"
                inputType="password"
                error={errors.password}
                className="w-full"
              />
              <section className="text-center">
                <PrimaryButton
                  type="submit"
                  className="uppercase tracking-wider font-medium border bg-gold hover:bg-yellow-500 mt-4 mx-auto py-4 w-1/2 rounded-md"
                >
                  SUBMIT
                </PrimaryButton>
              </section>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
