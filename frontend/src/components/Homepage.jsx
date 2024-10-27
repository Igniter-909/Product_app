import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from './ProductCard';

const Homepage = () => {
    const { getProducts, products, updateProduct } = useProductStore();
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowOverlay(true);
    };

    const handleOverlayClose = () => {
        setShowOverlay(false);
        setSelectedProduct(null);
    };

    const handleSaveProduct = async () => {
        const {success,message} = await updateProduct(selectedProduct._id,selectedProduct)
        if(success) {
            alert("Product updated successfully")
            handleOverlayClose();
        }else{
            alert("Update failed: ",message)
        }
    }


    return (
        <div className="flex flex-col items-center mt-12 px-4">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">Current Products</h1>
            <div className="w-full max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} onEdit={() => handleEditClick(product)} />
                    ))
                ) : (
                    <div className="text-xl font-medium mt-4">
                        No current products. <span className="text-blue-500 underline"><Link to="/create">Create a Product</Link></span>
                    </div>
                )}
            </div>

            {showOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
                    <div className="bg-white dark:bg-gray-900 text-black p-8 rounded-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Edit Product</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={selectedProduct.name}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <input
                                type="number"
                                placeholder="Product Price"
                                value={selectedProduct.price}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Product Image URL"
                                value={selectedProduct.image}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <div className="flex justify-end space-x-4">
                                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleOverlayClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaveProduct}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;
