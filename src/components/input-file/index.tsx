import React, { ChangeEvent } from "react";
import style from "./styles.module.css";
import FileIcon from "../icons/file";

export default function InputFile({
    onChageInput,
    accept,
}: {
    onChageInput: (e: ChangeEvent<HTMLInputElement>) => void;
    accept: string;
}) {
    return (
        <div className={style.container}>
            <label className={style.label}>
                <span>Нажать для выбора файла</span>
                <FileIcon />
                <input
                    className={style.input}
                    onChange={onChageInput}
                    type="file"
                    multiple={false}
                    accept={accept}
                />
            </label>
        </div>
    );
}
