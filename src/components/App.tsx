import React, { useState, useEffect, useCallback } from 'react'
import { useStateValue } from '../store'
import { Howl } from 'howler'

import { ThemeBar } from './ThemeBar'
import { CardList } from './CardList'
import { Fireworks } from './Fireworks'
import { getThemes } from '../themes'

import soundFlipSrc from '../audio/plunger-pop.mp3'
import soundCorrectSrc from '../audio/correct.mp3'
import soundIncorrectSrc from '../audio/incorrect.mp3'
import soundWonSrc from '../audio/fanfare.mp3'

export const App = () => {
  const [{ cards }, dispatch] = useStateValue() as Array<any>
  const [theme, setTheme] = useState(0)
  const [gamePaused, setGamePaused] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [cardSetArray, setCardSetArray] = useState<Array<string | undefined>>([])
  const [gameArray, setGameArray] = useState<Array<string | undefined>>([])
  const themes = getThemes()

  const sfx = {
    soundFlip: new Howl({
      src: [soundFlipSrc],
    }),
    soundcorrect: new Howl({
      src: [soundCorrectSrc],
    }),
    soundIncorrect: new Howl({
      src: [soundIncorrectSrc],
    }),
    soundWon: new Howl({
      src: [soundWonSrc],
    }),
  }

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

      setTimeout(() => {
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

    sfx.soundFlip.play()

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

        setTimeout(() => {
          sfx.soundcorrect.play()

          // animate matching cards
          dispatch({
            type: 'matchCard',
            theme,
            matchingSet: cardSet,
          })
        }, 500)

        setCardSetArray([])

        setTimeout(() => {
          setGamePaused(false)
        }, 1000)
      } else {
        // no match
        setCardSetArray([])

        setTimeout(() => {
          sfx.soundIncorrect.play()
        }, 500)
        setTimeout(resetCards, 1000)
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

  useEffect(() => {
    shuffleCards()
  }, [shuffleCards, theme])

  // useEffect(() => {
  //   if (cardSetArray.length || gameArray.length) {
  //     setGameStarted(true)
  //   } else {
  //     setGameStarted(false)
  //   }
  // }, [gameArray, cardSetArray])

  useEffect(() => {
    if (gameArray.length === 6) {
      setGamePaused(true)

      setTimeout(() => {
        setGameFinished(true)
        sfx.soundWon.play()
      }, 1000)

      setTimeout(() => {
        dispatch({
          type: 'resetAllCards',
          theme,
        })
        setGameArray([])
        setGameFinished(false)
      }, 6000)

      setTimeout(() => {
        shuffleCards()
        setGamePaused(false)
      }, 6500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameArray, theme])

  return (
    <div className={`App ${themes[theme].name}`}>
      <ThemeBar themes={themes} theme={theme} clickHandler={themeBtnClickHandler} />
      <CardList cards={cards[theme]} clickHandler={cardClickHandler} />
      <Fireworks running={gameFinished} />
    </div>
  )
}
