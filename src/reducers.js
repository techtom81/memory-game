export const reducer = (state, action) => {
    const cardsArray = [...state.cards];

    switch (action.type) {
        case 'toggleCard':
            cardsArray[action.cardIndex].cardFlipped = action.flipped;

            return {
                ...state,
                cards: cardsArray,
            };
        case 'resetCards':
            cardsArray.forEach((card) => {
                if (!action.value.includes(card.set)) card.cardFlipped = false;
            });

            return {
                ...state,
                cards: cardsArray,
            };
        case 'resetAllCards':
            cardsArray.forEach((card) => (card.cardFlipped = false));

            return {
                ...state,
                cards: cardsArray,
            };

        case 'randomizeCards':
            const randomizeCards = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            return {
                ...state,
                cards: randomizeCards(cardsArray),
            };

        default:
            return state;
    }
};
