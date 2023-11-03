import { useState } from 'react'
import { Filter } from '../index'

import "./menu.scss"

function Menu() {
  return (
    <div className='menu'>
      <h1 className='title'>Peaker</h1>

      <Filter />

    </div>
  )
}

export default Menu