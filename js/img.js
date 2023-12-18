var img_list = []

function clear_canvas(canvas, ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clear_images() {
	const main = document.querySelector('main')
	main.innerHTML = "";
	img_list = [];
}

function draw(canvas, ctx) {
	for (let i = 0; i < img_list.length; i++) {
		collage_image = new Image();
		collage_image.src = img_list[i].src;
		if (i == 0) {
			ctx.drawImage(collage_image, 0, 0);
		} else {
			ctx.drawImage(collage_image, img_list[i-1].width, img_list[i-1].height);
		}
	}
}

function submit_images() {
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');


	var img_num = img_list.length;
	var canvas_w = 0;
	var canvas_h = 0;
	for (let i = 0; i < img_num; i++) {
		canvas_w += img_list[i].width;
		canvas_h += img_list[i].height;
		console.log(canvas_w);
	}

	canvas.width = canvas_w;
	canvas.height = canvas_h;

	draw(canvas, ctx);
}

function display_img(img) {
	var reader = new FileReader();

	reader.onload = function (e) {
		var image = document.createElement('img');
		image.src = e.target.result;
		img_list.push(image);

		var preview_image = document.createElement('img');
		preview_image.setAttribute('class', 'upload-preview');
		preview_image.src = e.target.result;
		const main = document.querySelector('main');
		main.appendChild(preview_image);
	}

	reader.readAsDataURL(img.files[0])
}