import { Suspense } from "react";
import { Navigate, Route, RouteProps, Routes, useLocation } from "react-router-dom";

import AdminLayout from "@/components/layout/admin";
import AuthLayout from "@/components/layout/auth";
import routes from "@/services/routes";
import allRoutes from "@/services/routes/all_routes";
import { useAuthContext } from "@/states/auth";

const Router = (props: RouteProps) => {
    const { isLoggedIn } = useAuthContext();
    const location = useLocation();

    return (
        <Routes>
            <Route>
                {allRoutes.admin.map((route, index) => (
                    <Route
                        key={"admin-" + index}
                        path={route.path}
                        element={
                            isLoggedIn() ? (
                                <AdminLayout {...props}>{route.element}</AdminLayout>
                            ) : (
                                <Navigate to={routes.auth.login + `?redirectTo=${location.pathname}`} replace />
                            )
                        }
                    />
                ))}
            </Route>
            <Route>
                {allRoutes.auth.map((route, index) => (
                    <Route
                        key={"auth-" + index}
                        path={route.path}
                        element={<AuthLayout {...props}>{route.element}</AuthLayout>}
                    />
                ))}
            </Route>
            <Route>
                {allRoutes.other.map((route, index) => (
                    <Route key={"other-" + index} path={route.path} element={<Suspense>{route.element}</Suspense>} />
                ))}
            </Route>
        </Routes>
    );
};

export default Router;
