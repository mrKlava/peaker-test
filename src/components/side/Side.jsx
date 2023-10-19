import React from 'react'

import './side.scss'
import { Menu, List } from "../";


function Side() {
  return (
    <div className='side'>
      <Menu />
      <List />
    </div>
  )
}

export default Side