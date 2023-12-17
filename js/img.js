var img_list = []

function clear_images() {
	const main = document.querySelector('main')
	main.innerHTML = "";
	img_list = [];
}

function submit_images() {
	
}

function display_img(img) {
	var reader = new FileReader();

	reader.onload = function (e) {
		var image = document.createElement('img');
		image.setAttribute('class', 'upload-preview');
		image.src = e.target.result;
		const main = document.querySelector('main');
		main.appendChild(image);
		img_list.push(e.target.result);
	}

	reader.readAsDataURL(img.files[0])
}