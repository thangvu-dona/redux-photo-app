import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label } from 'reactstrap'

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
      />
    </FormGroup>
  )
}

export default InputField
