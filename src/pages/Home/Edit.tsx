import React from "react";
import { useParams } from "react-router-dom";
import { StyledButton } from "src/components/Button";
import { H1 } from "src/components/Typography";
import instance from "src/utils/axios";
import FieldItems from "./components/FieldItems";

const initialFormData = {
  id: null,
  meta: null,
};

const Edit = () => {
  const [fields, setFields] = React.useState<any>({
    rows: [],
    activeIndex: 0,
  });
  const [hospitalData, setHospitalData] = React.useState<any>(null);
  const [formData, setFormData] = React.useState<any>({ ...initialFormData });
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
        setFormData({ ...initialFormData });
        getFieldsFromLookUp(activeField, hospitalData);
      } else {
        // set field values
        const hospitalDetails = hospitalData.HospitalDetails;
        let field_items = [...activeField.field_items];
        hospitalDetails.map((x) => {
          field_items = field_items.map((y) =>
            y.id === x.field_item_id ? { ...y, value: x.value.value } : y
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

  React.useEffect(() => {
    if (
      formData?.id &&
      formData?.meta &&
      formData?.meta?.composite &&
      formData?.meta?.multiple
    ) {
      getComposite(id, formData.id);
    }
  }, [id, formData.id, formData.meta]);

  const getFields = () => {
    instance
      .get("/fields")
      .then((res) => {
        setFields((prev) => ({ ...prev, rows: res.data }));
      })
      .catch(() => {});
  };

  const getFieldsFromLookUp = (activeField, hospitalData) => {
    const { lookup_code } = activeField.meta;
    instance
      .get(`/lookups/${lookup_code}`)
      .then((res) => {
        console.log({ activeField, hospitalData });

        const selectedValues = hospitalData.HospitalDetails.find(
          (x) => x.field_item_id === activeField.field_items[0]?.id
        );
        let options = res.data.LookupValues;

        if (selectedValues)
          options = res.data.LookupValues.map((x) => ({
            ...x,
            isSelected: selectedValues.value.value.find((y) => y === x.id)
              ? true
              : false,
          }));
        setFormData({
          ...activeField,
          options,
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const getComposite = (hospital_id, field_id) => {
    instance
      .get(`/composite/${hospital_id}/${field_id}`)
      .then((res) => {
        setFormData((prev) => ({
          ...prev,
          field_data: res?.data?.values || [],
        }));
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
    if (formData?.meta?.lookup_code) {
      if (formData.meta.multiple) {
        // update data for look up fields
        setFormData((prev) => ({
          ...prev,
          options: prev.options.map((x) =>
            form.find((y) => y.id === x.id)
              ? { ...x, isSelected: true }
              : { ...x, isSelected: false }
          ),
        }));
      }
    } else {
      setFormData((formData) => ({
        ...formData,
        field_items: formData.field_items.map((x) =>
          x.id === form.id
            ? {
                ...x,
                value: form.type === "radio" ? !x.value : e.target.value,
              }
            : x
        ),
      }));
    }
  };

  const handleMultipleCompositeClick = () => {
    setFormData((prev) => ({
      ...prev,
      field_data: [
        ...(prev.field_data || []),
        prev.field_items.map((y) => ({
          field_item_id: y.id,
          value: y.value,
        })),
      ],
      field_items: prev.field_items.map((x) => ({ ...x, value: "" })),
    }));
  };

  const handleCompositeDelete = (xIndex) => {
    setFormData((prev) => ({
      ...prev,
      field_data: prev.field_data.filter((x, index) => index !== xIndex),
    }));
  };

  const handleCompositeChange = (e, xIndex, id) => {
    setFormData((prev) => ({
      ...prev,
      field_data: prev.field_data.map((x, index) => {
        let newX = [...x];
        if (index === xIndex) {
          newX = newX.map((y) =>
            y.field_item_id === id ? { ...y, value: e.target.value } : y
          );
        }
        return newX;
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload;
    let url;
    const { lookup_code, composite, multiple } = formData?.meta || {};

    if (multiple && composite) {
      url = `/composite/${id}/${formData.id}`;
    } else {
      url = `/hospitals/${id}/${formData.id}`;
    }

    if (multiple && composite) {
      payload = formData.field_data || [];
    } else if (lookup_code) {
      if (multiple) {
        payload = [
          {
            field_item_id: formData.field_items[0].id,
            value: formData.options
              .filter((x) => x.isSelected)
              .map((x) => x.id),
          },
        ];
      }
    } else {
      payload = formData.field_items
        .filter((x) =>
          x.type === "radio" ? typeof x.value === "boolean" : x.value
        )
        .map((x) => ({
          field_item_id: x.id,
          value: x.value,
        }));
    }

    const status =
      fields.rows.length - 1 === fields.activeIndex ? "published" : null;

    instance
      .put(url, payload, {
        params: {
          status,
        },
      })
      .then((res) => {
        getHospitalData(id);
        if (fields.activeIndex < fields.rows.length - 1) handleNext();
      })
      .catch(() => {});
  };
  return (
    <div>
      <H1 className="mt-4 mb-2 font-medium">
        Hospital {hospitalData?.HospitalDetails.length ? "Update" : "Create"}
      </H1>
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
                    : null
                }`}
              >
                {field.name}
              </li>
            ))}
          </ul>
        </aside>
        {/* field values */}
        <section className=" col-span-9">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="p-4 bg-gray-100 rounded-sm">
                {formData && (
                  <FieldItems
                    field={formData}
                    handleCompositeDelete={handleCompositeDelete}
                    handleMultipleCompositeClick={handleMultipleCompositeClick}
                    handleChange={handleChange}
                    handleCompositeChange={handleCompositeChange}
                    inputClass="p-3 rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-between">
                {fields.activeIndex === 0 ? (
                  <div></div>
                ) : (
                  <StyledButton onClick={handlePrev} sm primary>
                    Previous
                  </StyledButton>
                )}

                {fields.rows.length === fields.activeIndex ? (
                  <div></div>
                ) : (
                  <StyledButton type="submit" sm success>
                    {fields.activeIndex === fields.rows.length - 1
                      ? "Save and Finish"
                      : "Save and Continue"}
                  </StyledButton>
                )}
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Edit;
