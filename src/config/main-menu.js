import { Home, Settings, Pill} from 'lucide-react';

export const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  
  {
    title: "HeathSy Services",
    icon: Settings,
    path: "/healthsy-services",
    submenu: [
      {
        title: "Order Medicine",
        icon: Pill,
        path: null,
        submenu: [
          { title: "Masters", path: "/healthsy-services/order-medicines/masters" },
          { title: "Medicine List", path: "/healthsy-services/order-medicines/medicine-list" },
        ],
      },
    ],
  },
];


