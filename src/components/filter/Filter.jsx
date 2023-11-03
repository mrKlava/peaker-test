import { useEffect, useState, useContext } from 'react'

import './filter.scss'
import { DestinationContext } from '../../App'



function Filter() {
  const [ search, setSearch ] = useState('')
  const { destinations } = useContext(DestinationContext)

  const handleChange = (e) => setSearch(e.target.value)
  const handleSearch = () => destinations.filter((destination) => destination.name === search)
  


  useEffect(() => {
    if (search) {
      console.log(handleSearch())
    }

  }, [search])

  return (
    <div className='menu-form'>
      <input type="text" value={search} onChange={handleChange} />

    </div>
  )
}

export default Filter