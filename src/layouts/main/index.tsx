import React, { PropsWithChildren, createContext, useState } from "react";
import { MineState } from "../../models/state";
import Navigation from "../../components/navigation";

interface ContextState {
    state: MineState;
    setState: (e: MineState) => void;
}

export const StateContext = createContext<ContextState>({
    state: {},
    setState: (e) => {},
} as ContextState);

export default function MainLayout(props: PropsWithChildren<{}>) {
    const [state, setState] = useState<MineState>({} as MineState);

    return (
        <StateContext.Provider value={{ state, setState }}>
            <Navigation />
            <div>{props.children}</div>
        </StateContext.Provider>
    );
}
