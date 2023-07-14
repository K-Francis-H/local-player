import React from 'react';
import {useLocation} from "react-router-dom";
import useFetch from "react-fetch-hook";
import {Link} from "react-router-dom";

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

	return(
		<>
			<h1>{artist.name}</h1>
			<AlbumList albums={data} />
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
		<table>
		  <tbody>{items}</tbody>
		</table>
	);
}

function AlbumListElement({album}){
	let imgSrc = `/raw/${album.artist}/${album.name}/cover`;
	return (
    <tr>
    	<img width="150px" height="auto" src={imgSrc} />
    	<Link to="/artist/album" state={album}>{album.name}</Link>
    </tr>
  )
}