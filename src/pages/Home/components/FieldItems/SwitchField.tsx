import React from "react";
import FormControl from "src/components/Form/FormControl";
import FormGroup from "src/components/Form/FormGroup";
import FormLabel from "src/components/Form/FormLabel";

const SwitchField = ({ form, handleChange, inputClass }) => {
  const formProps = {
    placeholder: form.title.toLowerCase(),
    id: form?.tempId || form.code,
    type: form.type,
    inputClass,
  };
  switch (form.type) {
    case "radio": {
      return (
        <FormGroup>
          <FormLabel htmlFor={form?.tempFor || form.code}>
            {form.title}
          </FormLabel>
          <FormControl
            checked={!!form.value}
            value={!!form.value}
            onClick={(e) => {
              handleChange(e, form);
            }}
            {...formProps}
          ></FormControl>
        </FormGroup>
      );
    }
    default: {
      return (
        <FormGroup>
          <FormLabel htmlFor={form?.tempFor || form.code}>
            {form.title}
          </FormLabel>
          <FormControl
            value={form.value || ""}
            onChange={(e) => handleChange(e, form)}
            {...formProps}
          ></FormControl>
        </FormGroup>
      );
    }
  }
};

export default SwitchField;
