// Use class to interact with DOM elements

// A constructor function gets called immediately
// whenever we create a new instance of a class

// inside the constructor, first we create references to the DOM elements so our class has a way to handle them.

class Timer {
	constructor(durationInput, startButton, pauseButton) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		// bind event listener to previously referenced DOM element
		this.startButton.addEventListener("click", this.start);
	}

	// define method inside class
	start() {
		console.log("Time to start the timer!");
	}
}

// 1. create actual elements in HTML
// 2. select elements using querySelector

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

// 3. create Timer instance
const timer = new Timer(durationInput, startButton, pauseButton);

// now that we have created our timer instance, the class Timer will instantiate/bind the event listener automatically
