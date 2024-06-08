import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import Scan from "../pages/Scan";


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
        </Routes>
    );
} 

export default AppRouter;