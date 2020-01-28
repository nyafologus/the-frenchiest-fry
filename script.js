// this logic has already been provided

function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const init = () => {
  // select both items by their id
  const hydra = document.querySelector("#hydra");
  const fries = document.querySelector("#fries");
  moveFries();
  // add an event for a keyup
  // attach this event to the window instead of the 2 selected elements, so we can use the keys anywhere

  // in most browsers arrow keys are not considered as keypresses
  // so instead of a "keypress" event, we listen for a "keyup"
  window.addEventListener("keydown", function(e) {
    console.log(e.key);
    if (e.key === "ArrowDown" || e.key === "Down" || e.keyCode === 83) {
      moveVertical(hydra, 50);
    } else if (e.key === "ArrowUp" || e.key === "Up" || e.keyCode === 87) {
      moveVertical(hydra, -50);
    } else if (
      e.key === "ArrowRight" ||
      e.key === "Right" ||
      e.keyCode === 68
    ) {
      moveHorizontal(hydra, 50);
      hydra.style.transform = "scale(1,1)";
    } else if (e.key === "ArrowLeft" || e.key === "Left" || e.keyCode === 65) {
      moveHorizontal(hydra, -50);
      hydra.style.transform = "scale(-1,1)";
    }
    if (isTouching(hydra, fries)) moveFries();
  });
};

/* move hydra and fries by adjusting two CSS properties: top and left */
const moveVertical = (element, amount) => {
  const currTop = extractPos(element.style.top);
  element.style.top = `${currTop + amount}px`;
};
const moveHorizontal = (element, amount) => {
  const currLeft = extractPos(element.style.left);
  element.style.left = `${currLeft + amount}px`;
};

const extractPos = pos => {
  if (!pos) return 100;
  return parseInt(pos.slice(0, -2));
};

const moveFries = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  fries.style.top = `${y}px`;
  fries.style.left = `${x}px`;
};

init();
