import React from 'react';
import {useLocation} from "react-router-dom";
import useFetch from "react-fetch-hook";
import {Link} from "react-router-dom";

const SONGS = [{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 01 Imperium.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 01 Imperium.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 02 Kaisarion.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 02 Kaisarion.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 03 Spillways.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 03 Spillways.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 04 Call Me Little Sunshine.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 04 Call Me Little Sunshine.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 05 Hunter’s Moon.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 05 Hunter’s Moon.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 06 Watcher In The Sky.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 06 Watcher In The Sky.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 07 Dominion.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 07 Dominion.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 08 Twenties.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 08 Twenties.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 09 Darkness At The Heart Of My Love.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 09 Darkness At The Heart Of My Love.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 10 Griftwood.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 10 Griftwood.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 11 Bite Of Passage.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 11 Bite Of Passage.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 12 Respite On The Spitalfields.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 12 Respite On The Spitalfields.flac"},{"artist":"Ghost","album":"IMPERA","song":"Ghost - IMPERA - 13 Hunter's Moon (Film Version - LV Exclusive Bonus Track) - DIGITAL ONLY.flac","path":"/home/kyle/Music/Ghost/IMPERA/Ghost - IMPERA - 13 Hunter's Moon (Film Version - LV Exclusive Bonus Track) - DIGITAL ONLY.flac"},{"artist":"Ghost","album":"IMPERA","song":"cover.jpg","path":"/home/kyle/Music/Ghost/IMPERA/cover.jpg"}];

export default function Album(){
	console.log("loading album")
	const location = useLocation();
	let album = location.state || {name: "unknown"};

	const {isLoading, error, data} = useFetch("/api/"+album.artist+"/"+album.name);
	if(isLoading){
		return(<div>Loading...</div>);
	}
	if(error){
		console.log(error);
	}

	console.log(data);
	const songs = error ? SONGS : data;

	return (
		<>
			<div className="MusicPlayer">
				<h1>{album.artist}</h1>
				<h3>{album.name}</h3>	
				<SongList songs={songs} />
			</div>
		</>
	)
}

function SongList({songs}){
	const items = [];
	songs.forEach((song) => {
		items.push(
			<SongListElement song={song} />
		);
	});
	console.log(items);
	return (
		<div className="center">
	      <div>{items}</div>
	    </div>
	);
}

function SongListElement({song}){
	let audioApiSrc = `/raw/${song.artist}/${song.album}/${song.song}`;
	return (
		<div className="AlbumCard vertical-center margin15px">
			<div>{song.song}</div>
			<audio controls preload="metadata" src={audioApiSrc}></audio>
		</div>
	)
}