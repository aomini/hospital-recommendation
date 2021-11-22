import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import HomeIcon from "src/assets/icons/HomeIcon";
import SettingsIcon from "src/assets/icons/SettingsIcon";
import UsersIcon from "src/assets/icons/UsersIcon";
import { IconButton } from "../Button";
import { BodyText, Subtitle } from "../Typography";

interface NavbarProps {}

const navItems = [
  { name: "Hospitals", href: "/" },
  { name: "Users", href: "/users" },
  { name: "Settings", href: "/settings" },
];

const Navbar: React.FC<NavbarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const location = useLocation();
  const history = useHistory();
  return (
    <div className="sticky top-0 bg-white shadow-sm min-h-20 w-full px-3 z-50">
      <div className="flex items-center justify-between container mx-auto">
        <section className="grid grid-cols-3 gap-6 items-center">
          {navItems.map(({ name, href }) => (
            <IconButton
              onClick={() => history.push(href)}
              className={`hover:bg-purple hover:text-gray-50 font-medium ${
                location.pathname === href
                  ? "text-purple border-b-4 border-purple"
                  : "text-gray-600"
              }`}
              key={href}
            >
              {name === "Users" ? (
                <UsersIcon className="mx-auto" />
              ) : name === "Hospitals" ? (
                <HomeIcon className="mx-auto" />
              ) : (
                <SettingsIcon className="mx-auto" />
              )}
              {name}
            </IconButton>
          ))}
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
