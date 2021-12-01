import { useState, useRef } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

import { UserContext } from "src/Providers/AuthProvider";
import useClickOutside from "src/hooks/useOutsideClick";
import HomeIcon from "src/assets/icons/HomeIcon";
import EyeIcon from "src/assets/icons/EyeIcon";
import LogOutIcon from "src/assets/icons/LogOutIcon";
import LocationIcon from "src/assets/icons/LocationIcon";
import SettingsIcon from "src/assets/icons/SettingsIcon";
import UsersIcon from "src/assets/icons/UsersIcon";
import { BodyText, Subtitle } from "../Typography";
import activeLinkChecker from "src/utils/activeLinkChecker";

interface NavbarProps {}
const navItems = [
  { name: "Hospitals", href: "/", Icon: HomeIcon },
  { name: "Maps", href: "/map", Icon: LocationIcon },
  { name: "Users", href: "/users", Icon: UsersIcon },
  { name: "Lookups", href: "/look-ups", Icon: EyeIcon },
  { name: "Settings", href: "/settings", Icon: SettingsIcon },
];

const Navbar: React.FC<NavbarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef: any = useRef();
  const location = useLocation();
  const history = useHistory();

  const path = location.pathname.split("/");
  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  useClickOutside(menuRef, () => {
    setMenuOpen(false);
  });
  console.log(location);
  console.log(path);
  return (
    <UserContext.Consumer>
      {(value: any) => (
        <div className="nav-bar sticky top-0 bg-white shadow-sm min-h-20 w-full px-3 z-10">
          <div className="flex items-center justify-between container mx-auto">
            <section className="grid grid-cols-8 gap-6 items-center">
              {navItems.map(({ name, href, Icon }) => (
                <Link
                  to={href}
                  className={`text-base flex flex-col justify-center items-center p-3 hover:bg-purple hover:text-gray-50 font-medium ${activeLinkChecker(
                    href,
                    location.pathname
                  )}`}
                  key={href}
                >
                  <Icon className="mx-auto h-8 w-8" />
                  {name}
                </Link>
              ))}
            </section>
            <section className="flex justify-start w-auto" ref={menuRef}>
              <button
                onClick={handleOpen}
                className="relative flex items-center min-w-xxs w-auto"
              >
                <div className="rounded-full bg-gold h-9 w-9 mr-2">
                  <img
                    src={`https://avatars.dicebear.com/api/big-ears-neutral/${value.first_name}.svg`}
                    alt="User Icon"
                    className="rounded-full"
                  />
                </div>
                <span className="flex-col justify-start">
                  <BodyText className="text-gold text-left">
                    {value.first_name}
                  </BodyText>
                  <Subtitle className="text-gray-600">
                    @{value.username}
                  </Subtitle>
                </span>
                {menuOpen ? (
                  <section className="absolute top-12 bg-gray-100 py-3 text-left shadow-md h-auto w-32">
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
