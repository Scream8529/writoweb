import React, { ChangeEvent, useContext, useState } from "react";
import saveAs from "file-saver";
import fileParser, { stringParser } from "../../utilits/file-parser";
import { MineState } from "../../models/state";
import { StateContext } from "../../layouts/main";
import { RouterContext } from "../../components/router";
import InputFile from "../../components/input-file";
import { arrToString } from "../../utilits/arr-to-string";

const accept = ".wri";

export default function MainContainer() {
    const [error, setError] = useState("");
    const { state, setState } = useContext(StateContext);
    const [textValue, setTextValue] = useState('')
    const [fileName, setFileName] = useState('')

    function onChageInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            if (e.target.files.length > 1) {
                setError("Не больше одного файла");
            }
            fileParser(e.target.files[0], setState);
        }
    }

    function toggleStringConvert() {
        if (textValue) {
            const result = stringParser(textValue);
            setState(result)
            setTextValue('')
        }
        setError('Значение не может быть пустым')
    }
    function reset() {
        setState({} as MineState)
    }
    function saver() {
        const stringFile = arrToString([state.headers, ...state.rows])
        //@ts-ignore
        const newBlob = new Blob([stringFile], { type: " text/csv;charset=utf-8" })
        saveAs(newBlob, `${fileName || '_____'}.csv`);
        setFileName('')
    }

    return <>
        {state?.rows?.length ? <>
            <div className='container'>
                <button type="button" onClick={reset}>Сбросить файл</button>
            </div>
            <div className='container'>
                <input placeholder="Имя файла(Не обязательно)" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                <button type="button" onClick={saver}>Сохранить файл</button>
            </div>
        </>
            : <>
                <div className='container'>
                    <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                    <button onClick={toggleStringConvert}>Конвертировать текст</button>
                </div>

                <InputFile onChageInput={onChageInput} accept={accept} />

            </>
        }
    </>;
}
