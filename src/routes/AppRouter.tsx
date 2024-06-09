import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import Scan from "../pages/Scan";
import NotFound from "../pages/NotFound";

function AppRouter(): React.JSX.Element {
    return(
        <Routes>
            <Route 
                path={'/'} 
                element={
                    <AppLayout >
                        <Home />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/signin'} 
                element={
                    <AppLayout >
                        <SignIn />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/scan'} 
                element={
                    <AppLayout >
                        <Scan />
                    </AppLayout>
                } 
            />
            <Route 
                path={'*'} 
                element={
                    <AppLayout >
                        <NotFound />
                    </AppLayout>
                } 
            />
        </Routes>
    );
} 

export default AppRouter;