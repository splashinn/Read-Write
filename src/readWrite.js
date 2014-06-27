// readWrite.js
// (C) 2014 splashinn
// read the content of file then want to make few updates to content and then write that content to another file

var filePath = path.join('public/index.html'),
   exactFileName = path.basename(filePath),
   outputDir = "output/";

function readContent(callback) {
  // start reading file
  fs.readFile(filePath, {encoding: 'utf-8'}, function (err, content) {
    if (err) return callback(err)
      callback(null, content);
      // checks if directory is available or not, if not creates a new directory
      if (!fs.exitsSync(outputDir)) {
        fs.mkDirSync(outputDir, 0766, function (err) {
          if (err) {
            console.log(err);
            response.send("ERROR: Can't make the directory.\n");
          }
        });
      }
      /*

      will process content here and then write to output file

      */

      // writes the data in another file
      fs.writeFile(outputDir + ' ' + exactFileName, content, function (err) {
        if (err) return console.log(err);
          console.log("Content written to " + exactFileName);
      });
  })
}

readContent(function (err, content) {
  console.log(content);
});
