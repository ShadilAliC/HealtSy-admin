import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "../App.css";
import MainLayout from "../components/landing-page/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Masters from "../pages/HealthsyServices/Masters";
import { MastersProvider } from "../context/MastersContext";
import EditSalt from "../components/HealthsyServices/Masters/Salt/EditSalt";
import AddSalt from "../components/HealthsyServices/Masters/Salt/AddSalt";
import MedicineList from "../pages/HealthsyServices/MedicineList";
import AddNewMedicine from "../components/HealthsyServices/MedicineList/AddNewMedicine";
import AddManufacturer from "../components/HealthsyServices/Masters/Manufacture/AddManufacturer";
import EditManufacturer from "../components/HealthsyServices/Masters/Manufacture/EditManufacturer";
import AddUnit from "../components/HealthsyServices/Masters/Unit/AddUnit";
import EditUnit from "../components/HealthsyServices/Masters/Unit/EditUnit";
import AddProductType from "../components/HealthsyServices/Masters/ProductType/AddProductType ";
import EditProductType from "../components/HealthsyServices/Masters/ProductType/EditProductType ";
import EditMedicine from "../components/HealthsyServices/MedicineList/EditMedicine";

function AllRoutes() {
  const location = useLocation();

  return (
    <MastersProvider>
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="healthsy-services/order-medicines/masters"
            element={<Masters />}
          />
          <Route
            path="healthsy-services/order-medicines/masters/salt-molecule/add-salt-molecule"
            element={<AddSalt />}
          />
          <Route
            path="healthsy-services/order-medicines/masters/salt-molecule/edit-salt-molecule/:id"
            element={<EditSalt />}
          />
          <Route
            path="healthsy-services/order-medicines/medicine-list"
            element={<MedicineList />}
          />
          <Route
            path="healthsy-services/order-medicines/add-new-medicine"
            element={<AddNewMedicine />}
          />
           <Route
            path="healthsy-services/order-medicines/edit-medicine/:id"
            element={<EditMedicine />}
          />
           <Route
            path="healthsy-services/order-medicines/masters/manufacturer/add-manufacturer"
            element={<AddManufacturer />}
          />
           <Route
            path="healthsy-services/order-medicines/masters/manufacturer/edit-manufacturer/:id"
            element={<EditManufacturer />}
          />
          <Route
            path="healthsy-services/order-medicines/masters/unit/add-unit"
            element={<AddUnit />}
          />
           <Route
            path="healthsy-services/order-medicines/masters/unit/edit-unit/:id"
            element={<EditUnit />}
          />
           <Route
            path="healthsy-services/order-medicines/masters/product-type/add-product-type"
            element={<AddProductType />}
          />
           <Route
            path="healthsy-services/order-medicines/masters/product-type/edit-product-type/:id"
            element={<EditProductType />}
          />
        </Route>
      </Routes>
    </MastersProvider>
  );
}

export default AllRoutes;
