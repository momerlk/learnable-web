import { useState, useEffect } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from "./assets/icons/learnable.png"
import classes from './HeaderSimple.module.css';

import wifilogo from "./assets/icons/wifi.png"
import batterylogo from "./assets/icons/battery.png"

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export default function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());


  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <header className={classes.header + " .glass"} style={{height : 80}}>
      <Container size="md" className={classes.inner} style={{paddingTop : 10}}>
        <Group>
        <span style={{fontSize : 40}}>D∇LTA</span>
        <img src={wifilogo}  style={{height : 30 , width: 60}}/>
        <img src={batterylogo} style={{height : 40, width : 45}}/>
        </Group>
        
        <Group>
            <span style={{fontSize : 30}} >{dateTime}</span>
        </Group>
        
      </Container>
    </header>
  );
}