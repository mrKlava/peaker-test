import React, { useContext } from 'react'
import { ListItem } from '../index'

import "./list.scss"
import { DestinationContext } from '../../App'

function List() {
  const { display } = useContext(DestinationContext)

  return (
    <div className='list'>
      <div className='list-inner'>
        { display.map((item) => <ListItem key={item.id} item={item} />) }
      </div>
    </div>
  )
}

export default List