import React, { useState, useEffect, useCallback, useRef } from 'react'

import { useStateValue } from '../store'
import { ThemeBar } from './ThemeBar/ThemeBar'
import { CardList } from './CardList/CardList'
import { Fireworks } from './Fireworks'
import { getThemes } from '../themes'
import { sfx } from '../audio'

export const App = () => {
  const [{ cards }, dispatch] = useStateValue() as Array<any>
  const [theme, setTheme] = useState(0)
  const [gamePaused, setGamePaused] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [cardSetArray, setCardSetArray] = useState<Array<string | undefined>>([])
  const [gameArray, setGameArray] = useState<Array<string | undefined>>([])
  const [allPairsMatched, setAllPairsMatched] = useState(false)
  const gameFinishedTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const resetGameTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const shuffleCardsTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const matchCardTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const pauseGameTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const incorrectSoundTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const resetCardsTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const setThemeTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const themes = getThemes()
  const { soundFlip, soundCorrect, soundIncorrect, soundWon } = sfx

  const themeBtnClickHandler = (event: { currentTarget: HTMLButtonElement }) => {
    const btn = event.currentTarget
    const themeSelected = Number(btn.id)

    if (gamePaused || themeSelected === theme) return false

    if (gameArray.length || cardSetArray.length) {
      setCardSetArray([])
      setGameArray([])

      dispatch({
        type: 'resetAllCards',
        theme,
      })

      clearTimeout(setThemeTimerRef.current)

      setThemeTimerRef.current = setTimeout(() => {
        setTheme(themeSelected)
      }, 350)
    } else {
      setTheme(themeSelected)
    }
  }

  const cardClickHandler = (event: { currentTarget: HTMLButtonElement }) => {
    if (gamePaused) return false

    const card = event.currentTarget
    const cardId = Number(card.id)
    const cardSet: any = card.dataset.set
    const cardIndex = cards[theme].findIndex((card: { id: number }) => card.id === cardId)

    if (cards[theme][cardIndex].cardFlipped) return false

    soundFlip.play()

    dispatch({
      type: 'toggleCard',
      theme,
      cardIndex,
      flipped: true,
    })

    if (cardSetArray.length) {
      setGamePaused(true)

      if (cardSetArray.includes(cardSet)) {
        // match found
        setGameArray(prevCardSet => [...prevCardSet, cardSet])
        clearTimeout(matchCardTimerRef.current)

        matchCardTimerRef.current = setTimeout(() => {
          soundCorrect.play()

          // animate matching cards
          dispatch({
            type: 'matchCard',
            theme,
            matchingSet: cardSet,
          })
        }, 500)

        setCardSetArray([])
        clearTimeout(pauseGameTimerRef.current)

        pauseGameTimerRef.current = setTimeout(() => {
          setGamePaused(false)
        }, 1000)
      } else {
        // no match
        setCardSetArray([])
        clearTimeout(incorrectSoundTimerRef.current)

        incorrectSoundTimerRef.current = setTimeout(() => {
          soundIncorrect.play()
        }, 500)

        clearTimeout(resetCardsTimerRef.current)
        resetCardsTimerRef.current = setTimeout(resetCards, 1000)
      }
    } else {
      setCardSetArray(cardSet)
    }
  }

  const resetCards = () => {
    dispatch({
      type: 'resetCards',
      value: gameArray,
      theme,
    })

    setGamePaused(false)
  }

  const shuffleCards = useCallback(() => {
    dispatch({
      type: 'shuffleCards',
      theme,
    })
  }, [dispatch, theme])

  const handleGameFinished = useCallback(() => {
    setGamePaused(true)

    gameFinishedTimerRef.current = setTimeout(() => {
      setGameFinished(true)
      soundWon.play()
    }, 1000)

    resetGameTimerRef.current = setTimeout(() => {
      dispatch({
        type: 'resetAllCards',
        theme,
      })
      setGameArray([])
      setGameFinished(false)
    }, 6000)

    shuffleCardsTimerRef.current = setTimeout(() => {
      shuffleCards()
      setGamePaused(false)
      setAllPairsMatched(false)
    }, 6500)
  }, [dispatch, shuffleCards, soundWon, theme])

  useEffect(() => {
    shuffleCards()
  }, [shuffleCards, theme])

  useEffect(() => {
    if (gameArray.length === cards[theme].length / 2) {
      setAllPairsMatched(true)
    }
  }, [cards, gameArray.length, theme])

  useEffect(() => {
    if (allPairsMatched) {
      handleGameFinished()
    }

    return () => {
      clearTimeout(gameFinishedTimerRef.current)
      clearTimeout(resetGameTimerRef.current)
      clearTimeout(shuffleCardsTimerRef.current)
    }
  }, [allPairsMatched, handleGameFinished])

  return (
    <div className={`App ${themes[theme].name}`}>
      <ThemeBar themes={themes} theme={theme} clickHandler={themeBtnClickHandler} />
      <CardList cards={cards[theme]} clickHandler={cardClickHandler} />
      <Fireworks running={gameFinished} />
    </div>
  )
}
