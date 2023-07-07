const express = require("express");
const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const os = require("os");

const PORT = 3000;

const app = express();
const httpServer = http.createServer(app);

async function getAllArtists(path=os.homedir()+"/Music"){
	console.log("getAllArtists()");
	let artists = [];
	console.log(path);
	try{
		let items = await fs.readdir(path);
		items.forEach( function(item) {
			artists.push({
				name: item,
				path: path+"/"+item
			});
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
			songs.push({
				artist: artist,
				album: album,
				song: item,
				path: path+"/"+item
			});
		});
	}catch(e){
		console.log(e);
	}
	return songs;
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
	let artist = req.params.artist;
	let album = req.params.album;
	let songs = await getSongsForAlbum(artist, album);

	res.send(JSON.stringify(songs));
})

httpServer.listen(PORT);

