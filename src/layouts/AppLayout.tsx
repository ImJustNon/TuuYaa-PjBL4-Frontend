import React, { ReactNode, cloneElement, ReactElement } from "react";
import { AppLayoutProps } from "../types/AppLayoutProps";

interface AppLayoutComponentProps extends AppLayoutProps {
    isAuthLoaded: boolean;
    children: ReactNode;
}

function AppLayout({ children, isAuthLoaded }: AppLayoutComponentProps): React.JSX.Element {

    return (
        <>
            {/* Screen Space */}
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full flex flex-col grow bg-white md:max-w-md">
                    {/* React Element */}
                    {isAuthLoaded ? 
                        React.Children.map(children, (child: ReactNode) => {
                            if (React.isValidElement(child)) {
                                return cloneElement(child as ReactElement<any>);
                            }
                            return child;
                        })
                    :
                        <>
                            <div className="flex flex-col justify-center items-center grow gap-3">
                                <span className="loading loading-dots w-20 text-[#f76418]"></span>
                                <div className="text-xl font-semibold animate__animated animate__pulse animate__infinite">Authenticating . . .</div>
                            </div>
                            <div className="text-center pb-5">If the page is stuck, please try reloading it.</div>
                        </>
                    } 
                </div>
            </div>
        </>
    );
}

export default AppLayout;
