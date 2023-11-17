import { PHOTO_CATEGORY_OPTIONS } from '@/constants/global'
import InputField from '@/custom_fields/InputField'
import RandomPhotoField from '@/custom_fields/RandomPhotoField'
import SelectField from '@/custom_fields/SelectField'
import { FastField, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Button, FormGroup, Spinner } from 'reactstrap'
import * as yup from 'yup'

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
}

PhotoForm.defaultProps = {
  onSubmit: null,
}

function PhotoForm(props) {
  // formik need an initialValues
  const initialValues = {
    title: '', // should not `undefined` value, will cause error: `uncontrolled` --> `control` input
    categoryId: null,
    photo: '',
  }

  const schema = yup.object().shape({
    title: yup.string().required('Please enter your title.'),
    categoryId: yup.number().required('This field is required'),
    // photo: yup.string().required('Please random your image.'),
    photo: yup.string().when('categoryId', {
      is: 1,
      then: (schema) => schema.required('Please random your image.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  })

  // npm i --save react-select
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      // onSubmit={(values) => console.log('submit values: ', values)}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        // do something here...
        const { values, errors, touched, isSubmitting } = formikProps
        console.log({ values, errors, touched })

        return (
          /* use <Form /> of Formik instead of Bootstrap for auto binding summission and reset */
          <Form>
            {/* use formik <FastField /> of Formik instead of <Field /> for not re-rending when other fields change (work independent) */}
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField name="photo" component={RandomPhotoField} label="Photo" />

            <FormGroup>
              <Button type="submit" color="primary">
                Add to album
              </Button>
              {isSubmitting && <Spinner size="sm" />}
            </FormGroup>
          </Form>
        )
      }}
    </Formik>
  )
}

export default PhotoForm
