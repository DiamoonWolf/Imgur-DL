
console.clear();


var fs = require('fs');
var request = require('request');
var ON_DEATH = require('death')({SIGHUP: true})
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var urlList = [];


try {  
    var data = fs.readFileSync('conf.txt', 'utf8');
    console.log('Maximum links to check: '+ data.toString()); 
    var maxval = data.toString();   
} catch(e) {
    console.log('Error:', e.stack);
}

console.log('Press CTRL + C to abort instantly');
    for (let i = 0; i < maxval; i++) {
        let r = Math.random().toString(36).substring(6);
        urlList.push('https://imgur.com/' + r + '.png');
        
      }
    
    

var download = function(url, dest, callback){
    
    try {
        
    request.head(url, function(err, res, body){
       
            console.log('Started -> ' + url);
           // console.log('content-length:', res.headers['content-length'].toString);
            request.get(url)
            .on('error', function(err) {console.log(err)} )
            .pipe(fs.createWriteStream(dest))
            .on('close', callback);
        

      });
    } catch{return;}
};

urlList.forEach( function(str) {
	var filename =  str.split('/').pop();
    
    var filedir = './pictures/' + filename;
    download(str, filedir, function(){console.log('Done -> ' + filename)
    if(gFSB('./pictures/' + filename) == 0){
        console.log("=== 0");
    }
    if (gFSB('./pictures/' + filename) <= 503 || gFSB('./pictures/' + filename) == 12716 || gFSB('./pictures/' + filename) == 0){fs.unlink('./pictures/' + filename, function () {}); }
      
});

});




function gFSB(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}




async function ls() {
  const { stdout, stderr } = await exec("start clear.bat");
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}


ON_DEATH(function(signal, err) {
  ls();
})

