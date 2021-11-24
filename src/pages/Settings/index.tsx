import Sidebar from "src/components/Sidebar";
import AuthLayout from "src/layout/AuthLayout";
import Fields from "../Fields";

const Settings = () => {
  return (
    <AuthLayout childrenClass="grid grid-cols-6 gap-2">
      <section className="col-span-1">
        <Sidebar
          className=""
        />
      </section>
      {/* <section className="col-span-5"><Fields /></section> */}
    </AuthLayout>
  );
};

export default Settings;
