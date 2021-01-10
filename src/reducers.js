export const reducer = (state, action) => {
    const cardsArray = [...state.cards];
    const cardTheme = [...state.cards[action.theme]];

    switch (action.type) {
        case 'toggleCard':
            cardTheme[action.cardIndex].cardFlipped = action.flipped;
            cardsArray[action.theme] = cardTheme;

            return {
                ...state,
                cards: cardsArray,
            };
        case 'resetCards':
            cardTheme.forEach((card) => {
                if (!action.value.includes(card.set)) card.cardFlipped = false;
            });
            cardsArray[action.theme] = cardTheme;

            return {
                ...state,
                cards: cardsArray,
            };
        case 'resetAllCards':
            cardTheme.forEach((card) => (card.cardFlipped = false));
            cardsArray[action.theme] = cardTheme;

            return {
                ...state,
                cards: cardsArray,
            };

        case 'shuffleCards':
            const randomizeCards = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            cardsArray[action.theme] = randomizeCards(cardTheme);

            return {
                ...state,
                cards: cardsArray,
            };

        default:
            return state;
    }
};
