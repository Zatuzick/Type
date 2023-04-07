import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/Product'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import ProductDetailPage from './pages/ProductDetail'
import { IProduct } from './types/product'
import AddProductPage from './pages/admin/AddProduct'
import UpdateProductPage from './pages/admin/UpdateProduct'
import ProductManagementPage from './pages/admin/ProductManagement'
import Register from './pages/admin/Register'
import Login from './pages/admin/Login'
import { getAllCate } from './api/category'



function App() {
  const [products, setProduct] = useState<IProduct[]>([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProduct(data))
  }, [])
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCate();

        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() => setProduct(products.filter((item) => item.id !== id)))
  }
  const onHandleAdd = (product: any) => {
    addProduct(product).then(() => setProduct([...products, product]))
  }
  const onHandleUpdate = (product: any) => {
    updateProduct(product).then(() => setProduct(products.map((item) => item.id == product.id ? product : item)))
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage products={products} />} />
          <Route path='products' >
            <Route index element={<ProductPage products={products} onRemove={onHandleRemove} />} />
            <Route path=':id' element={<ProductDetailPage />} />
          </Route>
        </Route>
        <Route path='admin'>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='products'>
            <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProductPage categories={categories} onAdd={onHandleAdd} />} />
            <Route path=':id/update' element={<UpdateProductPage categories={categories} onUpdate={onHandleUpdate} products={products} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
