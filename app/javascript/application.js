// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import { FetchRequest } from "@rails/request.js"

const reviewText = document.getElementById("review-text");
const stars = document.getElementById("stars");

const emptyStar = "&#9734;";
const fullStar = "&#9733;";

function doUpdateStars(num) {
	let str = ""

	for (var i = 0; i < 5; i++) {
		if (i < num) {
			str += fullStar;
		} else {
			str += emptyStar;
		}
	}

	stars.innerHTML = str;
};

function clearStars() {
	let str = ""

	for (var i = 0; i < 5; i++) {
		str += emptyStar;
	}

	stars.innerHTML = str;
};

function setLoadingMessage(message) {
	stars.innerHTML = message;
}

function doCalculateStars(value) {
	const data = {
		review: value,
	}

	const opts = {
		body: JSON.stringify(data),
	}

	const request = new FetchRequest('post', '/review', opts);
  request.perform().then(res => {
		const response = res.response;
		return response.json();	
	}).then(data => {
		const stars = data.stars;
		doUpdateStars(stars);
	});
}

let timeout = null;
reviewText.addEventListener("keyup", (e) => {
	if (timeout) {
		window.clearTimeout(timeout);
	}

	timeout = window.setTimeout(() => {
		setLoadingMessage("Detecting...");

		if (reviewText.value) {
			doCalculateStars(reviewText.value);
		} else {
			clearStars();
		}
	}, 500);
});
