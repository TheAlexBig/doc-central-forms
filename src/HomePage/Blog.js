import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';



const mainFeaturedPost = {
  title: 'Central Docs',
  description:
    "Genera documentos de forma rapida y sencilla. Unicamente selecciona el tipo de documento, llenas los campos solicitados y listo. Crear documentos nunca fue más facil.",
  image: require('../Images/escritorio3.jpg'),
  imgText: 'main image description',
};

const featuredPosts = [
  {
    title: 'Compra venta de vehiculos',
    description:
      'Plantilla utilizada para la compra y venta de vehiculos. Llena todos los campos requeridos y genera un documento',
    image: require('../Images/blue-car.jpg'),
    imageText: 'Car image',
  },
    

];

export default function Blog() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Header title="Central Docs" />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}