import { usePathname } from "next/navigation";
import Link from "next/link";
import FileText from "./icons/FileText";
import CreditCard from "./icons/CreditCard.js";
import Settings from "./icons/Settings";
import Sprout from "./icons/Sprout";

const sidebarOptions = [
  {
    label: "Posts",
    url: "/",
    icon: <FileText width="16" height="16" />,
  },
  {
    label: "Billing",
    url: "/billing",
    icon: <CreditCard width="16" height="16" />,
  },
  {
    label: "Settings",
    url: "/settings",
    icon: <Settings width="16" height="16" />,
  },
  {
    label: "About",
    url: "/about",
    icon: <Sprout width="16" height="16" />,
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

  return (
    <aside
      className={`${
        hide ? "hidden md:flex" : ""
      } stretch w-[200px] flex-col gap-4  p-4 py-8 fixed`}>
      {sidebarOptions.map(({ label, url, icon }) => {
        return (
          <Link key={label} href={url}>
            <div
              className={`py-2 px-4 rounded-md flex items-center gap-3
            ${isActive(url) ? "bg-gray-100" : "hover:bg-gray-100"}
            `}>
              {icon}
              {label}
            </div>
          </Link>
        );
      })}

      {/* <div className="mt-56 bg-gray-100 rounded-md text-center">
        <p>Credits</p>
      </div> */}
    </aside>
  );
};

export default Sidebar;
