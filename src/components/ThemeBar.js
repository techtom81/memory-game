import { ThemeSelect } from './ThemeSelect'

export const ThemeBar = ({ themes, theme, gameStarted, clickHandler }) => (
  <div className="theme-btn-wrapper">
    {themes.map(({ id, logo, name }) => (
      <ThemeSelect
        key={id}
        id={id}
        logo={logo}
        themeName={name}
        disabled={gameStarted}
        theme={theme}
        clickHandler={clickHandler}
      />
    ))}
  </div>
)
