import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import mainFeaturedPostImage from '../Images/escritorio3.jpg';
import featuredPostImage from '../Images/blue-car.jpg';

const mainFeaturedPost = {
  title: 'Central Docs',
  description:
    'Genera documentos de forma rapida y sencilla. Unicamente selecciona el tipo de documento, llenas los campos solicitados y listo. Crear documentos nunca fue más facil.',
  image: mainFeaturedPostImage,
  imgText: 'main image description',
};

const featuredPosts = [
  {
    title: 'Compra venta de vehiculos',
    description:
      'Plantilla utilizada para la compra y venta de vehiculos. Llena todos los campos requeridos y genera un documento',
    image: featuredPostImage,
    imageText: 'Car image',
  },
];

export default function Blog() {
  return (
    <>
      <Header title="Central Docs" />
      <Container maxWidth="lg">
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
