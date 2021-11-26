import React from "react";
import { useParams } from "react-router-dom";

import { StyledButton } from "src/components/Button";
import { H1 } from "src/components/Typography";
import AuthLayout from "src/layout/AuthLayout";
import instance from "src/utils/axios";

import FieldItems from "./components/FieldItems";

const Edit = () => {
  const [fields, setFields] = React.useState<any>({
    rows: [],
    activeIndex: 0,
  });
  const [hospitalData, setHospitalData] = React.useState<any>(null);
  const [formData, setFormData] = React.useState<any>(null);
  const { id } = useParams();

  const getHospitalData = (id) => {
    instance
      .get(`/hospitals/${id}`)
      .then((res) => {
        setHospitalData(res.data);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    getHospitalData(id);
  }, [id]);

  React.useEffect(() => {
    getFields();
  }, []);

  React.useEffect(() => {
    if (hospitalData && fields.rows.length) {
      const activeField = fields.rows[fields.activeIndex] || null;
      if (activeField?.meta?.fromLookup) {
        setFormData(null);
        getFieldsFromLookUp(activeField);
      } else {
        const hospitalDetails = hospitalData.HospitalDetails;
        let field_items = [...activeField.field_items];
        hospitalDetails.map((x) => {
          field_items = field_items.map((y) =>
            y.id === x.FieldItem.id ? { ...y, value: x.value.value } : y
          );
          x.field_items = field_items;
          return x;
        });
        const d = { ...activeField };
        d.field_items = field_items;
        setFormData(d);
      }
    }
  }, [hospitalData, fields.rows, fields.activeIndex]);

  const getFields = () => {
    instance
      .get("/fields")
      .then((res) => {
        setFields((prev) => ({ ...prev, rows: res.data }));
      })
      .catch(() => {});
  };

  const getFieldsFromLookUp = (activeField) => {
    const { lookup_code } = activeField.meta;
    instance
      .get(`/lookups/${lookup_code}`)
      .then((res) => {
        setFormData({
          ...activeField,
          field_items: res.data.LookupValues,
        });
      })
      .catch(() => {});
  };

  const handleClick = (index) => {
    // if (index < fields.activeIndex)
    setFields((prev) => ({ ...prev, activeIndex: index }));
  };

  const handleNext = () => {
    setFields((field) => ({ ...field, activeIndex: field.activeIndex + 1 }));
  };

  const handlePrev = () => {
    setFields((field) => ({ ...field, activeIndex: field.activeIndex - 1 }));
  };

  const handleChange = (e, form) => {
    setFormData((formData) => ({
      ...formData,
      field_items: formData.field_items.map((x) =>
        x.id === form.id ? { ...x, value: e.target.value } : x
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = formData.field_items
      .filter((x) => x.value)
      .map((x) => ({
        field_item_id: x.id,
        value: x.value,
      }));

    instance
      .put(`/hospitals/${id}/${formData.id}`, payload)
      .then((res) => {
        handleNext();
      })
      .catch(() => {});
  };
  return (
    <AuthLayout>
      <H1 className="mt-4 mb-2 font-medium">Hospitals Edit</H1>
      <div className=" grid grid-cols-12 gap-6">
        <aside className=" col-span-3">
          <ul className="bg-gray-100 rounded-md">
            {fields.rows.map((field, index) => (
              <li
                key={field.id}
                onClick={() => handleClick(index)}
                className={`p-3 px-5 cursor-pointer rounded-sm hover:bg-gray-300 ${
                  index === fields.activeIndex
                    ? "bg-pink-600 hover:bg-pink-600 text-white"
                    : index > fields.activeIndex
                    ? "text-gray-500"
                    : null
                }`}
              >
                {field.name}
              </li>
            ))}
          </ul>
        </aside>
        <section className="col-span-9">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="p-4 bg-gray-100 rounded-sm">
                {formData && (
                  <FieldItems
                    handleChange={handleChange}
                    field={formData}
                    inputClass="p-3 rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-between">
                {fields.activeIndex === 0 ? (
                  <div></div>
                ) : (
                  <StyledButton onClick={handlePrev} sm>Back</StyledButton>
                )}

                {fields.rows.length === fields.activeIndex ? (
                  <div></div>
                ) : (
                  <StyledButton type="submit" sm success>
                    Next
                  </StyledButton>
                )}
              </div>
            </div>
          </form>
        </section>
      </div>
    </AuthLayout>
  );
};

export default Edit;
