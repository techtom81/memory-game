export const reducer = (state: any, action: any) => {
  const { type, theme, cardIndex, flipped, matchingSet, value }: ActionProps = action

  const cardsArray = [...state.cards]
  const cardTheme = [...state.cards[theme]]

  switch (type) {
    case 'toggleCard':
      cardTheme[cardIndex].cardFlipped = flipped
      cardsArray[theme] = cardTheme

      return {
        ...state,
        cards: cardsArray,
      }
    case 'matchCard':
      cardTheme.forEach(card => {
        if (card.set === matchingSet) card.cardMatched = true
      })

      cardsArray[theme] = cardTheme

      return {
        ...state,
        cards: cardsArray,
      }
    case 'resetCards':
      cardTheme.forEach(card => {
        if (!value.includes(card.set)) card.cardFlipped = false
      })
      cardsArray[theme] = cardTheme

      return {
        ...state,
        cards: cardsArray,
      }
    case 'resetAllCards':
      cardTheme.forEach(card => {
        card.cardFlipped = false
        card.cardMatched = false
      })

      cardsArray[theme] = cardTheme

      return {
        ...state,
        cards: cardsArray,
      }

    case 'shuffleCards':
      const randomizeCards = (array: CardProps[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
      }

      cardsArray[theme] = randomizeCards(cardTheme)

      return {
        ...state,
        cards: cardsArray,
      }

    default:
      return state
  }
}

type ActionProps = {
  type: string
  theme: number
  cardIndex: number
  flipped: boolean
  matchingSet: boolean
  value: [CardProps]
}

type CardProps = {
  id: string
  set: string
  cardFlipped: boolean
  cardMatched: boolean
  backSrc: string
  frontSrc: string
}
