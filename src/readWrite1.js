// readWrite1.js
// (c) 2014 splashinn


var path = require('path'),
    fs   = require('fs');
    outputDir = "output/";

function readFile( path, callback )
{
  fs.readFile( path, {encoding: 'utf-8'}, callback );
}

function verifyFolder( folderName , callback )
{
  if( fs.existsSync(outputDir) )
    return callback(true);
  fs.mkdir( outputDir, 0766, function(err){
    callback( err ? false : true );
  });
}

function processContent( content , callback ){
  callback( undefined, content.toUpperCase() );
}

function writeContent( path, content , callback )
{
  fs.writeFile( path, content, function (err) {
    if (!err)
      console.log( 'Content written to '+ path );
    callback( err, content );
  });
}

function processFile( filePath, callback) {

  var content;

  readFile( filePath, readFileCallback );

  function readFileCallback( err, data ){
    if(err)
      return callback( err, data );
    content = data;
    verifyFolder( outputDir , verifyFolderCallback );
  }

  function verifyFolderCallback( exists ){
    exists ? processContent( content , processContentCallback ) : callback( outputDir + ' does not exist' );
  }

  function processContentCallback( err, content )
  {
    if(err)
      return callback( err, content );
    writeContent( outputDir + path.basename(filePath) , content, callback );
  }
}

function logResult( err, result ){
  console.log( err || result );
}

processFile( path.join('killme.js') , logResult );
