import UserAddIcon from "src/assets/icons/UserAddIcon";
import { PrimaryButton } from "../Button";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="bg-green-500 shadow-sm h-20 w-full text-white p-3">
      <PrimaryButton className="flex items-center">
        Create User <UserAddIcon className="ml-1" />
      </PrimaryButton>
    </div>
  );
};

export default Navbar;
