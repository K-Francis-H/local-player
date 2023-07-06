const express = require("express");

const PORT = 3001;

const app = express();

//TODO index the music directory

//TODO set an fswatcher on the music directory

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

/*
	"artist" : "artistName",
	"num_albums" : 10
*/

app.get("/artists", (req, res) => {

});

/*
	{
		"artist" : "artistName",
		"albums" : [
			{
				"album_name" : "albumName",
				"album_cover" : "path/to/cover.jpeg" OR base64 encoded image
				"num_tracks" : 10
				//songs?
			}
		]
	}
*/

app.get("/:artist/albums", (req, res) => {

});


/*
	{
		"artist" : "artistName",
		"album" : "albumName",	
		"album_cover" : "path/to/cover.jpeg" OR base64 encoded image
		"songs" : [
			{
				"song_name" : "Name",
				"song_url" : "path/to/song.file"
			},
			...
		]
	}

*/

app.get("/:artist/:album/songs", (req, res) => {

})

app.get("/playlists", (req, res) => {
	
})

app.post("/playlists/new", (req, res) => {

})

app.post("/playlists/:playlist/add", (req, res) => {

})

app.post("/playlists/:playlist/remove", (req, res) => {
	
})

app.delete("/playlists/:playlist/delete", (req, res) => {

})

