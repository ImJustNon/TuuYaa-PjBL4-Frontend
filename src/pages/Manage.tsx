import React from "react";
import { Params, useParams } from "react-router-dom";

function Manage(): React.JSX.Element {
    const params: Params<string> = useParams();
    const boxUUID: string = params.boxUUID ?? "";
    
    return (
        <>
            <div className="text-white">
                {boxUUID}
            </div>
        </>
    );
}


export default Manage;