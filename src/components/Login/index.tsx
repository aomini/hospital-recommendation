import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import H1 from "../Heading/H1";
import Card from "../Card";
import InputField from "../InputField";
import { SuccessButton } from "../Button";

interface LoginProps {}

interface FormValues {
  username: string;
  password: string;
}
const initialValues: FormValues = { username: "", password: "" };

const Login: React.FC<LoginProps> = () => {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().email("Invalid email").required("Required"),
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
    <div className="bg-green-50 py-6 w-full h-screen">
      <Card className="shadow-md rounded-lg p-7 mt-10 mx-auto w-1/3">
        <span className="text-center">
          <H1>Login</H1>
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(`Submitted, ${values} !`);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-7">
              <Field
                component={InputField}
                htmlFor="username"
                label="Username"
                id="username"
                name="username"
                placeholder="Enter username"
                inputType="text"
                error={touched.username && errors.username}
              />
              <br />
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
              />

              <SuccessButton
                type="submit"
                // onClick={() => console.log("Button clicked!")}
                className="uppercase tracking-wider font-medium mt-4 py-4 w-full rounded-md"
              >
                Submit
              </SuccessButton>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
