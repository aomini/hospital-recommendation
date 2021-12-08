import React from "react";
import { Button } from "@mui/material";
import { SuccessButton } from "src/components/Button";
import SwitchField from "../FieldItems/SwitchField";

const MultipleComposite = ({
  field,
  handleChange,
  handleMultipleCompositeClick,
  handleCompositeDelete,
  handleCompositeChange,
}) => {
  const getForm = (id) => field.field_items.find((x) => x.id === id);
  return (
    <>
      {field.field_items.map((form) => (
        <SwitchField
          inputClass=""
          handleChange={handleChange}
          key={form.id}
          form={form}
        />
      ))}
      <div className="col-span-2">
        <SuccessButton onClick={handleMultipleCompositeClick} type="button">
          Add new
        </SuccessButton>
      </div>
      {field?.field_data && !!field.field_data.length && (
        <div className="bg-gray-300 rounded p-2 grid gap-4 col-span-2">
          {field?.field_data?.map((x, xIndex) => (
            <div
              className="grid gap-2 rounded shadow-md p-2 grid-cols-2 bg-gray-100"
              key={xIndex}
            >
              {x.map((y, yIndex) => (
                <SwitchField
                  handleChange={(e) =>
                    handleCompositeChange(e, xIndex, y.field_item_id)
                  }
                  inputClass=""
                  key={y.field_item_id}
                  form={{
                    ...getForm(y.field_item_id),
                    tempId: `${y.field_item_id}-${xIndex}-${yIndex}`,
                    tempFor: `${y.field_item_id}-${xIndex}-${yIndex}`,
                    value: y.value,
                  }}
                />
              ))}
              <div className="col-span-2">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCompositeDelete(xIndex)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MultipleComposite;
