var img_list = []
var canvas_default_w = 500;
var canvas_default_h = 500;
var img_poss = []
var moving = false;
var last_x = 0;
var last_y = 0;
var collage_poss = [];
var collage_sizes = [];
var collage_scales = [];
var max_scale = 5;
var min_scale = 0.1;
var moving_image = -1;
var wheelscroll_scale = 0.01;

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
	canvas_default_w = 500;
	canvas_default_h = 500;
	img_poss = []
	moving = false;
	last_x = 0;
	last_y = 0;
	collage_poss = [];
	collage_sizes = [];
	collage_scales = [];
	moving_image = -1;
}

function draw(canvas, ctx) {
	for (let i = 0; i < img_list.length; i++) {
		collage_image = new Image();
		collage_image.src = img_list[i].src;
		// console.log(img_poss[i][0], img_poss[i][1], collage_sizes[i][0], collage_sizes[i][1], collage_poss[i][0], collage_poss[i][1], collage_sizes[i][0], collage_sizes[i][1]);
		ctx.drawImage(collage_image, img_poss[i][0], img_poss[i][1], collage_sizes[i][0]/collage_scales[i], collage_sizes[i][1]/collage_scales[i], collage_poss[i][0], collage_poss[i][1], collage_sizes[i][0], collage_sizes[i][1]);
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
					img_poss[moving_image][0] -= diff_x/collage_scales[moving_image];
					img_poss[moving_image][1] -= diff_y/collage_scales[moving_image];
					// if (img_poss[moving_image][0] < 0) {img_poss[moving_image][0] = 0;}
					// if (img_poss[moving_image][1] < 0) {img_poss[moving_image][1] = 0;}
					// if (img_poss[moving_image][0] > img_list[moving_image].width - collage_sizes[moving_image][0]) {
					// 	img_poss[moving_image][0] = img_list[moving_image].width - collage_sizes[moving_image][0];
					// }
					// if (img_poss[moving_image][1] > img_list[moving_image].height - collage_sizes[moving_image][1]) {
					// 	img_poss[moving_image][1] = img_list[moving_image].height - collage_sizes[moving_image][1];
					// }
				}
				last_x = event.clientX;
				last_y = event.clientY;
				draw(canvas, ctx);
			}
		}
	}, false);
	var wheel_eventlistener = function(event) {
		moving_image = which_image_clicked(last_x, last_y);
		collage_scales[moving_image] += wheelscroll_scale*event.deltaY;
		if (collage_scales[moving_image] > max_scale) {
			collage_scales[moving_image] = max_scale;
		}
		if (collage_scales[moving_image] < min_scale) {
			collage_scales[moving_image] = min_scale;
		}
		draw(canvas, ctx);
	};
	canvas.addEventListener('wheel',wheel_eventlistener,false);
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

function set_image_pos_and_size(len) {
	// 1-2 1 row
	// 3-5 2 rows
	// 6-9 3 rows
	var num_rows = 0;
	var num_cols = [];

	switch (Math.floor(len/3)) {
	case 3: // 9
		num_rows = 3;
		num_cols = [3, 3, 3];
		break;
	case 2: 
		num_rows = 3;
		switch (len%3) {
		case 0: // 6
			num_cols = [2, 2, 2];
			break
		case 1: // 7
			num_cols = [2, 3, 2];
			break;
		case 2: // 8
			num_cols = [3, 2, 3];
			break;
		}
		break;
	case 1: // 3-5
		num_rows = 2;
		switch (len%3) {
		case 0: // 3
			num_cols = [2, 1];
			break
		case 1: // 4
			num_cols = [2, 2];
			break;
		case 2: // 5
			num_cols = [3, 2];
			break;
		}
		break;
	case 0:
		num_rows = 1;
		switch (len%3) {
		case 1: // 1
			num_cols = [1];
			break;
		case 2: // 2
			num_cols = [2];
			break;
		}
		break;
	}

	// set collage_poss here
	for (let i = 0; i < num_rows; i++) {
		let row_cols = num_cols[i];
		let row_y = i * (canvas_default_h/num_cols.length);
		for (let j = 0; j < row_cols; j++) {
			let img_x = j * (canvas_default_w/row_cols);
			collage_poss.push([img_x, row_y]);
			collage_sizes.push([canvas_default_w/row_cols, canvas_default_h/num_cols.length]);
			collage_scales.push(1);
			img_poss.push([0,0]);
		}
	}

}

function submit_images() {
	clear_canvas();
	const canvas = document.getElementById('collage');
	ctx = canvas.getContext('2d');


	var img_num = img_list.length;

	// set up collage grid
	set_image_pos_and_size(img_num);

	canvas.width = canvas_default_w;
	canvas.height = canvas_default_h;

	draw(canvas, ctx);
}

function which_image_clicked(x_pos, y_pos) {
	for (let i = 0; i < collage_poss.length; i++) {
		if (x_pos > collage_poss[i][0] && y_pos > collage_poss[i][1] && x_pos < collage_poss[i][0] + collage_sizes[i][0] && y_pos < collage_poss[i][1] + collage_sizes[i][1]) {
			// console.log("found!");
			return i;
		}
	}
	return -1;
}