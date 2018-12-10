import React, { Component } from 'react'
import AppLayout from './AppLayout'
import AppBar from './AppBar'
import Settings from '../Settings'
import './App.css'
import { AppProvider } from './AppProvider'

class Index extends Component {
  render () {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar/>
          <Settings/>
        </AppProvider>
      </AppLayout>
    )
  }
}

export default Index
