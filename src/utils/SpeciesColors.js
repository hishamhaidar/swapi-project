function getRandomHex() {
  return Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
}

function getRandomColor() {
  const red = getRandomHex();
  const green = getRandomHex();
  const blue = getRandomHex();
  return `#${red}${green}${blue}`;
}

const speciesColors = {};

for (let id = 1; id <= 37; id++) {
  const speciesURL = `https://swapi.dev/api/species/${id}/`;
  const randomColor = getRandomColor();
  speciesColors[speciesURL] = randomColor;
}

export default speciesColors;
