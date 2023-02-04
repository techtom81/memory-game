import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'

import styles from './Fireworks.module.scss'

const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const getAnimationSettings = (originXA: number, originXB: number) => {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 70,
    zIndex: 0,
    particleCount: 150,
    scalar: 1.2,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  }
}

export const Fireworks = ({ running }: { running: boolean }) => {
  const refAnimationInstance = useRef<null | any>(null)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>()

  const getInstance = (instance: any) => {
    refAnimationInstance.current = instance
  }

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3))
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9))
    }
  }, [])

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400))
    }
  }, [intervalId, nextTickAnimation])

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId)
    setIntervalId(undefined)
    console.log(refAnimationInstance.current)
    refAnimationInstance.current && refAnimationInstance.current.reset()
  }, [intervalId])

  useEffect(() => {
    if (running) {
      startAnimation()
    } else {
      stopAnimation()
    }
  }, [running, startAnimation, stopAnimation])

  useEffect(() => {
    return () => {
      clearInterval(intervalId)
    }
  }, [intervalId])

  return <ReactCanvasConfetti refConfetti={getInstance} className={styles.confettiCanvas} />
}
