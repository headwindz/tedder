let fs = require('fs'),
  path = require('path'),
  mocha = new (require('mocha'))({
    ui: 'bdd',
    reporter: 'spec',
  });

// dump test case
let dumpTestFile = function(dir) {
  fs.readdirSync(dir).forEach(name => {
    let it = path.join(dir, name);
    let stat = fs.lstatSync(it);
    if (stat.isDirectory()) {
      dumpTestFile(it);
    } else if (/\.js$/.test(it)) {
      mocha.addFile(it);
    }
  });
};

// run all test case
dumpTestFile(path.join(__dirname, '../tests'));

mocha.run(function(failed) {
  process.on('exit', function() {
    process.exit(failed);
  });
});
