import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Container, Header } from "semantic-ui-react";
import axios from 'axios';
import { ProductCard } from '../components';

const Wishlist = ({ user, wishlist, setWishlist }) => {
  const { user_id } = user;

  const history = useHistory();

  const handleSelect = async (e, data) => {
    history.push(`/wishlist/${data.id}`);

  }

  useEffect(() => {
    if (user_id) {
      axios.get(`/api/wishlist/${user_id}`)
        .then(res => {
          const list = res.data.wishlistItem;
          setWishlist(list);
        })
        .catch(error => console.error("wishlist error", error))
    }
  }, [])

  return (
    user.user_id && wishlist ?
      <Container
        style={{
          backgroundColor: 'lightgrey',
          height: '100vh',
          width: '100vw'
        }}>
        <Container fluid>
          <Container style={{
            background: 'purple',
            height: '150px',
            width: '100vw',
            backgroundSize: 'cover',
          }}>
            <Header inverted color='orange' textAlign='center' style={{ fontFamily: 'Ultra', fontSize: '5rem', paddingTop: '25px' }}>Wishlist for {user.username}</Header>
          </Container>
        </Container>
        <Card.Group itemsPerRow={10} style={{ padding: '.75em .75em', display: 'flex', justifyContent: 'center' }}>
          <ProductCard
            merchandise={wishlist}/>
        </Card.Group>
      </Container>
      :
      <>
        <Container fluid>
          <Container style={{
            background: 'purple',
            height: '100vh',
            width: '100vw',
            backgroundSize: 'cover',
          }}>
            <Header inverted color='orange' textAlign='center' style={{ fontFamily: 'Ultra', fontSize: '5rem', paddingTop: '25px' }}>Login Required to View Wishlists</Header>
          </Container>
        </Container>
      </>
  )

}

export default Wishlist;