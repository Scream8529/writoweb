import React, { useContext, useEffect } from "react";
import Table from "../../components/table";
import { StateContext } from "../../layouts/main";

export default function TableContainer() {
    const { state, setState } = useContext(StateContext);
    console.log(state);
    // useEffect(() => {
    //     window.print();
    // }, []);
    return (
        <div>
            <Table headers={state?.headers} rows={state?.rows} />
        </div>
    );
}
