const express = require("express");
const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const os = require("os");

const PORT = 3000;

const app = express();
const httpServer = http.createServer(app);

async function getAllArtists(path=os.homedir()+"/Music"){
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
	console.log(artists);
	return artists;
}

app.use(express.static(path.join(__dirname, '../build')));

app.get("/api/artists", async function(req, res) {
	const artists = await getAllArtists();
	res.send(JSON.stringify(artists));
});

httpServer.listen(PORT);

