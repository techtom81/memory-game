import { Howl } from 'howler'

import soundFlipSrc from '../audio/plunger-pop.mp3'
import soundCorrectSrc from '../audio/correct.mp3'
import soundIncorrectSrc from '../audio/incorrect.mp3'
import soundWonSrc from '../audio/fanfare.mp3'

export const sfx = {
  soundFlip: new Howl({
    src: [soundFlipSrc],
  }),
  soundCorrect: new Howl({
    src: [soundCorrectSrc],
  }),
  soundIncorrect: new Howl({
    src: [soundIncorrectSrc],
  }),
  soundWon: new Howl({
    src: [soundWonSrc],
  }),
}
