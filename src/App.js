import React from "react";
import "./App.css"

import {  
  useNavigate,
} from "react-router-dom";

import { Grid, Skeleton, Container } from '@mantine/core';
import Header from "./Header"


import vscodelogo from "./assets/icons/visual_studio.png"
import chromelogo from "./assets/icons/chrome.jpg"
import discordlogo from "./assets/icons/discord.png"
import spotifylogo from "./assets/icons/spotify.png"
import messengerlogo from "./assets/icons/messenger.png"
import evernotelogo from "./assets/icons/evernote.png"
import tabbylogo from "./assets/icons/tabby.png"


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


function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Header />
      <Container my="md" >
        <div style={{marginTop : 100}}></div>
      <Grid>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={vscodelogo} onClick={() => openApp("vscode")} label="code" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={spotifylogo} onClick={() => openApp("spotify")} label="spotify" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={discordlogo} onClick={() => openApp("discord")} label="discord" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={evernotelogo} onClick={() => openApp("evernote")} label="evernote" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={messengerlogo} onClick={() => openApp("messenger")} label="messenger" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={chromelogo} onClick={() => openApp("chrome")} label="chrome" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <IconButton icon={tabbylogo} onClick={() => openApp("tabby")} label="tabby" />
        </Grid.Col>

      </Grid>

      <div className="bottom-apps"> 
          <IconButton icon={vscodelogo} onClick={() => openApp("vscode")} label="code" />

          <IconButton icon={chromelogo} onClick={() => openApp("chrome")} label="chrome" />

          <IconButton icon={messengerlogo} onClick={() => openApp("messenger")} label="messenger" />

      </div>
    </Container>
      
    </div>
  );
}

export default App;
