import { useHistory } from "react-router-dom";

interface SidebarProps {
  className?: string;
  setShowFields?(a: any): void;
  showFields?: boolean;
}

// const menuList = [
//   {
//     name: "Staff Details",
//     href: "/staff-details",
//     subMenu: [
//       { name: "Doctors", href: "/doctors" },
//       { name: "Nurses", href: "/nurses" },
//       { name: "Assistants", href: "/assistants" },
//     ],
//   },

// ];

const Sidebar: React.FC<SidebarProps> = ({
  showFields,
  setShowFields,
  className = "",
}) => {

  const history = useHistory()
  return (
    <div
      className={`flex-col bg-pink-700 text-white py-3 shadow-md h-screen absolute left-0 top-20 w-1/6 ${className}`}
    >
      <ul>
        <li className="border-l-8 border-green-500 bg-gray-50">
          <button
            className="font-medium p-3 text-green-600 w-full text-lg text-left"
            onClick={() => history.push("/settings/fields")}
          >
            Fields
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
