import {useParams} from "react-router-dom"
import AuthLayout from "src/layout/AuthLayout";
import { H1 } from "../../components/Typography";

interface UpdateUsersProps{}

const UpdateUsers: React.FC <UpdateUsersProps> = () => {
    const params = useParams()
    console.log(params.id)

  return (
    <AuthLayout>
      <div className="bg-gray-50 text-purple p-7 mx-auto mt-5 w-1/3 rounded-md shadow-sm">
        <H1>Update User Details</H1>
      </div>
    </AuthLayout>
  );
};

export default UpdateUsers;
