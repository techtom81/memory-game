import React, { createContext, useReducer, useContext } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const initialState = {
    themes: [
        { id: 0, name: 'frozen', logo: './images/frozen/frozen.png' },
        { id: 1, name: 'lego', logo: './images/lego/red-brick.png' },
    ],
    cards: [
        [
            {
                id: 0,
                set: 'a',
                cardFlipped: false,
                frontSrc: `./images/frozen/olaf.png`,
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 1,
                set: 'a',
                cardFlipped: false,
                frontSrc: `./images/frozen/olaf.png`,
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 2,
                set: 'b',
                cardFlipped: false,
                frontSrc: './images/frozen/anna.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 3,
                set: 'b',
                cardFlipped: false,
                name: 'olaf xmas',
                frontSrc: './images/frozen/anna.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 4,
                set: 'c',
                cardFlipped: false,
                frontSrc: './images/frozen/elsa.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 5,
                set: 'c',
                cardFlipped: false,
                frontSrc: './images/frozen/elsa.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 6,
                set: 'd',
                cardFlipped: false,
                frontSrc: './images/frozen/kristof.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 7,
                set: 'd',
                cardFlipped: false,
                frontSrc: './images/frozen/kristof.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 8,
                set: 'e',
                cardFlipped: false,
                frontSrc: './images/frozen/olaf-xmas.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 9,
                set: 'e',
                cardFlipped: false,
                frontSrc: './images/frozen/olaf-xmas.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 10,
                set: 'f',
                cardFlipped: false,
                frontSrc: './images/frozen/sven.png',
                backSrc: './images/frozen/frozen.png',
            },
            {
                id: 11,
                set: 'f',
                cardFlipped: false,
                frontSrc: './images/frozen/sven.png',
                backSrc: './images/frozen/frozen.png',
            },
        ],
        [
            {
                id: 0,
                set: 'a',
                cardFlipped: false,
                frontSrc: './images/lego/batman.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 1,
                set: 'a',
                cardFlipped: false,
                frontSrc: './images/lego/batman.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 2,
                set: 'b',
                cardFlipped: false,
                frontSrc: './images/lego/wonderwomen.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 3,
                set: 'b',
                cardFlipped: false,
                name: 'olaf xmas',
                frontSrc: './images/lego/wonderwomen.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 4,
                set: 'c',
                cardFlipped: false,
                frontSrc: './images/lego/captainamerica.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 5,
                set: 'c',
                cardFlipped: false,
                frontSrc: './images/lego/captainamerica.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 6,
                set: 'd',
                cardFlipped: false,
                frontSrc: './images/lego/robin.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 7,
                set: 'd',
                cardFlipped: false,
                frontSrc: './images/lego/robin.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 8,
                set: 'e',
                cardFlipped: false,
                frontSrc: './images/lego/spiderman.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 9,
                set: 'e',
                cardFlipped: false,
                frontSrc: './images/lego/spiderman.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 10,
                set: 'f',
                cardFlipped: false,
                frontSrc: './images/lego/superman.png',
                backSrc: './images/lego/red-brick.png',
            },
            {
                id: 11,
                set: 'f',
                cardFlipped: false,
                frontSrc: './images/lego/superman.png',
                backSrc: './images/lego/red-brick.png',
            },
        ],
    ],
};
