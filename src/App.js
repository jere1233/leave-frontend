// src/App.js
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import "./scss/style.scss";

import ProtectedRoute from "./auth/ProtectedRoute";

// Lazy imports
const Login = React.lazy(() => import("./views/auth/Login"));
const Signup = React.lazy(() => import("./views/auth/Signup"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout")); // layout with sidebar/header

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />

          {/* Protected Layout with Sidebar */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
