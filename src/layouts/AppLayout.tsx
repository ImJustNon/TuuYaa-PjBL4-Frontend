import React, { ReactNode, cloneElement, ReactElement } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

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
