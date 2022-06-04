import React from 'react'
import { render } from 'react-dom'
import { StateProvider, initialState } from './store'
import { reducer } from './reducers'
import './scss/index.scss'
import { App } from './components/App'

render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
