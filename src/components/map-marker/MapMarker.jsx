import { useEffect, useContext, useRef } from 'react'
import { DestinationContext } from '../../App'

import { Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet"


function MapMarker({ peak }) {
  const { hovered, setHovered, setSelected } = useContext(DestinationContext)

  const markerRef = useRef()

  const customIcon = new Icon({
    iconUrl: "/assets/images/icons/location.png",
    iconSize: [32, 32],
    iconAnchor: [16, 38],
  })

  const customIconSelected = new Icon({
    iconUrl: "/assets/images/icons/location-selected.png",
    iconSize: [32, 32],
    iconAnchor: [16, 38],
  })

  // useEffect(() => {
  //   if (hovered === peak.id) {
  //     markerRef.current.openPopup()
  //   } else {
  //     markerRef.current.closePopup()
  //   }
  // },[hovered])

  return (
    <>
      <Marker key={peak.id}
        position={peak.latLng}
        onMouseOver={(e) => console.log()}
        icon={hovered === peak.id ? customIconSelected : customIcon}
        eventHandlers={{
          mouseover: () => setHovered(peak.id),
          mouseout: () => setHovered(null),
          click: () => setSelected(peak),
        }}
        ref={markerRef}
        id={peak.id}
      >
      
        {/* <Popup>
          <p>ID: {peak.id}</p>
          {peak.name}
        </Popup> */}

      </Marker>

      {/* {
        hovered === peak.id
          ?
          <Popup position={peak.latLng}>
            <p>ID: {peak.id}</p>
            {peak.name}
          </Popup>
          :
          null
      } */}

    </>
  )
}

export default MapMarker      