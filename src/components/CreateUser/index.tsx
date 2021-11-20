import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import AuthLayout from "src/layout/AuthLayout";
import { PrimaryButton } from "../Button";
import InputField from "../InputField";
import { H1 } from "../Typography";

interface FormValues {
  firstName: string;
  userName: string;
  password: string;
  // email: string;
}
const initialValues: FormValues = {
  firstName: "",
  userName: "",
  password: "",
  // email: "",
};

const CreateUser = () => {
  const createUserSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    userName: Yup.string().required("Required"),
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
  return (
    <AuthLayout>
      <div className="bg-gray-50 text-purple p-7 mx-auto mt-5 w-1/3 rounded-md shadow-sm">
        <H1>Enter User Details</H1>
        <Formik
          initialValues={initialValues}
          validationSchema={createUserSchema}
          onSubmit={(values) => {
            console.log(`Submitted, ${values}!`);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-7">
              {/* <section className="grid grid-cols-2 gap-5"> */}
                <Field
                  component={InputField}
                  htmlFor="firstName"
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  inputType="text"
                  error={touched.firstName && errors.firstName}
                  className="w-full"
                />
                <br />
                <Field
                  component={InputField}
                  htmlFor="userName"
                  label="Username"
                  id="userName"
                  name="userName"
                  placeholder="Enter Last Name"
                  inputType="text"
                  error={touched.userName && errors.userName}
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
