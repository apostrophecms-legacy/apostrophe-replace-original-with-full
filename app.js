var argv = require('boring')();

if (argv._.length !== 1) {
  console.error('Usage: replace-original-with-full /path/to/public/uploads/files');
  console.error('Hardlinks the "original" of each image to the "full" scaled version,');
  console.error('greatly reducing storage requirements. However note that the true');
  console.error('"original" is GONE FOREVER. Gone gone gone.');
  console.error('');
  console.error('Use the --quiet option for silent operation.');
  process.exit(1);
}

require('shelljs/global');

cd(argv._[0]);

var sizes = [ 'two-thirds', 'one-half', 'one-third', 'one-sixth' ];

var files = ls('*.full.*');

var i = 0;

files.forEach(function(file) {
  if (!file.match(/\.full\.(\w+)/)) {
    // Maybe just something with full in its name, don't wreck it
    return;
  }
  // Maybe you're doing this on staging and you'd rather have
  // just the full-size file. For production it makes much more
  // sense to keep all the other sizes but hardlink the original to full
  //
  // sizes.forEach(function(size) {
  //   var linked = file.replace(/full\.(\w+)/, function(whole, ext) {
  //     return size + '.' + ext;
  //   });
  //   ln('-f', file, linked);
  // });
  // Do the original
  ln('-f', file, file.replace(/full\.(\w+)/, function(whole, ext) {
    return ext;
  }));
  i++;
  if (!argv['quiet']) {
    if (!(i % 100)) {
      console.log(i);
    }
  }
});

