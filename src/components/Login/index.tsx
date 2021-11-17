import { Formik, Field, Form } from "formik";
import H1 from "../Heading/H1";
import Card from "../Card";
import InputField from "../InputField";
import { SuccessButton } from "../Button";

interface LoginProps {}

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
          onSubmit={() => {}}
        >
          <Form className="mt-7">
            <Field
              as={InputField}
              htmlFor="username"
              label="Username"
              id="username"
              name="username"
              placeholder="Enter username"
            />
            <br />
            <br />
            <Field
              as={InputField}
              htmlFor="password"
              label="Password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
            <SuccessButton className="uppercase tracking-wider font-medium mt-4 w-full rounded-sm py-4">
              Submit
            </SuccessButton>
          </Form>
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
