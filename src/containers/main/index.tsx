import React, { ChangeEvent, useState } from 'react'
import saveAs from 'file-saver'
import Table from '../../components/table'

const accept = '.wri'

export default function MainContainer() {
  const [error, setError] = useState('')
  const [rows, setRows] = useState<Array<string>[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  function onChageInput(e: ChangeEvent<HTMLInputElement>) {

    if (e.target.files?.length) {
      if (e.target.files.length > 1) {
        setError('Не больше одного файла')
      }
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'windows-1251')
      fileReader.onload = (e) => {
        let newFile: any[] = fileReader?.result?.toString().split(';') || [];
        let headers: string[] = [];
        newFile = newFile.slice(0, newFile.length - 1)
        newFile = newFile.join(';').split('\n').map(item => item.split(';'))
        newFile[0].forEach((item: string, index: number) => {
          if (index == newFile[0].length - 2) {
            return headers.push('Число снимков')
          }
          if (index > 0) {
            return headers.push(item.split(':')[0])
          }
          headers.push('Порядковый номер')
        })
        setHeaders(headers)
        newFile = newFile.map((item: string[]) => item.map((item: string) => {
          let newItem = item;
          if (newItem.toLowerCase().includes('порядковый')) {
            newItem = newItem.split('Порядковый номер')[1]
          }
          if (newItem.toLowerCase().includes('число снимков')) {
            newItem = newItem.split('Число снимков')[1]
          }

          const asd = newItem?.split(':')
          if (asd)
            newItem = asd[asd.length - 1]
          return newItem;
        }))
        setRows(newFile)

      }
      return
    }
  }
  function saver() {
    //@ts-ignore
    // const newBlob = new Blob(newFile, { type: " text/csv;charset=ansi" })
    // saveAs(newBlob, 'asd.csv')
  }
  return (
    <div>
      {!rows.length &&
        <div>
          <input onChange={onChageInput} type='file' multiple={false} accept={accept} />
        </div>}

      <Table headers={headers} rows={rows} />
    </div>
  )
}
