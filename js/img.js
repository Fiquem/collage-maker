var img_list = []
var canvas_default_w = 200;
var canvas_default_h = 200;
var img_poss = []
var moving = false;
var last_x = 0;
var last_y = 0;

function clear_canvas() {
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = canvas_default_w;
	canvas.height = canvas_default_h;
}

function clear_images() {
	clear_canvas();
	const main = document.querySelector('main')
	main.innerHTML = "";
	img_list = [];
}

function draw(canvas, ctx) {
	for (let i = 0; i < img_list.length; i++) {
		collage_image = new Image();
		collage_image.src = img_list[i].src;
		ctx.drawImage(collage_image, img_poss[i][0], img_poss[i][1]);
	}
}

function init() {
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');
	canvas.width = canvas_default_w;
	canvas.height = canvas_default_h;

	canvas.addEventListener('mousedown', function(event) {
		// console.log("mousedown")
		moving = true;
		last_x = event.offsetX;
		last_y = event.offsetY;
	}, false);
	canvas.addEventListener('mouseup', function(event) {
		// console.log("mouseup")
		moving = false;
	}, false);
	canvas.addEventListener('mousemove', function(event) {
		// console.log("mousemove")
		if (moving) {
			let diff_x = event.offsetX - last_x;
			diff_y = event.offsetY - last_y;
			if (img_poss.length > 0) {
				img_poss[0][0] += diff_x;
				img_poss[0][1] += diff_y;
			}
			last_x = event.offsetX;
			last_y = event.offsetY;
			draw(canvas, ctx);
		}
	}, false);
}

function submit_images() {
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');


	var img_num = img_list.length;
	var canvas_w = 0;
	var canvas_h = 0;
	for (let i = 0; i < img_num; i++) {
		img_poss.push([canvas_w, 0]);
		canvas_w += img_list[i].width;
		if (canvas_h < img_list[i].height) {canvas_h = img_list[i].height;}
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