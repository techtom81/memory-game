// import React from 'react'
import { reducer } from './reducers'
import { mockFrozenAllFlippedState, mockFrozenState } from './fixtures'

describe('reducer()', () => {
  it('updates the state correctly with the toggleCard action', () => {
    const state = reducer(mockFrozenState, {
      type: 'toggleCard',
      cardIndex: 0,
      theme: 0,
      flipped: true,
    })

    expect(state.cards[0][0].id).toEqual(2)
    expect(state.cards[0][0].cardFlipped).toEqual(true)
  })

  it('updates the state correctly with the matchCard action', () => {
    const state = reducer(mockFrozenState, {
      type: 'matchCard',
      theme: 0,
      matchingSet: 'c',
    })

    expect(state.cards[0][0].cardMatched).toEqual(true)
  })

  it('updates the state correctly with the resetCards action', () => {
    const state = reducer(mockFrozenState, {
      type: 'resetCards',
      theme: 0,
      value: ['b'],
    })

    expect(state.cards[0][1].cardFlipped).toEqual(true) // set 'b'
    expect(state.cards[0][2].cardFlipped).toEqual(false) // set 'a'
    expect(state.cards[0][3].cardFlipped).toEqual(false) // set 'f'
  })

  it('updates the state correctly with the resetAllCards action', () => {
    const state = reducer(mockFrozenAllFlippedState, {
      type: 'resetAllCards',
      theme: 0,
    })

    for (const card of state.cards[0]) {
      expect(card.cardFlipped).toEqual(false)
      expect(card.cardMatched).toEqual(false)
    }
  })

  it('updates the state correctly with the shuffleCards action', () => {
    const state = reducer(mockFrozenState, {
      type: 'shuffleCards',
      theme: 0,
    })

    expect(state).not.toEqual(mockFrozenState)
  })

  it('returns the state unmodified when the action is not matched', () => {
    const state = reducer(mockFrozenState, {
      type: 'madeUpAction',
      theme: 0,
    })

    expect(state).toEqual(mockFrozenState)
  })
})
