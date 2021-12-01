import React from "react";
import Select from "react-select";
import FormGroup from "src/components/Form/FormGroup";
import FormLabel from "src/components/Form/FormLabel";

const e = {
  target: {
    name: null,
    value: null,
  },
  preventDefault() {},
};

const Lookup = ({ field, handleChange }) => {
  const handleSelectChange = (selected) => {
    handleChange(e, selected);
  };

  return (
    <FormGroup>
      <FormLabel htmlFor={field.meta.lookup_code}>{field.name}</FormLabel>
      <Select
        placeholder={`Choose ${field.name}..`}
        isClearable
        isSearchable
        id={field.meta.lookup_code}
        isMulti={field.meta.multiple}
        options={field.options}
        value={field.options.filter((x) => x.isSelected)}
        onChange={handleSelectChange}
      />
    </FormGroup>
  );
};

export default Lookup;
