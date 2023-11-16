import React, { Suspense } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import NotFound from './components/NotFound'

// Lazy load - Code Splitting
const Photo = React.lazy(() => import('./features/Photo'))

function App() {
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          {/* TODO: remove after testing */}
          <ul>
            <li>
              <Link to="/photos">Go to photo page</Link>
            </li>
            <li>
              <Link to="/photos/add">Go to Add new photo page</Link>
            </li>
            <li>
              <Link to="/photos/123">Go to Edit photo page</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/photos/*" element={<Photo />} />
            <Route element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
