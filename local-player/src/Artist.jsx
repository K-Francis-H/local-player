import React from 'react';
import {useLocation} from "react-router-dom";
import useFetch from "react-fetch-hook";
import {Link} from "react-router-dom";

const ALBUMS = [
  {
    "artist": "Ghost",
    "name": "IMPERA",
    "path": "/home/kyle/Music/Ghost/IMPERA"
  },
  {
    "artist": "Ghost",
    "name": "If You Have Ghost",
    "path": "/home/kyle/Music/Ghost/If You Have Ghost"
  },
  {
    "artist": "Ghost",
    "name": "Infestissumam",
    "path": "/home/kyle/Music/Ghost/Infestissumam"
  },
  {
    "artist": "Ghost",
    "name": "Meliora",
    "path": "/home/kyle/Music/Ghost/Meliora"
  },
  {
    "artist": "Ghost",
    "name": "Popestar",
    "path": "/home/kyle/Music/Ghost/Popestar"
  },
  {
    "artist": "Ghost",
    "name": "Prequelle",
    "path": "/home/kyle/Music/Ghost/Prequelle"
  }
];

export default function Artist(){
	const location = useLocation();
	let artist = location.state || {name: "unknown"};
	//console.log(location);

	const {isLoading, error, data} = useFetch("/api/"+artist.name+"/albums");

	if(isLoading){
		console.log("artist albums loading...");
		return(<div>Loading...</div>);
	}
	if(error){
		console.log(error);
	}

	console.log(data);
	const albums = error ? ALBUMS : data;

	return(
		<>
			<div className="MusicPlayer">
				<h1>{artist.name}</h1>
				<AlbumList albums={albums} />
			</div>
		</>
	)
}

function AlbumList({albums}){
	const items = [];
	albums.forEach((album) => {
		items.push(
			<AlbumListElement album={album} />
		);
	})
	return (
		<table className="center">
		  <tbody>{items}</tbody>
		</table>
	);
}

function AlbumListElement({album}){
	let imgSrc = `/raw/${album.artist}/${album.name}/cover`;
	let altText = `Album art for ${album.name} by ${album.artist}`;
	let placeholder = '/cover_placeholder.svg';
	return (
    <tr className="vertical-center margin15px" >
    	<img alt={altText} width="150px" height="auto" src={placeholder} />
    	<Link  to="/artist/album" state={album}>{album.name}</Link>
    </tr>
  )
}

/*
<picture>
	<source srcset={imgSrc} width="150px" height="auto"></source>
	<img alt={altText} width="150px" height="auto" src="/cover_placeholder.svg" />
</picture>
*/