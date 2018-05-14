var argv = require('boring')();
var glob = require('glob');

if (argv._.length !== 1) {
  console.error('Usage: replace-original-with-full /path/to/public/uploads/attachments [--size=othersizename] [--extra-sizes=name1,name2]');
  console.error('Hardlinks the "original" of each image to the "full" scaled version,');
  console.error('greatly reducing storage requirements. However note that the true');
  console.error('"original" is GONE FOREVER. Gone gone gone.');
  console.error('');
  console.error('You can specify a different named size to link to via --size.');
  console.error('It must exist, see the Apostrophe documentation re: image sizes.');
  console.error('');
  console.error('If you specify --link-all-sizes then all other sizes, not just');
  console.error('the original, are linked to full (or as specified by --size).');
  console.error('You can also use --extra-sizes=name1,name2 to specify more sizes');
  console.error('if extra sizes are configured for your Apostrophe site.');
  console.error('');
  console.error('Use the --quiet option for silent operation.');
  process.exit(1);
}

require('shelljs/global');

cd(argv._[0]);

var sizes = [ 'two-thirds', 'one-half', 'one-third', 'one-sixth', 'full' ];

var size = argv.size || 'full';

if (argv['extra-sizes']) {
  sizes = sizes.concat(argv['extra-sizes'].split(/\s*,\s*/));
}

var files = glob.sync('*.' + size + '.*');
console.log(files);
process.exit(0);

var i = 0;

files.forEach(function(file) {
  if (!file.match(new RegExp('\\.' + size + '\\.(\\w+)'))) {
    // Maybe just something with full in its name, don't wreck it
    return;
  }
  if (argv['link-all-sizes']) {
    // Maybe you're doing this on staging or dev and you'd rather have
    // just the full-size file and not bother with the other scaled
    // sizes, but rather just hardlink those too. For production it makes much more
    // sense to keep all the other sizes but hardlink the original to full. You
    // do NOT want to force people to download full size as a thumbnail
    // in production
    sizes.forEach(function(_size) {
      if (size === _size) {
        // You link it to itself, you do, that's what really hurts
        return;
      }
      var linked = file.replace(new RegExp(size + '\\.(\\w+)$'), function(whole, ext) {
        return _size + '.' + ext;
      });
      ln('-f', file, linked);
    });
  }
  // Do the original
  ln('-f', file, file.replace(new RegExp(size + '\\.(\\w+)$'), function(whole, ext) {
    return ext;
  }));
  i++;
  if (!argv['quiet']) {
    if (!(i % 100)) {
      console.log(i);
    }
  }
});

