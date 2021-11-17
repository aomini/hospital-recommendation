import H1 from "../Heading/H1";
import Card from "../Card";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="bg-green-100 text-center w-full h-screen">
      Logo goes here
      <Card className="shadow-md rounded-lg p-5 mt-5 mx-auto w-1/2">
        <H1>Login</H1>
      </Card>
    </div>
  );
};

export default Login;
