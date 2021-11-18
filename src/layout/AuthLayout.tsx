import Navbar from "src/components/Navbar";

interface LayoutProps {
  children: any;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-200">
      <Navbar />
      <section className="container mx-auto p-2">{children}</section>
    </div>
  );
};

export default AuthLayout;
