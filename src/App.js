import React from "react";
import "./App.css"

import {  
  useNavigate,
} from "react-router-dom";

import { Grid, Skeleton, Container } from '@mantine/core';
import Header from "./Header"
import SwipeView from "./swipe"

import vscodelogo from "./assets/icons/visual_studio.png"
import chromelogo from "./assets/icons/chrome.jpg"
import discordlogo from "./assets/icons/scratch.jpg"
import spotifylogo from "./assets/icons/youtube.jpg"



// new
import khanacademylogo from "./assets/icons/khanacademy.jpg"
import courseralogo from "./assets/icons/couresra.png"
import edkasalogo from "./assets/icons/edkasa.png"
import noteslogo from "./assets/icons/notes.jpg"
import settingslogo from "./assets/icons/settings.jpg"

// -
import tabbylogo from "./assets/icons/books.png"


function openApp(application){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "application": `${application}`
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:8080/open", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function IconButton(props) {
  return (
    <button className="icon-button" onClick={props.onClick}>
      <img src={props.icon} alt="Icon" className="icon" />
      <span style={{fontSize : 16 , color : "white"}}>{props.label}</span>
    </button>
  );
}

function Tab1(){
  return (
    <Grid>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={noteslogo} onClick={() => openApp("notes")} label="notes" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={courseralogo} onClick={() => openApp("coursera")} label="coursera" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={khanacademylogo} onClick={() => openApp("khanacademy")} label="khanacademy" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={settingslogo} onClick={() => openApp("settings")} label="settings" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={edkasalogo} onClick={() => openApp("edkasa")} label="edkasa" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={spotifylogo} onClick={() => openApp("youtube")} label="youtube kids" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={discordlogo} onClick={() => openApp("scratch")} label="scratch" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          
          <IconButton icon={tabbylogo} onClick={() => openApp("books")} label="books" />
        </Grid.Col>



        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={chromelogo} onClick={() => openApp("chrome")} label="chrome" />
        </Grid.Col>


      </Grid>
  )
}

function Tab2(){
  return (
    <Grid>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={noteslogo} onClick={() => openApp("notes")} label="notes" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={courseralogo} onClick={() => openApp("coursera")} label="coursera" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={khanacademylogo} onClick={() => openApp("khanacademy")} label="khanacademy" />
        </Grid.Col>

      </Grid>
  )
}

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Header />
      <Container my="md" >
        <div style={{marginTop : 50}}></div>


      <SwipableCarousel>
        <div style={{ backgroundColor: "red", width: "100%", height: "100%" }}>
          View 1
        </div>
        <div style={{ backgroundColor: "blue", width: "100%", height: "100%" }}>
          View 2
        </div>
        <div style={{ backgroundColor: "green", width: "100%", height: "100%" }}>
          View 3
        </div>
      </SwipableCarousel>

      <div className="bottom-apps"> 
          <IconButton icon={vscodelogo} onClick={() => openApp("vscode")} label="code" />

          <IconButton icon={chromelogo} onClick={() => openApp("chrome")} label="chrome" />

          <IconButton icon={spotifylogo} onClick={() => openApp("youtube")} label="youtube" />
      </div>
    </Container>
      
    </div>
  );
}

export default App;
