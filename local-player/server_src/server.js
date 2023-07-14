const express = require("express");
const fs = require("fs/promises");
const fsSync = require("fs");
const http = require("http");
const path = require("path");
const os = require("os");

const PORT = 3000;

const COVER_PLACEHOLDER = fsSync.readFileSync("public/cover_placeholder.svg");

const app = express();
const httpServer = http.createServer(app);

function isImageFile(fileName){
	//TODO
	return false;
}

function isAudioFile(fileName){
	let parts = fileName.split(".");
	let ext = parts[parts.length-1];
	switch(ext){
		case "mp2":
		case "mp3": 
		case "mpeg3": 	
		case "ogg":
		case "spx":
		case "oga": 	
		case "opus": 		
		case "flac": 	
		case "wma": 	
		case "weba": 	
		case "wav": 	
		case "aiff": 	
		case "3gp": 	
		case "3g2": 	
		case "aac": 	
		case "mid":
		case "midi": 	
			return true;
		default:
			return false;
	}
}

function mimeType(fileName){
	let parts = fileName.split(".");
	let ext = parts[parts.length-1];
	switch(ext){
		case "mp2":
		case "mp3": 
		case "mpeg3": 	return "audio/mpeg";
		case "ogg":
		case "spx":
		case "oga": 	return "audio/ogg";
		case "opus": 	return "audio/opus";	
		case "flac": 	return "audio/flac";
		case "wma": 	return "audio/x-ms-wma";
		case "weba": 	return "audio/webm";
		case "wav": 	return "audio/wav";
		case "aiff": 	return "audio/aiff";
		case "3gp": 	return "audio/3gp";
		case "3g2": 	return "audio/3gp2";
		case "aac": 	return "audio/aac";
		case "mid":
		case "midi": 	return "audio/midi";
		default: 		return "application/octet-stream";
	}
}

async function getAllArtists(path=os.homedir()+"/Music"){
	console.log("getAllArtists()");
	let artists = [];
	console.log(path);
	try{
		let items = await fs.readdir(path);
		items.forEach( function(item) {
			fstat = fsSync.lstatSync(path+"/"+item);
			if(fstat.isDirectory()){
				artists.push({
					name: item,
					path: path+"/"+item
				});
			}else{
				console.log("top level song: "+item);
			}
		});
	}catch(e){
		console.log(e)
	}
	//console.log(artists);
	return artists;
}

async function getAlbumsForArtist(artist){
	console.log("getAlbumsForArtists()");
	let path = os.homedir()+"/Music/"+artist;
	let albums = [];
	console.log(path);
	try{
		let items = await fs.readdir(path);
		items.forEach( (item) => {
			albums.push({
				artist: artist,
				name: item,
				path: path+"/"+item
			});
		});
	}catch(e){
		console.log(e);
	}
	console.log(albums);
	return albums;
}

async function getSongsForAlbum(artist, album){
	let path = os.homedir()+"/Music/"+artist+"/"+album;
	let songs = [];
	try{
		let items = await fs.readdir(path);
		items.forEach( (item) => {
			if(isAudioFile(item)){
				songs.push({
					artist: artist,
					album: album,
					song: item,
					path: path+"/"+item
				});
			}
		});
	}catch(e){
		console.log(e);
	}
	return songs;
}

async function getSong(artist, album, song){
	let path = os.homedir()+"/Music/"+artist+"/"+album+"/"+song;
	var song = []; //uhhh this will be bytes mmaybe I should use typescript
	try{
		song = await fs.readFile(path)
	}catch(e){
		console.log(e);
	}
	return song;
}

async function getCover(artist, album){
	let path = os.homedir()+"/Music/"+artist+"/"+album+"/cover.jpg";
	var data;
	var mimeType = "image/jpeg";
	try {
		data = await fs.readFile(path)
	}catch(e){
		console.log(e);
		//return a placeholder image
		mimeType = "image/svg+xml"
		return {
			data: COVER_PLACEHOLDER,
			mimeType: mimeType
		}
	}

	return {
		data: data,
		mimeType: mimeType
	};
}


app.use(express.static(path.join(__dirname, '../build')));

app.use("/api", function(req, res, next){
	console.log("/api middleware");
	res.setHeader("Content-Type", "application/json");
	next();
})

app.get("/api/artists", async function(req, res) {
	console.log("/api/artists");
	const artists = await getAllArtists();
	//res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(artists));
});

app.get("/api/:artist/albums", async function(req, res) {
	console.log("/api/:artist/albums");
	let artist = req.params.artist; //TODO sanitize this maybe
	//check for ../ and send an error if that occurs or
	//use tokenization for the artists so that only valid inputs can be received
	let albums = await getAlbumsForArtist(artist);
	res.send(JSON.stringify(albums));
});

app.get("/api/:artist/:album", async function(req, res) {
	console.log("/api/:artist/:album");
	let artist = req.params.artist;
	let album = req.params.album;
	let songs = await getSongsForAlbum(artist, album);

	res.send(JSON.stringify(songs));
});

app.get("/raw/:artist/:album/cover", async function(req,res) {
	console.log("/raw/:artist/:album/cover")
	//have a backup file in case there is no cover
	let artist = req.params.artist;
	let album = req.params.album;
	let cover = await getCover(artist, album);

	res.setHeader("Content-Type", cover.mimeType);
	res.send(cover.data);
})

//change to /raw/... so that we can set our own headers
app.get("/raw/:artist/:album/:song", async function(req, res){
	console.log("/api/:artist/:album/:song")
	let artist = req.params.artist;
	let album = req.params.album;
	let song = req.params.song;
	let songData = await getSong(artist, album, song);

	res.setHeader("Content-Type", mimeType(song));
	res.send(songData);
})

httpServer.listen(PORT);

