import React, { useContext } from "react";
import Table from "../../components/table";
import { StateContext } from "../../layouts/main";

export default function TableContainer() {
    const { state } = useContext(StateContext);
    return (
        <div>
            <Table headers={state?.headers} rows={state?.rows} />
        </div>
    );
}
