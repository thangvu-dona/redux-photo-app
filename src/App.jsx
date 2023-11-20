import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import NotFound from './components/NotFound'
import productApi from './api/productApi'

// Lazy load - Code Splitting
const Photo = React.lazy(() => import('./features/Photo'))

function App() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        }
        const response = await productApi.getAll(params)

        console.log(response)
        setProductList(response.data)
      } catch (error) {
        console.log('Fail to fetch product list!', error)
      }
    }

    fetchProductList()
  }, [])

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<h1>Home Page Component</h1>} />
            <Route path="/photos/*" element={<Photo />} />
            <Route element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
