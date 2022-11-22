const Refs = {
  bodyRef: document.querySelector('body'),
  startButtonRef: document.querySelector('button[data-start]'),
  stopButtonRef: document.querySelector('button[data-stop]'),
};

const COLOR = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

Refs.bodyRef.getAttribute('background-color');
// Refs.bodyRef.hasAttribute('backgroundColor');
console.log(Refs.bodyRef.getAttribute('background-color'));
