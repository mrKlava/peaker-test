import { createContext, useEffect, useState } from "react"
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
  const destinations = data
  
  return (
    <main className="main">
      <DestinationContext.Provider value={{destinations, display, hovered, setDisplay, setHovered}} >
        <Side />
        <Map />
      </DestinationContext.Provider>
    </main>
  );
}

export default App;
