import {useHistory} from "react-router-dom"
import Navbar from "src/components/Navbar";

interface LayoutProps {
  children: any;
  childrenClass?: string;
}

const AuthLayout: React.FC<LayoutProps> = ({
  children,
  childrenClass = "",
}) => {
  const history = useHistory()
  const tok = localStorage.getItem("tok")
  console.log(tok)
  if (!tok) {
    history.replace("/login");
    return null;
  }
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
