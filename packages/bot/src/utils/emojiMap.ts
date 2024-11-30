const emojiMap = {
  success: '✅',
  successAlt: '✔️',
  error: '❌',
  errorAlt: '🚫',
  link: '🔗',
  alien: '👽',
  planet: '🪐',
  moon: '🌙',
  galaxy: '🌌',
  comet: '☄️',
  rocket: '🚀',
  ufo: '🛸',
  star: '✦',
  audio: '🔉',
  audioAlt: '🔊',
  music: '🎵',
  musicAlt: '🎶',
};

export function getRandomEmoji() {
  const { alien, planet, moon, galaxy, comet, rocket, ufo } = emojiMap;
  const emojiList = [alien, planet, moon, galaxy, comet, rocket, ufo];

  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export default emojiMap;
