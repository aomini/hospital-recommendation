import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import axios from "src/utils/axios";
import { notifySuccess, notifyError } from "src/utils/notify";
import { PrimaryButton } from "../../components/Button";
import InputField from "../../components/InputField";
import { H1 } from "../../components/Typography";

interface FormValues {
  first_name: string;
  username: string;
  password?: string;
}
const initialValues: FormValues = {
  first_name: "",
  username: "",
  password: "",
};

const CreateUser = ({ edit = false }) => {
  const params = useParams();
  const history = useHistory();

  const createUserSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Please Enter your password")
      .min(6, "Password must be at least 6 characters long")
      .max(32),
  });

  const handleSubmit = async (values) => {
    try {
      if (edit) {
        const { first_name, username, password } = values;
        await axios
          .put(`/user/${params.id}`, {
            first_name,
            username,
            password,
          })
          .then((resp) => console.log(resp));
        notifySuccess("User Updated!");
      } else {
        const resp = await axios.post("/user", values);
        notifySuccess(resp);
      }
      history.push("/users");
    } catch (err: any) {
      const { status, data } = err.response;
      if (status === 400) {
        notifySuccess(data);
      } else {
        notifyError("Couldn't create user! Something went wrong");
      }
    }
  };

  return (
    <div className="bg-gray-50 text-purple p-7 mx-auto mt-5 w-1/3 rounded-md shadow-sm">
      <H1>{edit ? "Update" : "Enter"} User Details</H1>
      <Formik
        initialValues={initialValues}
        validationSchema={createUserSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {function Test({ errors, touched, setFieldValue }) {
          React.useEffect(() => {
            if (edit) {
              // get user and set form fields
              axios.get(`/user/${params.id}`).then((resp) => {
                const user = resp.data;
                const fields = ["first_name", "username"];
                fields.forEach((field) =>
                  setFieldValue(field, user[field], false)
                );
              });
            }
          }, [setFieldValue]);
          return (
            <Form className="mt-7 grid gap-6">
              <Field
                component={InputField}
                // htmlFor="first_name"
                label="First Name"
                id="first_name"
                name="first_name"
                placeholder="Enter First Name"
                inputType="text"
                error={touched.first_name && errors.first_name}
                className="w-full"
              />
              <Field
                component={InputField}
                htmlFor="username"
                label="Username"
                id="username"
                name="username"
                placeholder="Enter User Name"
                inputType="text"
                error={touched.username && errors.username}
                className="w-full"
              />

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
              <section className="text-right">
                <PrimaryButton
                  type="submit"
                  className="uppercase tracking-wider font-medium border border-purple bg-pink-100 hover:bg-pink-200 mx-auto w-1/4 rounded-md"
                >
                  Submit
                </PrimaryButton>
              </section>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateUser;
