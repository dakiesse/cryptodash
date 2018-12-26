import React, { Component } from 'react'
import AppProvider from './AppProvider'
import AppLayout from './AppLayout'
import Content from '../Shared/Content'
import AppBar from './AppBar'
import Settings from '../Settings'
import Dashboard from '../Dashboard'
import './App.css'

class Index extends Component {
  render () {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar/>
          <Content>
            <Settings/>
            <Dashboard/>
          </Content>
        </AppProvider>
      </AppLayout>
    )
  }
}

export default Index
