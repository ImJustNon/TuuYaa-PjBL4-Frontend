import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";


function AppRouter(): React.JSX.Element {
    return(
        <Routes>
            <Route 
                path={'/Home'} 
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
        </Routes>
    );
} 

export default AppRouter;