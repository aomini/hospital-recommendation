import React from "react";
import { SuccessButton } from "src/components/Button";
import SwitchField from "../FieldItems/SwitchField";

const MultipleComposite = ({
  field,
  handleMultipleCompositeClick,
  handleChange,
}) => {
  return (
    <>
      {field.field_items.map((form) => (
        <SwitchField handleChange={handleChange} key={form.id} form={form} />
      ))}
      <div className="col-span-2">
        <SuccessButton onClick={handleMultipleCompositeClick} type="button">
          Add new
        </SuccessButton>
      </div>
    </>
  );
};

export default MultipleComposite;
