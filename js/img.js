var img_list = []

function clear_images() {
	const main = document.querySelector('main')
	main.innerHTML = "";
	img_list = [];
}

function submit_images() {
	// const canvas = document.createElement('canvas');
	// canvas.setAttribute('class', 'collage');
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');
	collage_image = new Image();
	collage_image.src = img_list[0].src;
	ctx.drawImage(collage_image, 0, 0);
}

function display_img(img) {
	var reader = new FileReader();

	reader.onload = function (e) {
		var image = document.createElement('img');
		image.setAttribute('class', 'upload-preview');
		image.src = e.target.result;
		const main = document.querySelector('main');
		main.appendChild(image);
		img_list.push(image);
	}

	reader.readAsDataURL(img.files[0])
}