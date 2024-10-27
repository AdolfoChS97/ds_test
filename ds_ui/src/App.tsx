import { useIsAuthenticated } from '@refinedev/core';
import { Refine } from "@refinedev/core";
import { ConfigProvider } from "antd";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Login as LoginPage } from "./pages/login";
import { Register as RegisterPage } from "./pages/register";
import { Home as HomePage } from "./pages/home";

const ProtectedRoute = ({ children }: any) => {
  const { isSuccess } = useIsAuthenticated();
  return isSuccess ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <ConfigProvider
              theme={RefineThemes.Blue}
            >
              <DevtoolsProvider>
                <Refine
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerBindings}
                  authProvider={authProvider}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "SRrVhF-bm9l0T-S23ZTi",
                  }}
                >
                  <Routes>
                    <Route index element={<LoginPage />} />
                    <Route element={ <RegisterPage /> } path="/register" />
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  </Routes>
                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </ConfigProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
