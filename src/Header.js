import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from "./assets/icons/learnable.png"
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export default function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

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

  return (
    <header className={classes.header} style={{height : 80}}>
      <Container size="md" className={classes.inner}>
        <Group>
        <img src={Logo} style={{height : 60 , width : 60}}/>
        <span style={{fontSize : 50}}>Learnable</span>
        </Group>
        
        <Group>
            <span>6th Feb 2024</span>
            <span>6:30 P.M</span>
        </Group>
        
      </Container>
    </header>
  );
}