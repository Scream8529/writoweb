import { MineState } from "../models/state";

export default function fileParser(
    file: File,
    setState: (e: MineState) => void
) {
    //TODO
    //посмотреть на импортриуемые файлы может стоит просто отсейкать количество символов взамен этой большой конструкции
    let headers: string[] = [];
    let rows: string[][] = [];
    const fileReader = new FileReader();
    fileReader.readAsText(file, "windows-1251");
    fileReader.onload = (e) => {
        let newFile: any[] = fileReader?.result?.toString().split(";") || [];
        newFile = newFile.slice(0, newFile.length - 1);
        newFile = newFile
            .join(";")
            .split("\n")
            .map((item) => item.split(";"));
        newFile[0].forEach((item: string, index: number) => {
            if (index === newFile[0].length - 2) {
                return headers.push("Число снимков");
            }
            if (index > 0) {
                return headers.push(item.split(":")[0]);
            }
            headers.push("Порядковый номер");
        });
        newFile = newFile.map((item: string[]) =>
            item.map((item: string) => {
                let newItem = item;
                if (newItem.toLowerCase().includes("порядковый")) {
                    newItem = newItem.split("Порядковый номер")[1];
                }
                if (newItem.toLowerCase().includes("число снимков")) {
                    newItem = newItem.split("Число снимков")[1];
                }
                const asd = newItem?.split(":");
                if (asd) newItem = asd[asd.length - 1];
                return newItem;
            })
        );
        rows = newFile;
        setState({ headers, rows });
    };
}
