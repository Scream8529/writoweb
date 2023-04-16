import React, { createContext, useState } from "react";
import { RouterComponents } from "../../models/router-components";
import {
    TableContainer,
    HelpsContainer,
    MainContainer,
} from "../../containers";
import { MainLayout } from "../../layouts";

const components: { [k in RouterComponents]: JSX.Element } = {
    mine: <MainContainer />,
    table: <TableContainer />,
    helps: <HelpsContainer />,
};

export const RouterContext = createContext<null | {
    setCurrentComponents: (e: RouterComponents) => void;
}>(null);

export default function Router() {
    const [currentComponents, setCurrentComponents] =
        useState<RouterComponents>("mine");

    return (
        <RouterContext.Provider value={{ setCurrentComponents }}>
            <MainLayout>{components[currentComponents]}</MainLayout>
        </RouterContext.Provider>
    );
}
