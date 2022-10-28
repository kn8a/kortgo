import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Bookings(props) {
  const upcomingURL = `${process.env.REACT_APP_API_URL}/bookings/upcoming`
  const [upcoming, setUpcoming] = useState([])

  console.log(props.loggedIn.token)
  
  useEffect(() => {
    axios.get(upcomingURL,  { headers: { Authorization: `Bearer ${props.loggedIn.token}` } })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  })

  return (
    <div>Bookings</div>
  )
}

export default Bookings