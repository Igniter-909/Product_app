import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useProductStore } from '../store/product';

const ProductCard = ({ product, onEdit }) => {
    const { deleteProduct, setProducts, products } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        const { success, message } = await deleteProduct(pid);
        if (success) {
            alert("Product deleted successfully");
            // Update product list in the store after deletion
            setProducts(products.filter(p => p._id !== pid));
        } else {
            alert("Product couldn't be deleted: " + message);
        }
    };

    return (
        <Card className="mt-6 w-96 bg-white dark:bg-gray-900 text-black dark:text-white">
            <CardHeader color="blue-gray dark:text-white" className="relative h-56">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray dark:text-white" className="mb-2">
                    {product.name}
                </Typography>
                <Typography>
                    $ {product.price}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex space-x-4">
                <Button 
                    className="bg-white text-gray-600 shadow-md hover:shadow-lg"
                    onClick={() => onEdit(product)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button
                    className="bg-white text-gray-600 shadow-md hover:shadow-lg"
                    onClick={() => handleDeleteProduct(product._id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
