import React from "react";
import { useLocation } from "react-router-dom";
import { menuItems } from "../config/main-menu";
import { useMastersContext } from "../context/MastersContext";

const Breadcrumbs = () => {
  const location = useLocation();
  const { selectedTab, addAction } = useMastersContext();
  const findMenuItemByPath = (path) => {
    for (const item of menuItems) {
      if (item.path === path) return item;

      if (item.submenu) {
        for (const subItem of item.submenu) {
          if (subItem.path === path) {
            return { ...subItem, parent: item.title };
          }
          if (subItem.submenu) {
            const nestedSubItem = subItem.submenu.find(
              (nested) => nested.path === path
            );
            if (nestedSubItem) {
              return {
                ...nestedSubItem,
                parent: subItem.title,
                grandparent: item.title,
              };
            }
          }
        }
      }
    }
    return null;
  };

  const getBreadcrumbs = (path) => {
    const pathNames = path.split("/").filter((x) => x);
    let currentPath = "";
    const breadcrumbs = [];

    pathNames.forEach((name, index) => {
      currentPath += `/${name}`;
      const menuItem = findMenuItemByPath(currentPath);
      if (menuItem) {
        if (menuItem.parent) {
          breadcrumbs.push({
            title: menuItem.parent,
            path: menuItem.path || "/",
          });
        }
        if (menuItem.grandparent) {
          breadcrumbs.push({
            title: menuItem.grandparent,
            path: `/`,
          });
        }

        breadcrumbs.push({
          title: menuItem.title,
          path: currentPath,
          isLast: index === pathNames.length - 1,
        });
      } else if (index === pathNames.length - 1) {
        // breadcrumbs.push({
        //   title: name,
        //   path: currentPath,
        //   isLast: true,
        // });
      }
    });

    if (path.includes("/masters") && selectedTab) {
      const tabTitle =
        selectedTab === "manufacturer"
          ? "Manufacturer List"
          : selectedTab === "salt"
          ? "Salt / Molecule"
          : selectedTab === "unit"
          ? "Unit"
          : selectedTab === "productType"
          ? "Product Type"
          : selectedTab;

      breadcrumbs.push({
        title: tabTitle,
        path: `${path}/${selectedTab}`,
        isLast: true,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);
  let currentPageTitle =
  breadcrumbs.map((breadcrumb) => breadcrumb.title).join(" / ") ||
  "Dashboard";

if (addAction) {
  currentPageTitle += ` / ${addAction}`;
}

currentPageTitle = currentPageTitle.replace(/-/g, ' ');
  return (
    <nav className="w-full " aria-label="breadcrumb">
      <div className="min-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-between">
        <h1 className="text-[20px] pb-2 font-Mulish   font-bold text-black">
          {currentPageTitle}
        </h1>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
