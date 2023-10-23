import { useState, useEffect, useContext } from 'react'
import { MapContainer, Polyline, TileLayer, useMapEvents } from 'react-leaflet'

import { DestinationContext } from '../../App'

import { MapMarker } from '../index'

import { track } from "../../assets/data/1"

import "./map.scss"
import 'leaflet/dist/leaflet.css'



function Map() {

  const INIT_ZOOM = 11
  const VIGNEMAL = [42.77392033020782, -0.14734890869334105]

  const { destinations, hovered, display, setDisplay } = useContext(DestinationContext)
  const [ markers, setMarkers ] = useState([])
  const [ zoom, setZoom ] = useState(INIT_ZOOM)
  const [ viewPort, setViewPort ] = useState(null)
  const [ test, setTest ] = useState(null)



  const path = track.data.trackData[0].map((item) => [item.lat, item.lon])


  /* Map events */

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng)
      },
      zoom() {
        setViewPort({ ...map.getBounds() })
        setZoom(map.getZoom())
        updateMarkers()
      },
      moveend() {
        setViewPort({ ...map.getBounds() })
      },
    })

    return null
  }


  /* Setters and updaters for states */

  const initViewPort = (e) => setViewPort({ ...e.target.getBounds() })
  const updateDisplay = () => setDisplay(getList(markers))
  const updateMarkers = () => setMarkers(getMarkers(destinations))


  /* Getters for values */

  const getMarkers = (list) => {
    return list.filter((location) => {
      if (zoom <= 12) {
        if (location.main) {
          return location
        }
      } else if (zoom <=13) {
        if (location.altitude >= 3200 || location.main) {
          console.log(3100)
          return location
        }
      } else if (zoom <=14) {
        if (location.altitude >= 2900 || location.main) {
          console.log(2900)
          return location
        }
      } else if (zoom >= 14) {
        console.log('all')
        return location
      }
    })
  }
  /**
   * This function filters out locations in viewport
   * @param {[{lat: string, long: string}] : arr}
   * @returns {[{lat: string, long: string}] : arr} 
   */
  const getList = (list) => {
   return list.filter((location) => {
      if (
        ((location.latLng[0] >= viewPort._southWest.lat) && (location.latLng[0] <= viewPort._northEast.lat))
        &&
        ((location.latLng[1] >= viewPort._southWest.lng) && (location.latLng[1] <= viewPort._northEast.lng))
      ) {
        return location
      }
    })
  }

  const getPath = async (id) => {
    // try {
    //   const resp = await fetch('assets/data/1.json', {
    //     credentials: "same-origin",
    //     headers: {
    //       // "Content-Type": "application/json",
    //     },
    //   })

    //   const path = resp.json()

    //   setTest(path)
    //   console.log(path)
    // } catch (error) {
    //   console.log(error)
    // }

    fetch(`assets/data/${id}.json`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setTest(data.data.trackData))
      .catch(error => setTest(null))
  }

  useEffect(() => {
    if (viewPort) {
      updateDisplay()
    }
  }, [viewPort])

  useEffect(() => {
    updateDisplay()
  }, [markers])        

  useEffect(() => {
    if (hovered !== null) {
      getPath(hovered)
    } else {
      setTest(null)
    }
  }, [hovered])

  useEffect(() => {
    updateMarkers()    
  }, [zoom])


  return (
    <div className='map'>

      <MapContainer
        className='test'
        center={VIGNEMAL}
        zoom={INIT_ZOOM}
        whenReady={initViewPort}

        scrollWheelZoom={true}
      >
      

        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((peak) => <MapMarker key={peak.id} peak={peak} />)}

        <Polyline
          positions={test ? test : ''}
        // positions={path} 
        />

        <MapEvents />
      </MapContainer>
    </div>
  )
}

export default Map