interface SidebarProps {}

const menuList = [
  {
    name: "Staff Details",
    href: "/staff-details",
    subMenu: [
      { name: "Doctors", href: "/doctors" },
      { name: "Nurses", href: "/nurses" },
      { name: "Assistants", href: "/assistants" },
    ],
  },

];

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="flex-col bg-gray-50 text-red-500 p-3 shadow-md h-screen">
      MENU
      <span>Staff Details</span>
    </div>
  );
};

export default Sidebar;
