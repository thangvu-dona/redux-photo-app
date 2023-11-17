import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import { ErrorMessage } from 'formik'

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
}

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
}

function SelectField(props) {
  const { form, field, options, label, placeholder, disabled } = props
  const { name, value } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  // find option was selected then binding to option value on UI
  const optionSelected = options.find((option) => option.value === value)

  const handleSelectOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    }
    field.onChange(changeEvent)
  }

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Select
        id={name}
        {...field}
        value={optionSelected}
        onChange={handleSelectOptionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
        className={showError ? 'is-invalid' : ''}
      />
      <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
    </FormGroup>
  )
}

export default SelectField
