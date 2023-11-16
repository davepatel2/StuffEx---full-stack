import React from 'react'
import ReactDOMClient from 'react-dom/client'
import MyApp from './MyApp'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')

// Create a root
const root = ReactDOMClient.createRoot(container)

// Initial render:
root.render(
  <BrowserRouter>
    <MyApp />
  </BrowserRouter>
)
