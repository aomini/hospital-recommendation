import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import EditIcon from "src/assets/icons/EditIcon";
import TrashIcon from "src/assets/icons/TrashIcon";
import UserAddIcon from "src/assets/icons/UserAddIcon";
import useClickOutside from "src/hooks/useOutsideClick";
import axios from "src/utils/axios";
import { notifyError, notifySuccess } from "src/utils/notify";
import WarningCard from "src/components/WarningCard";
import { H1 } from "../../components/Typography";
import DataTable from "../../components/DataTable";
import { PrimaryButton } from "../../components/Button";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [warning, setWarning] = useState(false);
  const [userId, setUserId] = useState<number>();
  const warnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/user");
      setUsers(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp: any = await axios.delete(`/user/${id}`);
      setUsers((prev) => {
        return prev.filter((user: any) => user.id !== id);
      });
      notifySuccess(resp.message);
    } catch (error) {
      console.log(error);
      notifyError(error);
    }
  };

  useClickOutside(warnRef, () => {
    setWarning(false);
  });

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      cell: (row) => (
        <span className="flex items-center">
          <img
            src={`https://avatars.dicebear.com/api/big-ears-neutral/${row.first_name}.svg`}
            width="40px"
            height="40px"
            alt="User Icon"
            className="mr-2 rounded-full"
          />
          {[row.first_name, row.last_name].join(" ")}
        </span>
      ),
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <section className="flex items-center justify-between">
            <button
              className="text-green-600 mr-5"
              title="Edit User"
              onClick={() => {
                history.push(`/users/edit/${row.id}`);
              }}
            >
              <EditIcon />
            </button>
            <button
              className="text-red-700"
              title="Delete User"
              onClick={() => {
                setWarning(true);
                setUserId(row.id);
              }}
            >
              <TrashIcon />
            </button>
          </section>
        );
      },
    },
  ];

  return (
    <>
      {warning ? (
        <WarningCard
          setWarning={setWarning}
          handleDelete={handleDelete}
          userId={userId}
          ref={warnRef}
        />
      ) : (
        ""
      )}
      <div className="bg-gray-200 p-5">
        <H1 className="font-medium">Users</H1>
      </div>
      <div className="p-5 bg-gray-50 border border-gray-200 rounded-md shadow-sm h-full">
        <section className="text-right mb-5">
          <PrimaryButton
            onClick={() => history.push("/users/create-user")}
            className="inline-flex items-center bg-purple hover:bg-pink-600 text-white rounded-sm"
          >
            Create a New User
            <UserAddIcon className="ml-1" />
          </PrimaryButton>
        </section>
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
};

export default Users;
