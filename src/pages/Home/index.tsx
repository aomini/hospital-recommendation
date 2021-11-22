import AuthLayout from "src/layout/AuthLayout";
import DataTable from "../../components/DataTable";

import { H1 } from "../../components/Typography";
const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
];

const data = [
  {
    id: 1,
    name: "Hospital 1",
  },
  {
    id: 2,
    name: "Hospital 2",
  },
];
const Home = () => {
  return (
    <AuthLayout>
      <div className="bg-gray-200 p-5">
        <H1 className="font-medium">Hospitals</H1>
      </div>
      <div className="p-5 bg-gray-50 border border-gray-200 rounded-md shadow-sm h-full">
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
};

export default Home;
