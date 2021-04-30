import React, { createContext, useState } from 'react';
import { dummyProducts } from '../dummy';
export const ProductsContext = createContext()

const ProductsContextProvider = ({children}) => {

    const [products] = useState(dummyProducts);

    return ( 
        <ProductsContext.Provider value={{products}} >
            { children }
        </ProductsContext.Provider>
     );
}
 
export default ProductsContextProvider;