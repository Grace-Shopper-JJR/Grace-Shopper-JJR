import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';
// import { getAllMerchandise } from '../api';
import ProductCard from './ProductCard';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Products = ({products, setProducts}) => {

const classes = useStyles();


useEffect(() => {
    try {
        Promise.all([getAllMerchandise()]).then(([data]) => {
            setProducts(data);
            console.log(data);
        });
    } catch (error) {
        console.log(error);
    }
}, []);


  return (
    <div>
    <span><h1>Products</h1></span>
    <div className={classes.root}>
        <Grid container spacing={6}>
          {products.map((product, index) => 
          <Grid item xs={6} sm={4}>
            <ProductCard key={index} product={product}></ProductCard>
          </Grid>
          )}
        </Grid>
    </div> 
    </div>
  );
}

export default Products;