// this helper function checks whether two elements are touching
// the code has already been provided
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

  // make the fries appear at a random place inside the window
  moveFries();

  // add an event for a keyup, then
  // (instead of attaching this event to the 2 selected elements)
  // attach event to the window so we can use the keys anywhere.
  // in most browsers arrow keys are not considered as keypresses
  // so instead of a "keypress" event, we listen for a "keyup" or "keydown"
  window.addEventListener("keydown", function(e) {
    // console.log(e.key);

    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    // according to MDN, Internet Explorer, Edge (16 and earlier),
    // and Firefox (36 and earlier) use "Left", "Right", "Up", and "Down"
    // instead of "ArrowLeft", "ArrowRight", "ArrowUp", and "ArrowDown",
    // so we need to account for those as well.
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
      // change the direction in which the hydra is facing when moving horizontally
      hydra.style.transform = "scale(1,1)";
    } else if (e.key === "ArrowLeft" || e.key === "Left" || e.keyCode === 65) {
      moveHorizontal(hydra, -50);
      // flip the image by passing scale -1 on the x axis
      hydra.style.transform = "scale(-1,1)";
    }
    // in case the two elements are touching, move fries into a new random position
    // thus creating a never-ending, relentless pursuit of the frenchiest fry,
    // which can be interpreted as an analogy of an unfullfilled life,
    // where at some point one eventually needs to stop to reevaluate what is
    // truly important in life and feel gratitude for what it has achieved.
    if (isTouching(hydra, fries)) moveFries();
  });
};

/* move hydra and fries by adjusting two CSS properties: top and left */
const moveVertical = (element, amount) => {
  // calculate the current top value
  const currTop = extractPos(element.style.top);
  // we have to specify the value in a string format
  // we want to add the distance from the top in pixels
  // example:
  // element.style.top = current top value = "200px",
  // + amount of pixels to move "50px"
  // calculate it by using a template literal
  // add "px" then reassign the calculated value
  element.style.top = `${currTop + amount}px`;
};
const moveHorizontal = (element, amount) => {
  const currLeft = extractPos(element.style.left);
  element.style.left = `${currLeft + amount}px`;
};

// extract the number value of the CSS position property
const extractPos = pos => {
  // initially element.style.top is an empty string (falsy value)
  // so to work with it, default its position to 100
  // to match it with the initial top value
  if (!pos) return 100;
  // since the position is in a format of "200px"
  // in order to be able to perform calculations with it
  // the format needs to be changed:
  // remove "px" from the end of the string,
  // by using slice to get rid of the last 2 characters
  // then turn into a number format
  return parseInt(pos.slice(0, -2));
};

const moveFries = () => {
  // pick random position to move the image of fries to
  const x = Math.floor(Math.random() * window.innerWidth) / 1.1;
  const y = Math.floor(Math.random() * window.innerHeight) / 1.1;
  fries.style.top = `${y}px`;
  fries.style.left = `${x}px`;
};

init();
