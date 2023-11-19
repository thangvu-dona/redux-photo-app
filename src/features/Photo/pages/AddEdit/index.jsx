import Banner from '@/components/Banner'
import PhotoForm from '@/features/Photo/components/PhotoForm'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addPhoto, editPhoto } from '../../photoSlice'
import './styles.scss'
import { randomNumber } from '@/utils/common'

AddEditPage.propTypes = {}

function AddEditPage(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { photoId } = useParams()
  const isAddMode = !photoId

  const editedPhoto = useSelector((state) => state.photos.find((photo) => photo.id === +photoId))

  const initialValues = isAddMode
    ? {
        title: '',
        categoryId: null,
        photo: '',
      }
    : editedPhoto

  const handlePhotoFormSubmit = (inputValues) => {
    // create Promise for fake loading
    return new Promise((resolve) => {
      console.log('Form submit: ', inputValues)

      setTimeout(() => {
        if (isAddMode) {
          const newPhoto = {
            ...inputValues,
            id: randomNumber(10000, 99999),
          }
          dispatch(addPhoto(newPhoto))
        } else {
          // update photo
          dispatch(editPhoto(inputValues))
        }

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
        <PhotoForm
          onSubmit={handlePhotoFormSubmit}
          isAddMode={isAddMode}
          initialValues={initialValues}
        />
      </div>
    </div>
  )
}

export default AddEditPage
