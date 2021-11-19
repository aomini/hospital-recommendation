import React from "react"

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import axios from "src/utils/axios"
import { H1 } from "../Typography";
import Card from "../Card";
import InputField from "../InputField";
import { PrimaryButton } from "../Button";

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
      .min(8, "Password must be at least 8 characters long")
      .max(32)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must have one Uppercase, one Lowercase, one Number and one special Character"
      ),
  });

const history = useHistory()
const notify = (message) => toast.warning(message);

React.useEffect(
() => {
axios.get("/user")
}, [] )

  const handleSubmit = async (values) => {
    try{
      const resp = await axios.post('/user/login', values)
      console.log(resp.data)
      localStorage.setItem("tok", resp.data)
      history.push("/")
    }catch(err: any){
      const {status, data} = err.response
      if(status === 400){
        notify(data)
      }else{
        notify("Couldn't login! Something went wrong")
      }
    }
  }

  return (
    <div className="bg-map bg-center py-6 w-full h-screen">
      <Card className="shadow-md rounded-lg p-8 mt-16 mx-auto w-1/3">
        <span className="text-center text-purple">
          <H1>Login</H1>
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleSubmit(values)
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
                  // onClick={notify}
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

export default Login
