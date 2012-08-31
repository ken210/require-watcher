var fs = require('fs'),
	sys = require('sys'),
	exec = require('child_process').exec,
	isJs = /\.js\b/,
	filename = __filename.split('/'),
	output = '\n',

	filename = filename[filename.length - 1];

function puts(error, stdout, stderr) {
	sys.puts(stdout);
}

function watchFile(file, r, builder) {
	if (r == null) {
		r = 'r.js';
	}
	if (builder == null) {
		builder = 'app.build.js';
	}
	fs.watchFile(file, function () {
		console.log('\n----------------\n\033[0mModule \033[0;32m"' + file + '" \033[0mmodified\n----------------');
		exec("node " + r + " -o " + builder, puts);
	});
}

if (process.argv[2] === 'help') {
	output += 'Usage: node watcher.js [path/to/r.js] [path/to/builderFile]\n';
	output += '       node watcher.js';
} else {
	fs.readdir('.', function (err, files) {
		files.forEach(function (file) {
			if (isJs.test(file) && file !== filename) {
				watchFile(file, process.argv[2], process.argv[3]);
			}
		});
	});

	output += 'watcher.js:\nwatching \033[0;33m' + __dirname + '\033[0m\n';
	output += 'Type node watcher.js help for options';
}

console.log(output);