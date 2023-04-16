import React, { useContext } from "react";
import { RouterComponents } from "../../models/router-components";
import { RouterContext } from "../router";
import style from "./styles.module.css";

export default function Navigation() {
    const router = useContext(RouterContext);

    function toggleRoute(e: RouterComponents) {
        return () => {
            router?.setCurrentComponents(e);
        };
    }
    return (
        <nav className={style.container}>
            <ul className={style.navigation}>
                <li
                    onClick={toggleRoute("mine")}
                    className={style.navigation__item}
                >
                    <button>Выбор файла</button>
                </li>
                <li
                    onClick={toggleRoute("table")}
                    className={style.navigation__item}
                >
                    <button>Таблица</button>
                </li>
                <li
                    onClick={toggleRoute("helps")}
                    className={style.navigation__item}
                >
                    <button>Помощь</button>
                </li>
            </ul>
        </nav>
    );
}
