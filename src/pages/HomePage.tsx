import React from 'react';
import Hero from '../components/Hero';
import Servicios from '../components/Servicios';
import Productos from '../components/Productos';
import Galeria from '../components/Galeria';
import SobreMi from '../components/SobreMi';
import Registro from '../components/Registro';
import Testimonios from '../components/Testimonios';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Servicios />
      <Productos />
      <SobreMi />
      <Galeria />
      <Testimonios />
      <Registro />
    </>
  );
};

export default HomePage;