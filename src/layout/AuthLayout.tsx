import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";

interface LayoutProps {
  children: any;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {/* <section className="grid grid-cols-6">
        <Sidebar />
        <section className="col-span-5 p-2">{children}</section>
      </section> */}
    </div>
  );
};

export default AuthLayout;
