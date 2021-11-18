import HomeIcon from "src/assets/icons/HomeIcon";
import UserAddIcon from "src/assets/icons/UserAddIcon";
import UsersIcon from "src/assets/icons/UsersIcon";
import { PrimaryButton, IconButton } from "../Button";
import { BodyText, Subtitle } from "../Typography";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex items-center justify-between shadow-sm h-20 w-full p-3">
      <section className="grid grid-cols-2 gap-6">
        <IconButton className="text-purple hover:bg-purple hover:text-gray-50">
          <UsersIcon className="mx-auto" />
          Users
        </IconButton>

        <IconButton className="text-gray-800 hover:bg-gray-800 hover:text-gray-50">
          <HomeIcon className="mx-auto" /> Hospitals
        </IconButton>
      </section>
      <section></section>
      <section className="flex-col justify-center">
        <BodyText className="text-gold">User</BodyText>
        <Subtitle className="text-gray-600">user@gmail.com</Subtitle>
      </section>
      {/* <PrimaryButton className="flex items-center">
        Create User <UserAddIcon className="ml-1" />
      </PrimaryButton>
      <PrimaryButton>Log Out</PrimaryButton> */}
    </div>
  );
};

export default Navbar;
