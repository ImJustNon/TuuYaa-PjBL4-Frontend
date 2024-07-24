import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import Scan from "../pages/Scan";
import NotFound from "../pages/NotFound";
import Bypass from "../components/Bypass";
import Manage from "../pages/Manage";
import AboutUs from "../pages/AboutUs";
import UpdateAlertInfo from "../pages/UpdateAlertInfo";

function AppRouter({ isAuthLoaded }: { isAuthLoaded: boolean }): React.JSX.Element {
    return(
        <Routes>
            <Route 
                path={'/'} 
                element={
                    <AppLayout isAuthLoaded={isAuthLoaded}>
                        <Home />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/signin'} 
                element={
                    <AppLayout isAuthLoaded={isAuthLoaded}>
                        <SignIn />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/scan'} 
                element={
                    <AppLayout isAuthLoaded={isAuthLoaded}>
                        <Scan />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/manage/b/:boxUUID'} 
                element={
                    <AppLayout isAuthLoaded={isAuthLoaded}>
                        <Manage />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/manage/b/:boxUUID/a/:alertUUID'} 
                element={
                    <AppLayout isAuthLoaded={isAuthLoaded}>
                        <UpdateAlertInfo />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/bypass'} 
                element={
                    <Bypass />
                } 
            />
            <Route 
                path={'/aboutus'} 
                element={
                    <AppLayout isAuthLoaded={isAuthLoaded}>
                        <AboutUs />
                    </AppLayout>
                } 
            />
            <Route 
                path={'*'} 
                element={
                    <AppLayout isAuthLoaded={isAuthLoaded}>
                        <NotFound />
                    </AppLayout>
                } 
            />
        </Routes>
    );
} 

export default AppRouter;