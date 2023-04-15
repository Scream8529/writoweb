import React, { PropsWithChildren } from 'react'

export default function MainLayout(props: PropsWithChildren<{}>) {
  return (
    <div>
      {props.children}
    </div>
  )
}
