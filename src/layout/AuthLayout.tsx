import Navbar from "src/components/Navbar";

interface LayoutProps {
  children: any;
  childrenClass?: string;
}

const AuthLayout: React.FC<LayoutProps> = ({
  children,
  childrenClass = "",
}) => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <section className={`container mx-auto p-2 ${childrenClass}`}>
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
