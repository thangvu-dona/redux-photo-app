import React from 'react'
import PropTypes from 'prop-types'
import RandomPhoto from '@/components/RandomPhoto'
import { FormFeedback, FormGroup, Label } from 'reactstrap'
import { ErrorMessage } from 'formik'

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
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

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

      <p className={showError ? 'is-invalid' : ''}></p>
      <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
    </FormGroup>
  )
}

export default RandomPhotoField
