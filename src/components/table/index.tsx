import React from 'react'
import style from './styles.module.css'

export default function Table(props: { headers: string[], rows: Array<string>[] }) {
  return (
    <div className={style.table_container}>
      <table cellSpacing={0} className={style.table}>
        <thead className={style.header}>
          {props.headers?.map((item, index) =>
            <td key={`${item}${index}`} className={style.header_ceil}>{item}</td>)}
        </thead>
        <tbody className={style.body}>
          {props.rows?.map((file, index) => <tr className={style.body_row} key={`${file}${index}`}>
            {file.map((item, index) => <td className={style.body_ceil} key={item + index}>{item}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}
