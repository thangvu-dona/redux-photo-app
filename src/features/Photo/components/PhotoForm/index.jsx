import { PHOTO_CATEGORY_OPTIONS } from '@/constants/global'
import Images from '@/constants/images'
import { FastField, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import InputField from '@/custom_fields/InputField'
import SelectField from '@/custom_fields/SelectField'

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
  }
  // npm i --save react-select
  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        // do something here...
        const { values, errors, touched } = formikProps
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

            <FormGroup>
              <Label for="categoryId">Photo</Label>

              <div>
                <Button type="button" outline color="primary">
                  Random a photo
                </Button>
              </div>
              <div>
                <img
                  width="200px"
                  height="200px"
                  src={Images.COLORFUL_BG}
                  alt="colorful background"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary">Add to album</Button>
            </FormGroup>
          </Form>
        )
      }}
    </Formik>
  )
}

export default PhotoForm
