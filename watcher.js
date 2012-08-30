var fs = require('fs'),
	isJs = /\.js\b/,
	sys = require('sys'),
	exec = require('child_process').exec,
	filename = __filename.split('/');

	filename = filename[filename.length - 1];

function puts(error, stdout, stderr) {
	sys.puts(stdout);
}

function watchFile(file) {
	fs.watchFile(file, function () {
		console.log('File "' + file + '" modified');
		exec("node r.js -o app.build.js", puts);
	});
}

fs.readdir('.', function (err, files) {
	files.forEach(function (file) {
		if (isJs.test(file) && file !== filename) {
			watchFile(file);
		}
	});
});