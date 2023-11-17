import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { ErrorMessage } from 'formik'

InputField.propTypes = {
  // 2 props pass from formik
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  // 4 props pass to InputField
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

function InputField(props) {
  const { field, form, type, label, placeholder, disabled } = props
  const { name, value, onChange, onBlur } = field // 4 important mandatory attributes of control
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        // or {...field} for 4 attributes above
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        // <FormFeedback> of reactstrap only show when parent element has class `invalid`
        invalid={showError}
      />

      {/* use <FormFeedback> of reactstrap for render error message */}
      {showError && <FormFeedback>{errors[name]}</FormFeedback>}
      {/* or using <ErrorMessage> of Formik */}
      {/* <ErrorMessage name={name} component={FormFeedback}></ErrorMessage> */}
    </FormGroup>
  )
}

export default InputField
