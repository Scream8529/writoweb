import React, { ChangeEvent, useContext, useState } from "react";
// import saveAs from "file-saver";
import fileParser from "../../utilits/fileParser";
import { MineState } from "../../models/state";
import { StateContext } from "../../layouts/main";
import { RouterContext } from "../../components/router";
import InputFile from "../../components/input-file";

const accept = ".wri";

export default function MainContainer() {
    const [error, setError] = useState("");
    const { setState } = useContext(StateContext);
    const router = useContext(RouterContext);

    function toggleAfterLoad(e: MineState) {
        setState(e);
        router?.setCurrentComponents("table");
    }

    function onChageInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            if (e.target.files.length > 1) {
                setError("Не больше одного файла");
            }
            fileParser(e.target.files[0], toggleAfterLoad);
        }
    }
    // function saver() {
    //     @ts-ignore
    //      const newBlob = new Blob(newFile, { type: " text/csv;charset=ansi" })
    //      saveAs(newBlob, 'asd.csv')
    // }
    return <InputFile onChageInput={onChageInput} accept={accept} />;
}
