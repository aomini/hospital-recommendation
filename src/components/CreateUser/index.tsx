import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify'

import AuthLayout from "src/layout/AuthLayout";
import axios from "src/utils/axios";
import { PrimaryButton } from "../Button";
import InputField from "../InputField";
import { H1 } from "../Typography";

interface FormValues {
  first_name: string;
  username: string;
  password: string;
  // email: string;
}
const initialValues: FormValues = {
  first_name: "",
  username: "",
  password: "",
  // email: "",
};

const CreateUser = () => {
  const notify = (message) => toast.warning(message);
  const successNotify = (message) => toast.success(message)

  const createUserSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    // email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Please Enter your password")
      .min(8, "Password must be at least 8 characters long")
      .max(32)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must have one Uppercase, one Lowercase, one Number and one special Character"
      ),
  });

  const handleSubmit = async(values) => {
try{
  const resp = await axios.post("/user", values)
  successNotify(resp)
}catch(err: any){
  const {status, data} = err.response
  if(status === 400){
    notify(data)
  }else{
    notify("Couldn't create user! Something went wrong")
  }
}
  }
  return (
    <AuthLayout>
      <div className="bg-gray-50 text-purple p-7 mx-auto mt-5 w-1/3 rounded-md shadow-sm">
        <H1>Enter User Details</H1>
        <Formik
          initialValues={initialValues}
          validationSchema={createUserSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-7">
              <ToastContainer />
              {/* <section className="grid grid-cols-2 gap-5"> */}
                <Field
                  component={InputField}
                  htmlFor="first_name"
                  label="First Name"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter First Name"
                  inputType="text"
                  error={touched.first_name && errors.first_name}
                  className="w-full"
                />
                <br />
                <Field
                  component={InputField}
                  htmlFor="username"
                  label="Username"
                  id="username"
                  name="username"
                  placeholder="Enter Last Name"
                  inputType="text"
                  error={touched.username && errors.username}
                  className="w-full"
                />
              {/* </section> */}
              <br />
              {/* <section cla> */}
                {/* <Field
                  component={InputField}
                  htmlFor="email"
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  inputType="email"
                  error={errors.email}
                  className="w-full"
                /> */}

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
              {/* </section> */}
              <section className="text-right mt-5">
                <PrimaryButton
                  type="submit"
                  // onClick={() => console.log("Button clicked!")}
                  className="uppercase tracking-wider font-medium border border-purple bg-pink-100 hover:bg-pink-200 mt-4 mx-auto w-1/4 rounded-md"
                >
                  Submit
                </PrimaryButton>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default CreateUser;
