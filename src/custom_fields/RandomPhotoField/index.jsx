import React from 'react'
import PropTypes from 'prop-types'
import RandomPhoto from '@/components/RandomPhoto'
import { FormGroup, Label } from 'reactstrap'

RandomPhotoField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,

  label: PropTypes.string,
}

RandomPhotoField.defaultProps = {
  label: '',
}

function RandomPhotoField(props) {
  const { form, field, label } = props
  const { name, value, onBlur } = field

  const handleImageUrlChange = (newImageUrl) => {
    // image change and trigger re-render form
    form.setFieldValue(name, newImageUrl)
  }

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <RandomPhoto
        name={name}
        imageUrl={value}
        onImageUrlChange={handleImageUrlChange}
        onRandomButtonBlur={onBlur}
      />
    </FormGroup>
  )
}

export default RandomPhotoField
