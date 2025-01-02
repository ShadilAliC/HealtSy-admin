import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "../App.css";
import RegistrationPage from "../pages/Signup/Signup";
import MainLayout from "../components/landing-page/MainLayout";
import UserList from "../pages/UserList/UserList";
import PublicRoute from "./PublicRoute";
import ProtectRoute from "./ProtectRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Masters from "../pages/HealthsyServices/Masters";
import { MastersProvider } from "../context/MastersContext";
import EditSalt from "../components/HealthsyServices/Masters/Salt/EditSalt";
import AddSalt from "../components/HealthsyServices/Masters/Salt/AddSalt";
import MedicineList from "../pages/HealthsyServices/MedicineList";


const RegisterForm = lazy(() =>
  import("../components/auth/Register/RegisterForm")
);
const RegisterFormTwo = lazy(() =>
  import("../components/auth/Register/RegisterFormTwo")
);
const RegisterFormThree = lazy(() =>
  import("../components/auth/Register/RegisterFormThree")
);
const Success = lazy(() => import("../components/auth/Register/Success"));

function AllRoutes() {
  const location = useLocation();

  return (
    <MastersProvider>
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Dashboard />
              </ProtectRoute>
            }
          />
          <Route
            path="/healthsy-partnered-doctors-network-programme/doctor-registration"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RegisterForm />
                </Suspense>
              }
            />
            <Route
              path="pharmacy-license-and-location-details"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RegisterFormTwo />
                </Suspense>
              }
            />
            <Route
              path="pharmacy-license-and-location-details/other-information"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RegisterFormThree />
                </Suspense>
              }
            />
          <Route
            path="pharmacy-license-and-location-details/other-information/success"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Success />
              </Suspense>
            }
          />
          </Route>
          <Route
            path="user-list"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectRoute>
                  <UserList />
                </ProtectRoute>
              </Suspense>
            }
          />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectRoute>
                  <Dashboard />
                </ProtectRoute>
              </Suspense>
            }
          />
          <Route
            path="heathSy-services/order-medicines/masters"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectRoute>
                  <Masters />
                </ProtectRoute>
              </Suspense>
            }
          />
          <Route
            path="heathSy-services/order-medicines/masters/salt-molecule/add-salt-molecule"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectRoute>
                  <AddSalt />
                </ProtectRoute>
              </Suspense>
            }
          />
          <Route
            path="heathSy-services/order-medicines/masters/salt-molecule/edit-salt-molecule/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectRoute>
                  <EditSalt />
                </ProtectRoute>
              </Suspense>
            }
          />
            <Route
            path="heathSy-services/order-medicines/medicine-list"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectRoute>
                  <MedicineList />
                </ProtectRoute>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </MastersProvider>
  );
}

export default AllRoutes;
