// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import { FetchRequest } from "@rails/request.js"

const reviewText = document.getElementById("review-text");
reviewText.addEventListener("keyup", (e) => {
	const data = {
		review: 'Hello, world!',
	}

	const opts = {
		body: JSON.stringify(data),
	}

	const request = new FetchRequest('post', '/review', opts);
  request.perform().then(response => {
		console.log(response.data);
	});
});
