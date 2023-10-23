import React, { useContext } from 'react'

import { Menu, List } from "../";
import { DestinationContext } from '../../App';

import './side.scss'

function Side() {
  const { selected, setSelected } = useContext(DestinationContext)

  const handelClose = () => setSelected(null)

  return (
    <div className='side'>
      <Menu />

      {
        selected === null
          ?
          <List />
          :
          <div className='details'>
            <button className='details-button' onClick={handelClose}>Close</button>
            <h1 className='details-title'> {selected.name} </h1>
            <div className="details-image">
              <img src="" alt="" />
            </div>
            <p className='details-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sint mollitia odio omnis officia illo saepe repudiandae optio, perferendis aliquam laudantium consequuntur at nulla consequatur molestias numquam cumque sapiente ullam!</p>
            <ul className='details-info'>
              <li className="details-info_item">
                Test
              </li>
              <li className="details-info_item">
                Test
              </li>
              <li className="details-info_item">
                Test
              </li>
            </ul>
          </div>
      }
    </div>
  )
}

export default Side