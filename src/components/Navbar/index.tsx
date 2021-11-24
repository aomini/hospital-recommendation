import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import EyeIcon from "src/assets/icons/EyeIcon";

import HomeIcon from "src/assets/icons/HomeIcon";
import LogOutIcon from "src/assets/icons/LogOutIcon";
import SettingsIcon from "src/assets/icons/SettingsIcon";
import UsersIcon from "src/assets/icons/UsersIcon";
import { IconButton } from "../Button";
import { BodyText, Subtitle } from "../Typography";
import { UserContext } from "src/Providers/AuthProvider";

interface NavbarProps {}
const navItems = [
  { name: "Hospitals", href: "/", Icon: HomeIcon },
  { name: "Users", href: "/users", Icon: UsersIcon },
  { name: "Settings", href: "/settings", Icon: SettingsIcon },
  { name: "Lookups", href: "/look-ups", Icon: EyeIcon },
];

const Navbar: React.FC<NavbarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <UserContext.Consumer>
      {(value: any) => (
        <div className="nav-bar sticky top-0 bg-white shadow-sm min-h-20 w-full px-3 z-10">
          <div className="flex items-center justify-between container mx-auto">
            <section className="grid grid-cols-8 gap-6 items-center">
              {navItems.map(({ name, href, Icon }) => (
                <IconButton
                  onClick={() => history.push(href)}
                  className={`hover:bg-purple hover:text-gray-50 font-medium ${
                    location.pathname === href
                      ? "text-purple border-b-4 border-purple"
                      : "text-gray-600"
                  }`}
                  key={href}
                >
                  <Icon className="mx-auto" />
                  {name}
                </IconButton>
              ))}
            </section>
            <section className="flex justify-start w-auto">
              <button
                onClick={handleOpen}
                className="relative flex items-center min-w-xxs w-auto"
              >
                <div className="rounded-full bg-gold h-9 w-9 mr-2"></div>
                <span className="flex-col justify-start">
                  <BodyText className="text-gold text-left">
                    {value.first_name}
                  </BodyText>
                  <Subtitle className="text-gray-600">
                    {value.username}
                  </Subtitle>
                </span>
                {menuOpen ? (
                  <section className="absolute top-12 bg-gray-100 py-3 text-left shadow-md h-32 w-32">
                    <button
                      className="flex text-sm font-medium py-2 px-3 hover:bg-gray-300 w-full"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="mr-2" />
                      Log Out
                    </button>
                  </section>
                ) : (
                  ""
                )}
              </button>
            </section>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Navbar;
