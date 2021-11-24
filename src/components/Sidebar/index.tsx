import { useHistory, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
  setShowFields?(a: any): void;
  showFields?: boolean;
}

const menuList = [
  {
    name: "Fields",
    path: "/settings",
  },
  {
    name: "Priorities",
    path: "/settings/priorities",
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  showFields,
  setShowFields,
  className = "",
}) => {

  const history = useHistory()
  const location = useLocation()
  return (
    <div
      className={`flex-col bg-gray-100 text-white py-3 shadow-md h-screen absolute left-0 top-20 w-1/6 ${className}`}
    >
      <ul>
        {menuList.map((item) => (
          <li className={`border-l-8 ${location.pathname === item.path ? "border-green-500 bg-green-50" : ""} mb-2`} key={item.path}>
          <button
            className={`font-medium p-3  ${location.pathname === item.path ? "text-green-600" : "text-gray-800"} w-full text-lg text-left`}
            onClick={() => history.push(item.path)}
          >
            {item.name}
          </button>
        </li>
        )) }
      </ul>
    </div>
  );
};

export default Sidebar;
