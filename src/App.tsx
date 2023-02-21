import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navigation from './components/navigation'

function App(): JSX.Element {
  return (
    <div className="App">
		<Navigation/>
		<Outlet/>
    </div>
  )
}

export default App
