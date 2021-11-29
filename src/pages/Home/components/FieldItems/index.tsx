import React from "react";
import Lookup from "../Lookup";
import MultipleComposite from "../MultipleComposite";
import SwitchField from "./SwitchField";

const Wrapper = ({ children }) => (
  <div className="grid items-start grid-cols-2 gap-6">{children}</div>
);

const FieldItems = ({
  field,
  handleChange,
  handleMultipleCompositeClick,
  handleCompositeDelete,
  handleCompositeChange,
  inputClass = "",
}) => {
  const { multiple, composite, fromLookup } = field?.meta || {};
  console.log({ field });

  if (multiple && composite) {
    return (
      <Wrapper>
        <MultipleComposite
          field={field}
          handleChange={handleChange}
          handleCompositeChange={handleCompositeChange}
          handleCompositeDelete={handleCompositeDelete}
          handleMultipleCompositeClick={handleMultipleCompositeClick}
        />
      </Wrapper>
    );
  } else if (fromLookup) {
    console.log({ fromLookup });

    return <Lookup field={field} handleChange={handleChange} />;
  }

  return (
    <Wrapper>
      {field?.field_items?.map((form) => (
        <SwitchField
          handleChange={handleChange}
          key={form.id}
          form={form}
          inputClass={inputClass}
        />
      ))}
    </Wrapper>
  );
};

export default FieldItems;
