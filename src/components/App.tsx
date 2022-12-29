import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getThemes } from '../themes'
import { MemoryGame } from './MemoryGame/MemoryGame'
import { ThemeBar } from './ThemeBar/ThemeBar'

export const App = () => {
  const themes = getThemes()
  const navigate = useNavigate()

  const themeBtnClickHandler = (event: { currentTarget: HTMLButtonElement }) => {
    const btn = event.currentTarget
    const themeSelected = Number(btn.id)
    const route = `/memory/${themeSelected}`
    navigate(route)
  }

  return (
    <Routes>
      <Route path="*" element={<ThemeBar themes={themes} clickHandler={themeBtnClickHandler} />} />
      <Route path="/memory/:themeId" element={<MemoryGame />} />
    </Routes>
  )
}
