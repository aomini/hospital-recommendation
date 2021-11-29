import React from "react";
import FormControl from "src/components/Form/FormControl";
import FormGroup from "src/components/Form/FormGroup";
import FormLabel from "src/components/Form/FormLabel";

const SwitchField = ({ form, handleChange, inputClass }) => {
  switch (form.type) {
    case "radio": {
      return (
        <FormGroup>
          <FormLabel htmlFor={form.code}>{form.title}</FormLabel>
          <FormControl
            placeholder={form.title.toLowerCase()}
            id={form.code}
            type={form.type}
            checked={!!form.value}
            value={!!form.value}
            onClick={(e) => {
              handleChange(e, form);
            }}
            onChange={() => {}}
            inputClass={inputClass}
          ></FormControl>
        </FormGroup>
      );
    }
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
            inputClass={inputClass}
          ></FormControl>
        </FormGroup>
      );
    }
  }
};

export default SwitchField;
