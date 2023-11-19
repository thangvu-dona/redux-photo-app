import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import NotFound from './components/NotFound'

// Lazy load - Code Splitting
const Photo = React.lazy(() => import('./features/Photo'))

function App() {
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<h1>Home Page Component</h1>} />
            <Route path="/photos/*" element={Photo} />
            <Route element={<NotFound />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
