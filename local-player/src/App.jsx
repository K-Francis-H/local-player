//import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import useFetch from "react-fetch-hook";
import {Link} from "react-router-dom";

//import Album from "./Album.jsx";
//import Artist from "./Artist.jsx";


const TEST_ARTISTS = [
  {name: "Mesarthim"},
  {name: "Ghost"},
  {name: "Mountains"}
];

function MusicPlayer({artists}){
  const [searchText, setSearchText] = useState('');

  return (
    <div className="MusicPlayer">
      <SearchBar 
        searchText={searchText} 
        onSearchTextChange={setSearchText} 
      />
      <ArtistList 
        artists={artists} 
        searchText={searchText}
      />
    </div>
  )
}

function SearchBar({searchText,onSearchTextChange}){
  return (
    <div>
      <h1>Lo-Net Music Player</h1>
      <form>
        <input 
          type="text" 
          value={searchText} placeholder="Search Artists..." 
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
      </form>
    </div>
  )
}

function ArtistList({artists, searchText}){
  const items = [];
  artists.forEach((artist) => {
    //TODO check item type, if its a song use a SongListElement instead
    if(artist.name.toLowerCase().includes(searchText.toLowerCase())){
      items.push(
        <ArtistListElement artist={artist} />
      );
    }
  })
  return (
    <div className="center">
      <div>{items}</div>
    </div>
  );
}

function ArtistListElement({artist}){
  return (
      <Link className="ArtistCard" to="/artist" state={artist}>{artist.name}</Link>
  )
  //<Link to="/Album">{artist.name}</Link>
}

//function Album({artist, songs}){
//  return (
//    <div>hello album</div>
//  )
//}

function Album(){
  return(
    <div>album</div>
  )
}

const Artist = ({location}) => {
  const { artist = {name:"unknown"} } = location.state || {name:"unknown"}
  console.log(artist);
  return (
    <div>{artist.name}</div>
  )
}

/*function Artist({artist}){
  return (
    <div>{artist.name}</div>
  )
}*/

export default function App(){
    //let artists = await getAllArtists();
  //const res = await fetch("/api/artists");
  //const artists = await res.json();
  //let res = await fetch("http://www.example.com")
  //let text = await res.text();
  //console.log(text);
  
  //try to get artists from api in node express now
  //fall back to TEST_ARTISTS
  //fetch /api/artists
  const {isLoading, error, data} = useFetch("/api/artists");

  if(isLoading) {
    return "Loading...";
  }
  if(error){
    console.log("Error: "+error);
  }

  const artists = error ? TEST_ARTISTS : data;


  return ( 
    <>
      <MusicPlayer artists={artists} />
    </>
  )
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
//export default Main;

