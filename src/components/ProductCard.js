import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../helpers/utils';

const ProductItem = ({product}) => {

    const { addProduct, cartItems, increase } = useContext(CartContext);

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    return ( 
        <div className="card card-body">
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}} className="img-fluid" 
            src={product.photo + '?v=' + product.id} alt=""/>
            <p>{product.name}</p>
            <h3 className="text-left">{formatNumber(product.price)}</h3>
            <div className="text-right">
                <Link  to="/" className="btn btn-link btn-sm mr-2">Details</Link>

    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={product.img_url}
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {product.artist}
            </Typography>
            
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Purchase
            </Button>
            <Button size="small" color="primary">
            Learn More
            </Button>
            <Typography variant="body2" color="textSecondary" component="p" >
                {product.price}
            </Typography>
        </CardActions>
        </Card>
    );
    }

                {
                    !isInCart(product) && 
                    <button 
                    onClick={() => addProduct(product)}
                    className="btn btn-primary btn-sm">Add to cart</button>
                }
                
            </div>
        </div>
     );
}
 
export default ProductItem;