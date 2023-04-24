import { MineState } from "../models/state";

// export default function fileParser(
//     file: File,
//     setState: (e: MineState) => void
// ) {
//     //TODO
//     //посмотреть на импортриуемые файлы может стоит просто отсейкать количество символов взамен этой большой конструкции
//     let headers: string[] = [];
//     let rows: string[][] = [];
//     const fileReader = new FileReader();
//     fileReader.readAsText(file, "windows-1251");
//     fileReader.onload = (e) => {
//         let newFile: any[] = fileReader?.result?.toString().split(";") || [];
//         newFile = newFile.slice(0, newFile.length - 1);
//         newFile = newFile
//             .join(";")
//             .split("\n")
//             .map((item) => item.split(";"));
//         newFile[0].forEach((item: string, index: number) => {
//             if (index === newFile[0].length - 2) {
//                 return headers.push("Число снимков");
//             }
//             if (index > 0) {
//                 return headers.push(item.split(":")[0]);
//             }
//             headers.push("Порядковый номер");
//         });
//         newFile = newFile.map((item: string[]) =>
//             item.map((item: string) => {
//                 let newItem = item;
//                 if (newItem.toLowerCase().includes("порядковый")) {
//                     newItem = newItem.split("Порядковый номер")[1];
//                 }
//                 if (newItem.toLowerCase().includes("число снимков")) {
//                     newItem = newItem.split("Число снимков")[1];
//                 }
//                 const asd = newItem?.split(":");
//                 if (asd) newItem = asd[asd.length - 1];
//                 return newItem;
//             })
//         );
//         rows = newFile;
//         setState({ headers, rows });
//     };
// }

export default function fileParser(
  file: File,
  setState: (e: MineState) => void
) {
  const fileReader = new FileReader();
  fileReader.readAsText(file, "windows-1251");
  fileReader.onload = (e) => {
    let str = fileReader.result?.toString() || "";
    setState(stringParser(str));
  };
}

export function stringParser(str: string) {
  let headers: string[] = [];
  let rows: string[][] = [];
  str = str.slice(128, str?.length - 453);
  const newFile = str.split("\n").map((item) => item.split(";"));
  headers = getHeaders(newFile);
  rows = newFile.map((arrItem) =>
    arrItem.map((strItem) => getRowItem(strItem))
  );
  return { headers, rows };
}

const headersSplit = ["Порядковый номер", "Число снимков"];

function getHeaders(arr: Array<string[]>) {
  const headers: string[] = [];
  arr[0].forEach((itemStr) => {
    let h: string = "";
    for (const i in headersSplit) {
      if (itemStr.includes(headersSplit[i])) {
        h = headersSplit[i];
      }
    }
    if (h) {
      headers.push(h);
    } else {
      headers.push(itemStr.split(":")[0]);
    }
  });
  return headers;
}

function getRowItem(str: string) {
  let h: string = "";
  for (const i in headersSplit) {
    if (str.includes(headersSplit[i])) {
      h = headersSplit[i];
    }
  }
  if (!h) {
    h = ":";
  }
  return str.split(h)[1];
}
