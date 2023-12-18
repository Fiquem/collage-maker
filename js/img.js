var img_list = []
var canvas_default_w = 200;
var canvas_default_h = 200;
var img_poss = []
var moving = false;
var last_x = 0;
var last_y = 0;
var collage_image_w = 200;
var collage_image_h = 200;
var collage_poss = [];
var moving_image = -1;

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

	img_list = []
	canvas_default_w = 200;
	canvas_default_h = 200;
	img_poss = []
	moving = false;
	last_x = 0;
	last_y = 0;
}

function draw(canvas, ctx) {
	for (let i = 0; i < img_list.length; i++) {
		collage_image = new Image();
		collage_image.src = img_list[i].src;
		// ctx.drawImage(collage_image, img_poss[i][0], img_poss[i][1]);
		ctx.drawImage(collage_image, img_poss[i][0], img_poss[i][1], collage_image_w, collage_image_h, collage_poss[i][0], collage_poss[i][1], collage_image_w, collage_image_h);
	}
}

function init() {
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');
	canvas.width = canvas_default_w;
	canvas.height = canvas_default_h;

	window.addEventListener('mousedown', function(event) {
		// console.log("mousedown")
		moving = true;
		last_x = event.offsetX;
		last_y = event.offsetY;
		// find img to move
		moving_image = which_image_clicked(event.offsetX, event.offsetY);
	}, false);
	window.addEventListener('mouseup', function(event) {
		// console.log("mouseup")
		moving = false;
		moving_image = -1;
	}, false);
	window.addEventListener('mousemove', function(event) {
		// console.log("mousemove")
		if (moving) {
			// move if image to move
			if (moving_image >= 0) {
				let diff_x = event.clientX - last_x;
				diff_y = event.clientY - last_y;
				if (img_poss.length > 0) {
					img_poss[moving_image][0] -= diff_x;
					img_poss[moving_image][1] -= diff_y;
					if (img_poss[moving_image][0] < 0) {img_poss[moving_image][0] = 0;}
					if (img_poss[moving_image][1] < 0) {img_poss[moving_image][1] = 0;}
					if (img_poss[moving_image][0] > img_list[moving_image].width - collage_image_w) {
						img_poss[moving_image][0] = img_list[moving_image].width - collage_image_w;
					}
					if (img_poss[moving_image][1] > img_list[moving_image].height - collage_image_h) {
						img_poss[moving_image][1] = img_list[moving_image].height - collage_image_h;
					}
				}
				last_x = event.clientX;
				last_y = event.clientY;
				draw(canvas, ctx);
			}
		}
	}, false);
}

function submit_images() {
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');


	var img_num = img_list.length;
	var canvas_w = 0;
	var canvas_h = collage_image_h;
	for (let i = 0; i < img_num; i++) {
		img_poss.push([0,0]);
		collage_poss.push([canvas_w, 0]);
		canvas_w += collage_image_w;
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

function which_image_clicked(x_pos, y_pos) {
	// console.log("finding image at: ", x_pos, y_pos);
	// console.log("images available: ", collage_poss);
	for (let i = 0; i < collage_poss.length; i++) {
		// console.log(i, " failing at: ", x_pos > collage_poss[i][0], y_pos > collage_poss[i][1], x_pos < collage_poss[i][0] + collage_image_w, y_pos < collage_poss[i][1] + collage_image_h)
		if (x_pos > collage_poss[i][0] && y_pos > collage_poss[i][1] && x_pos < collage_poss[i][0] + collage_image_w && y_pos < collage_poss[i][1] + collage_image_h) {
			console.log("found!");
			return i;
		}
	}
	return -1;
}