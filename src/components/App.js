import React, { useState, useEffect } from 'react';
import { useStateValue } from '../store';
import Card from './Card';
import ThemeSelect from './ThemeSelect';
import MyConfetti from './MyConfetti';
import { useAudio } from 'react-use';

const App = () => {
    const [{ themes, cards }, dispatch] = useStateValue();

    const [theme, setTheme] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [cardSetArray, setCardSetArray] = useState([]);
    const [gameArray, setGameArray] = useState([]);
    const [audio, state, controls, ref] = useAudio({});

    const soundFlip = '/audio/plunger-pop.mp3';
    const soundIncorrect = '/audio/incorrect.mp3';
    const soundCorrect = '/audio/correct.mp3';

    function themeBtnClickHandler(e) {
        if (gamePaused || gameStarted) return false;

        const btn = e.currentTarget;
        setTheme(Number(btn.id));
    }

    function cardClickHandler(e) {
        if (gamePaused) return false;

        const card = e.currentTarget;
        const cardId = Number(card.id);
        const cardSet = card.dataset.set;
        const cardIndex = cards[theme].findIndex((card) => card.id === cardId);

        if (cards[theme][cardIndex].cardFlipped) return false;

        ref.current.src = soundFlip;
        controls.play();

        dispatch({
            type: 'toggleCard',
            theme,
            cardIndex,
            flipped: true,
        });

        if (cardSetArray.length > 0) {
            setGamePaused(true);

            if (cardSetArray.includes(cardSet)) {
                // match found
                setGameArray((prevCardSet) => [...prevCardSet, cardSet]);

                setTimeout(() => {
                    ref.current.src = soundCorrect;
                    controls.play();

                    // animate matching cards
                    dispatch({
                        type: 'matchCard',
                        theme,
                        matchingSet: cardSet,
                    });
                }, 500);

                setCardSetArray([]);

                setTimeout(() => {
                    setGamePaused(false);
                }, 1000);
            } else {
                // no match
                setCardSetArray([]);

                setTimeout(() => {
                    ref.current.src = soundIncorrect;
                    controls.play();
                }, 500);
                setTimeout(resetCards, 1000);
            }
        } else {
            setCardSetArray(cardSet);
        }
    }

    const resetCards = () => {
        dispatch({
            type: 'resetCards',
            value: gameArray,
            theme,
        });

        setGamePaused(false);
    };

    const shuffleCards = () => {
        dispatch({
            type: 'shuffleCards',
            theme,
        });
    };

    useEffect(() => {
        shuffleCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    useEffect(() => {
        if (cardSetArray.length > 0 || gameArray.length > 0) {
            setGameStarted(true);
        } else {
            setGameStarted(false);
        }
    }, [gameArray, cardSetArray]);

    useEffect(() => {
        if (gameArray.length === 6) {
            setGamePaused(true);
            setGameWon(true);
            setTimeout(() => {
                dispatch({
                    type: 'resetAllCards',
                    theme,
                });
                setGameArray([]);
                setGameWon(false);
            }, 4500);

            setTimeout(() => {
                shuffleCards();
                setGamePaused(false);
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameArray, theme]);

    return (
        <div className={'App ' + themes[theme].name}>
            <div className="theme-btn-wrapper">
                {themes.map((x) => (
                    <ThemeSelect
                        key={x.id}
                        id={x.id}
                        logo={x.logo}
                        themeName={x.name}
                        disabled={gameStarted}
                        theme={theme}
                        clickHandler={themeBtnClickHandler}
                    />
                ))}
            </div>
            <div className="container">
                {audio}
                <MyConfetti dropRate={gameWon ? 200 : 0} />
                {cards[theme].map((x) => (
                    <Card
                        key={x.id}
                        backSrc={x.backSrc}
                        frontSrc={x.frontSrc}
                        set={x.set}
                        id={x.id}
                        cardFlipped={x.cardFlipped}
                        cardMatched={x.cardMatched}
                        clickHandler={cardClickHandler}
                        audio={controls.play}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
