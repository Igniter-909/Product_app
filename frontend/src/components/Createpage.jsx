import React, { useState } from 'react'
import { useProductStore } from '../store/product.js'



const Createpage = () => {

    const [newProduct,setNewProduct] = useState({
        name:"",
        price:"",
        image:""
    })

    const {createProduct} = useProductStore()
    const handleAddProducts = async() => {
        const {success,message} = await createProduct(newProduct)
        if(success) {
            alert(`Product created successfully`)
        }
        else{
            alert("Product couldn't be created")
        }
        setNewProduct({name:"",price:"",image:""})

    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className='text-2xl font-bold text-blue-700 mb-4'>Create New Product</h1>
      <div className="flex flex-col space-y-4 w-1/3">
      <input 
          type="text" 
          placeholder="Product Name" 
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct,name:e.target.value})}
          className="border rounded p-2"
        />
        <input 
          type="number" 
          placeholder="Product price" 
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct,price:e.target.value})}
          className="border rounded p-2"
        />
        <input 
          type="text" 
          placeholder="Product Image" 
          value={newProduct.image}
          onChange={(e) => setNewProduct({...newProduct,image:e.target.value})}
          className="border rounded p-2"
        />
      </div>
      <button 
          className="bg-blue-500 text-white rounded p-2 mt-4" 
          onClick={handleAddProducts}
        >
          Create Product
        </button>
    </div>
  )
}

export default Createpage
