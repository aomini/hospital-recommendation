import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "src/assets/icons/HomeIcon";
import UsersIcon from "src/assets/icons/UsersIcon";
import { IconButton } from "../Button";
import { BodyText, Subtitle } from "../Typography";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="sticky top-0 bg-white shadow-sm h-20 w-full p-3">
      <div className="flex items-center justify-between container mx-auto">
        <section className="grid grid-cols-3 gap-6 items-center">
          <Link to="/" className="font-medium hover:text-purple">
            Home
          </Link>
          <IconButton className="text-purple hover:bg-purple hover:text-gray-50">
            <UsersIcon className="mx-auto" />
            Users
          </IconButton>

          <IconButton className="text-gray-800 hover:bg-gray-800 hover:text-gray-50">
            <HomeIcon className="mx-auto" /> Hospitals
          </IconButton>
        </section>

        <button onClick={handleOpen} className="relative flex items-center">
          <div className="rounded-full bg-gold h-7 w-7 mr-2"></div>
          <span className="flex-col justify-start">
            <BodyText className="text-gold text-left">User</BodyText>
            <Subtitle className="text-gray-600">user@gmail.com</Subtitle>
          </span>
          {menuOpen ? (
            <section className="absolute top-12 bg-gray-50 shadow-md h-32 w-32">
              <button>Log Out</button>
            </section>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
