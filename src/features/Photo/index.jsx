import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import NotFound from '../../components/NotFound'
import AddEditPage from './pages/AddEditPage'

Photo.propTypes = {}

function Photo() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/add" element={<AddEditPage />} />
      <Route path="/:photoId" element={<AddEditPage />} />
      <Route element={<NotFound />} />
    </Routes>
  )
}

export default Photo
