function display_img(img) {
	var reader = new FileReader();

	reader.onload = function (e) {
		var image = document.getElementById("test_img");
		image.src = e.target.result;
	}

	reader.readAsDataURL(img.files[0])
}