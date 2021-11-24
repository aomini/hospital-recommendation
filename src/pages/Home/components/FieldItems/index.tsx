import React from "react";
import Select from "react-select";
import FormControl from "src/components/Form/FormControl";
import FormGroup from "src/components/Form/FormGroup";
import FormLabel from "src/components/Form/FormLabel";

const SwitchField = ({ form, handleChange }) => {
  switch (form.type) {
    default: {
      return (
        <FormGroup>
          <FormLabel htmlFor={form.code}>{form.title}</FormLabel>
          <FormControl
            placeholder={form.title.toLowerCase()}
            id={form.code}
            type={form.type}
            value={form.value || ""}
            onChange={(e) => handleChange(e, form)}
          ></FormControl>
        </FormGroup>
      );
    }
  }
};

const FieldItems = ({ field, handleChange }) => {
  if (field?.meta?.fromLookup) {
    return (
      <FormGroup>
        <FormLabel htmlFor={field.meta.lookup_code}>{field.name}</FormLabel>
        <Select
          placeholder={`Choose ${field.name}..`}
          isClearable
          isSearchable
          id={field.meta.lookup_code}
          isMulti={field.meta.multiple}
          options={field.field_items}
        />
      </FormGroup>
    );
  }
  return (
    <div className="grid items-start grid-cols-2 gap-6">
      {field.field_items.map((form) => (
        <SwitchField handleChange={handleChange} key={form.id} form={form} />
      ))}
    </div>
  );
};

export default FieldItems;
