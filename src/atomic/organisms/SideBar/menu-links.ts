import { BsGearFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const menuLinks = [
  {
    label: "Dashboard",
    href: "/private/dashboard",
    icon: MdDashboard,
    disabled: true,
  },
  {
    label: "Usuários",
    href: "/private/users",
    icon: FaUsers,
    disabled: false,
  },
  {
    label: "Perfil",
    href: "/private/profile",
    icon: BsGearFill,
    disabled: false,
  },
];
