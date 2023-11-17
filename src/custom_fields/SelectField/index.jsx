import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label } from 'reactstrap'
import Select from 'react-select'

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
      />
    </FormGroup>
  )
}

export default SelectField
