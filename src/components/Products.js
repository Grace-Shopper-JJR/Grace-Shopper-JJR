import React, { useContext } from 'react';
import ProductItem from './ProductItem';
import { ProductsContext } from '../services/ProductsContext';
import styles from './store.css';

const Products = () => {

    const { products} = useContext(ProductsContext)

    return ( 
        <div className={styles.store}>
            <div className="row">
                <div className="col-sm-8">
                    <div className="py-3">
                        {products.length} Products
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="text" name="" placeholder="Search product" className="form-control" id=""/>
                    </div>
                </div>
            </div>
            <div className={styles.store}>

                {
                    products.map(product => (
                        <ProductItem key={product.id} product={product}/>
                    ))
                }

            </div>
            <div className={styles.store}>

            </div>
        </div>
     );
}
 
export default Products;