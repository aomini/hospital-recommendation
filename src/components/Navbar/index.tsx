import UserAddIcon from "src/assets/icons/UserAddIcon";
import { PrimaryButton } from "../Button";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex items-center justify-between bg-red-600 shadow-sm h-20 w-full text-white p-3">
      <PrimaryButton className="flex items-center">
        Create User <UserAddIcon className="ml-1" />
      </PrimaryButton>
      <PrimaryButton>Log Out</PrimaryButton>
    </div>
  );
};

export default Navbar;
