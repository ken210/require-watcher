var fs = require('fs'),
	sys = require('sys'),
	exec = require('child_process').exec,
	isJs = /\.js\b/,
	filename = __filename.split('/');

	filename = filename[filename.length - 1];

function puts(error, stdout, stderr) {
	sys.puts(stdout);
}

function watchFile(file) {
	fs.watchFile(file, function () {
		console.log('\033[0;36mwatcher.js:\n\033[0mModule \033[1;32m"' + file + '" \033[0mmodified');
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