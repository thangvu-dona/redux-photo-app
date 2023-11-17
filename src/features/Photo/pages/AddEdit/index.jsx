import Banner from '@/components/Banner'
import PhotoForm from '@/features/Photo/components/PhotoForm'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPhoto } from '../../photoSlice'
import './styles.scss'

AddEditPage.propTypes = {}

function AddEditPage(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlePhotoFormSubmit = (inputValues) => {
    // create Promise for fake loading
    return new Promise((resolve) => {
      console.log('Form submit: ', inputValues)

      setTimeout(() => {
        dispatch(addPhoto(inputValues))

        //redirect
        navigate('/photos')

        resolve(true)
      }, 2000)
    })
  }

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handlePhotoFormSubmit} />
      </div>
    </div>
  )
}

export default AddEditPage
