import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useState,
} from "react";
import { MineState } from "../../models/state";
import { RouterContext } from "../../components/router";
import { RouterComponents } from "../../models/router-components";

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
    const router = useContext(RouterContext);

    function toggleRoute(e: RouterComponents) {
        return () => {
            console.log(e);
            router?.setCurrentComponents(e);
        };
    }
    return (
        <StateContext.Provider value={{ state, setState }}>
            <div>
                <ul>
                    <li onClick={toggleRoute("mine")}>
                        <button>Mine</button>
                    </li>
                    <li onClick={toggleRoute("helps")}>
                        <button>Help</button>
                    </li>
                </ul>
            </div>
            <div>{props.children}</div>
        </StateContext.Provider>
    );
}
