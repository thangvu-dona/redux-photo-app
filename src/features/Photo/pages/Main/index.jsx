import Banner from '@/components/Banner'
import Images from '@/constants/images'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'reactstrap'
import PhotoList from '@/features/Photo/components/PhotoList'
import { removePhoto } from '@/features/Photo/photoSlice'

MainPage.propTypes = {}

function MainPage(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const photos = useSelector((state) => state.photos)
  console.log('photo list: ', photos)

  const handlePhotoEditClick = (photo) => {
    console.log('Edit: ', photo)
    navigate(`/photos/${photo.id}`)
  }

  const handlePhotoRemoveClick = (photo) => {
    console.log('Remove: ', photo)
    dispatch(removePhoto(photo.id))
  }

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  )
}

export default MainPage
