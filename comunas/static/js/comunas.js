/* global jQuery*/
'use strict';
jQuery.event.props.push('dataTransfer');
(function($){
	
	if (window.File && window.FileList && window.FileReader) {
		$('input[type="file"]').after($('<div></div>').addClass('filedrag').text('or drop file here'));
		var fileslect = $('#id_uploadfile');
		var filedrag = fileslect.next();

		fileslect.on('change', fileSelectHandler);

		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			filedrag.on('dragover', fileDragHover);
			filedrag.on('dragleave', fileDragHover);
			filedrag.on('drop', fileSelectHandler);
		}

	} else {
		$(body).appen('No File support');
	}

	function fileDragHover(e){
		e.stopPropagation();
		e.preventDefault();
		$(e.target).toggleClass('hover', e.type === 'dragover');
	}

	function fileSelectHandler(e) {
		// cancel event and hover styling
		fileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;


		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			parseFile(f);
			uploadFile(f);
		}
	}

	function parseFile(file) {
		if (file.type.indexOf('image') >= 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var output = '<p><img src="' + e.target.result + '" width="120"></p>';
				$('#messages').html(output + $('#messages').html());
			}
			reader.readAsDataURL(file);
		} else {
			var output = '<p> File information: <strong>' + file.name +
						'</strong> type: <strong>' + file.type +
						'</strong> size: <strong>' + Math.round(file.size / 1024) +
						'</strong> Kb </p>';
						$('#messages').html(output + $('#messages').html());
		}

	}

	function uploadFile(file) {
		var xhr = new XMLHttpRequest();
		if (xhr.upload && file.type == 'image/jpeg') {
			xhr.open('POST', $('#uploadform').attr('action'), true);
			xhr.setRequestHeader('X_FILENAME', file.name);
			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
			xhr.send(file);
		}
	}

})(jQuery);