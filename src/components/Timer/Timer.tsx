import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from './Timer.module.scss'

export const Timer = ({ timerStarted }: { timerStarted: boolean }) => {
  const frameIdRef = useRef<ReturnType<typeof requestAnimationFrame>>(0)
  const startRef = useRef<undefined | number>()
  const [milliSeconds, setmilliSeconds] = useState<string>('0')
  const [seconds, setSeconds] = useState<string>('00')
  const [minutes, setMinutes] = useState<string>('0')

  const tick = useCallback((timeStamp: DOMHighResTimeStamp) => {
    if (startRef.current === undefined) {
      startRef.current = timeStamp
    }
    const elapsed = timeStamp - startRef.current
    setmilliSeconds(Math.floor((elapsed / 100) % 10).toString())
    setSeconds(
      Math.floor((elapsed / 1000) % 60)
        .toString()
        .padStart(2, '0')
    )
    setMinutes(Math.floor(((elapsed / 1000) % 3600) / 60).toString())
    frameIdRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const startTimer = () => {
      frameIdRef.current = requestAnimationFrame(tick)
    }

    const stopTimer = () => {
      cancelAnimationFrame(frameIdRef.current)
      startRef.current = undefined
    }

    if (timerStarted) {
      startTimer()
    } else {
      stopTimer()
    }

    return () => {
      cancelAnimationFrame(frameIdRef.current)
    }
  }, [tick, timerStarted])

  return (
    <div className={styles.timer}>
      <span className={styles.minutes}>{minutes}</span>:<span>{seconds}</span>:
      <span className={styles.milliSeconds}>{milliSeconds}</span>
    </div>
  )
}
