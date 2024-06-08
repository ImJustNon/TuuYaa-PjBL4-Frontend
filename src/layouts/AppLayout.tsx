import React, { ReactNode, cloneElement, ReactElement } from "react";
import { AppLayoutProps } from "../types/AppLayoutProps";



function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
    return (
        <>
            {React.Children.map(children, (child: ReactNode) => {
                if (React.isValidElement(child)) {
                    return cloneElement(child as ReactElement<any>);
                }
                return child;
            })}
        </>
    );
}

export default AppLayout;
