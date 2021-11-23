import { H1 } from "src/components/Typography";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="bg-red-200 h-screen w-full flex items-center justify-center">
      <H1> 404 Page Not Found</H1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default PageNotFound;
