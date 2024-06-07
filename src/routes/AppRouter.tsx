import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";


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
        </Routes>
    );
} 

export default AppRouter;