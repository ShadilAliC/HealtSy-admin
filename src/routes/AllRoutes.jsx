import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "../App.css";
import MainLayout from "../components/landing-page/MainLayout";
import UserList from "../pages/UserList/UserList";
import Dashboard from "../pages/Dashboard/Dashboard";
import Masters from "../pages/HealthsyServices/Masters";
import { MastersProvider } from "../context/MastersContext";
import EditSalt from "../components/HealthsyServices/Masters/Salt/EditSalt";
import AddSalt from "../components/HealthsyServices/Masters/Salt/AddSalt";
import MedicineList from "../pages/HealthsyServices/MedicineList";
import AddNewMedicine from "../components/HealthsyServices/MedicineList/AddNewMedicine";

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
        </Route>
      </Routes>
    </MastersProvider>
  );
}

export default AllRoutes;
