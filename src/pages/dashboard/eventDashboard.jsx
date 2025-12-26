import React, { useState } from 'react'
import Nav from '../../components/nav/nav'
import Footer from '../../components/footer/footer'
import Dashboard from './dashboard'

const EventDashboard = () => {
  const [orders, setOrders] = useState([])

  
  return (
    <>
      <Nav />
      <Dashboard orders={orders} />
      <Footer />
    </>
  )
}

export default EventDashboard