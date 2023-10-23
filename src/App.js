import { createContext, useState } from "react"
import { Map, Side } from "./components"

import { data } from "./assets/data/data"

export const DestinationContext = createContext({
  destinations: [],
  display: [],
  hovered: {},
  setDisplay: () => {},
  setHovered: () => {},
})


function App() {

  const [display, setDisplay] = useState([])
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const destinations = data

  return (
    <main className="main">
      <DestinationContext.Provider value={
          {
            destinations, 
            display, 
            hovered, 
            selected, 
            setDisplay, 
            setHovered, 
            setSelected,
          }
      } >
        <Side />
        <Map />
      </DestinationContext.Provider>
    </main>
  );
}

export default App;
