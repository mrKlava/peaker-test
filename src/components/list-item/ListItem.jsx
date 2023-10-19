import React, { useContext } from 'react'
import { DestinationContext } from '../../App'

function ListItem({item}) {

  const {hovered, setHovered} = useContext(DestinationContext)
  
  const handleEnter = () => setHovered(item.id) 
  const handleLeave = () => setHovered(null)


  return (
    <div className='list-item'
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
    >
      <h3 className='list-item_title'>{item.name}</h3>
      <div className="list-item_image">
        <img src={"/assets/images/main/" + item.img} alt="" />
      </div>
      <div className='list-item_info'>
        <ul className='item-info'>
          <li className='item-info_item'>Altitude: <span>{item.altitude}m</span></li>
          <li className='item-info_item'>Difficulty: <span>{item.difficulty}</span></li>
        </ul>
      </div>
    </div>
  )
}

export default ListItem