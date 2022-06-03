import React from 'react'

export const ThemeSelect = React.memo(({ id, disabled, clickHandler, logo, theme, themeName }) => {
  return (
    <button
      className={'theme-select-btn' + (id === theme ? ' is-active' : '')}
      id={id}
      disabled={disabled}
      onClick={clickHandler}>
      <img src={logo} alt={themeName} draggable="false" />
    </button>
  )
})
