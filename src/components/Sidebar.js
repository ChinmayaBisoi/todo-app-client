import { usePathname } from "next/navigation";
import Link from "next/link";
import FileText from "./icons/FileText";
import CreditCard from "./icons/CreditCard.js";
import Settings from "./icons/Settings";

const sidebarOptions = [
  {
    label: "Posts",
    url: "/",
    icon: <FileText size={16} />,
  },
  {
    label: "Billing",
    url: "/billing",
    icon: <CreditCard size={16} />,
  },
  {
    label: "Settings",
    url: "/settings",
    icon: <Settings size={16} />,
  },
];
const Sidebar = ({ hide = false }) => {
  const pathname = usePathname();

  const isActive = (url) => {
    if (url === pathname) {
      return true;
    }

    return false;
  };

  if (hide) {
    return null;
  }

  return (
    <aside className="hidden stretch w-[200px] flex-col gap-4 md:flex p-4 py-8 fixed">
      {sidebarOptions.map(({ label, url, icon }) => {
        return (
          <Link key={label} href={url}>
            <div
              className={`py-2 px-4 rounded-md flex items-center gap-3
            ${isActive(url) ? "bg-gray-200" : "hover:bg-gray-200"}
            `}>
              {icon}
              {label}
            </div>
          </Link>
        );
      })}

      <div className="mt-56 bg-gray-200 rounded-md text-center">
        <p>Credits</p>
      </div>
    </aside>
  );
};

export default Sidebar;
