import React from 'react';
import {useLocation} from "react-router-dom";

export default function Artist(){
	console.log("artist");
	console.log(this);
	const location = useLocation();
	console.log(location);
	return(
		<div>Artist</div>
	)
}
/*
const Artist = ({location}) => {
  const { artist = {name:"unknown"} } = location.state || {name:"unknown"}
  console.log(artist);
  return (
    <div>{artist.name}</div>
  )
}*/

//export default Artist;