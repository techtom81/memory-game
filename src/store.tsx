import React, { createContext, useReducer, useContext } from 'react'

import { getThemes } from './themes'
export const StateContext = createContext({})

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: any
  initialState: any
  children: any
}) => <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>

export const useStateValue = () => useContext(StateContext)

const mapCardsState = () => {
  const cardSet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const imageRoot = './images/themes'
  const themes = getThemes()

  return themes.map(({ name, grid }: { name: string; grid: number }) => {
    const halfCardsIndex = grid / 2 - 1
    let themeCards = []

    for (let i = 0; i < grid; i++) {
      themeCards.push({
        id: i,
        set: i > halfCardsIndex ? cardSet[i - (halfCardsIndex + 1)] : cardSet[i],
        cardFlipped: false,
        cardMatched: false,
        frontSrc: `${imageRoot}/${name}/card-${i > halfCardsIndex ? i - (halfCardsIndex + 1) : i}.png`,
        backSrc: `${imageRoot}/${name}/${name}.png`,
      })
    }

    return themeCards
  })
}

export const initialState = {
  cards: mapCardsState(),
}
