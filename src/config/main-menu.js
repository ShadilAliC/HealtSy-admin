import { Home, Users, Settings, Pill} from 'lucide-react';

export const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    path: "/user-list",
  },
 
  {
    title: "HeathSy Services",
    icon: Settings,
    path: "/heathSy-services",
    submenu: [
      { 
        title: "Order Medicine", 
        icon: Pill,
        path: null,
        submenu: [
          { title: "Masters", path: "/heathSy-services/order-medicines/masters" },
          { title: "Medicine List", path: "/heathSy-services/order-medicine/medicine-list" },
         
        ]
      },
      
      
    ],
  }
];

