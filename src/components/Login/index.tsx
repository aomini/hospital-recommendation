import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import H1 from "../Heading/H1";
import Card from "../Card";
import InputField from "../InputField";
import { SuccessButton } from "../Button";

interface LoginProps {}

const LoginSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // lastName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  username: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="bg-green-100 w-full h-screen">
      Logo goes here
      <Card className="shadow-md rounded-lg p-7 mt-5 mx-auto w-1/3">
        <span className="text-center">
          <H1>Login</H1>
        </span>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(`Submitted, ${values} !`);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-7">
              <Field
                as={InputField}
                htmlFor="username"
                label="Username"
                id="username"
                name="username"
                placeholder="Enter username"
                inputType="text"
                error={errors.username}
              />
              <br />
              <Field
                as={InputField}
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
                onClick={() => console.log("Button clicked!")}
                className="uppercase tracking-wider font-medium mt-4 w-full rounded-sm py-4"
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
