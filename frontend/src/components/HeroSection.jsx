import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'

const HeroSection = () => {
    const {navigate,getToken,axios,setSearchedCities} = useAppContext()
    const [destination,setDestination] = useState('')
  return (
    <div>HeroSection</div>
  )
}

export default HeroSection