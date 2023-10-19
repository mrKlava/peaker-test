import { useState, useEffect, useContext } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'

import { Icon, divIcon, point } from "leaflet"
import { DestinationContext } from '../../App'

import "./map.scss"
import 'leaflet/dist/leaflet.css'


function Map() {

  const {destinations, display, hovered, setDisplay} = useContext(DestinationContext)
  const [viewPort, setViewPort] = useState(null)

  const vignemale = [42.77392033020782, -0.14734890869334105]

  const customIcon = new Icon({
    iconUrl: "/assets/images/icons/location.png",
    iconSize: [32, 32],
    iconAnchor: [16, 38],
  })

  const customIconSelected = new Icon({
    iconUrl: "/assets/images/icons/location-selected.png",
    iconSize: [38, 38],
    iconAnchor: [16, 38],
  })

  /* Map events */

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng)
      },
      zoom() {
        setViewPort({... map.getBounds()})
      },
      moveend() {
        setViewPort({... map.getBounds()})
      }
    }) 

    return null
  }

  const MarkerEvents = () => {
    const marker = eventsHandler({
      
    })
  }

  const handleEnter = () => {console.log('test')}

  const initViewPort = (e) => setViewPort({... e.target.getBounds()})
  
  const updateDisplay = () => {
    const newList = []
    destinations.forEach((dest) => {
      if (
        ((dest.latLng[0] >= viewPort._southWest.lat) && (dest.latLng[0] <= viewPort._northEast.lat))
        &&
        ((dest.latLng[1] >= viewPort._southWest.lng) && (dest.latLng[1] <= viewPort._northEast.lng))
        ) {
        newList.push(dest)
      }
    })

    setDisplay(newList)
  }
  
  useEffect(() => {
    if (viewPort) {
      updateDisplay()
    }
  }, [viewPort])

  useEffect(() => {
    console.log(display)
  }, [display])

  useEffect(() => {

  }, [hovered])

  return (
    <div className='map'>

      <MapContainer
        className='test'
        center={vignemale}
        zoom={13}
        whenReady={initViewPort}

        scrollWheelZoom={true}
      >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {
          destinations.map((peak) => {
            return (
              <Marker key={peak.id}
                      position={peak.latLng}
                      onMouseOver={(e) => console.log()} 
                      icon={ hovered === peak.id ? customIconSelected : customIcon }
                      // eventHandlers={} 
              >
                <Popup>
                  <p>ID: {peak.id}</p>
                  {peak.name}
                </Popup>
              </Marker>
            )
          })
        }

        <MapEvents />
      </MapContainer>
    </div>
  )
}

export default Map