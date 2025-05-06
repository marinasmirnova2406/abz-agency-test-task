import React, { useState } from "react";
import { useField, useFormikContext } from "formik";

type Props = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
};

export const BaseInput: React.FC<Props> = ({ label, name, type = "text" }) => {
  const [field, meta] = useField<string>(name);
  const formik = useFormikContext<any>();

  const [focused, setFocused] = useState(false);
  const showLabel = focused || field.value?.length > 0;
  const error = meta.touched && meta.error;

  // Custom change handler for phone input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type !== "tel") {
      field.onChange(e);
      return;
    }

    // Only digits:
    const digits = e.target.value.replace(/\D/g, "");

    // If less than 4 digits, reset to default
    if (digits.length < 4) {
      formik.setFieldValue(name, "+380");
      return;
    }

    // Limit to 9 digits and prefix with +380
    formik.setFieldValue(name, `+380${digits.replace(/^380/, "").slice(0, 9)}`);
  };

  // On focus: inject +380 if empty
  const handleFocus = () => {
    setFocused(true);

    if (type === "tel" && !field.value) {
      formik.setFieldValue(name, "+380");
    }
  };

  // On blur: clear if only +380 remains
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (type === "tel" && field.value === "+380")
      formik.setFieldValue(name, "");
    field.onBlur(e);
  };

  // Formatted display value for phone numbers
  const viewValue =
    type === "tel"
      ? focused || field.value?.length > 4
        ? field.value.replace(
            /^(\+380)(\d{0,3})(\d{0,3})(\d{0,3})$/,
            (_, p1, a, b, c) => [p1, a, b, c].filter(Boolean).join(" ")
          )
        : ""
      : field.value;

  return (
    <div className={`input-wrapper${error ? " input-wrapper--error" : ""}`}>
      <label
        htmlFor={name}
        className={`input-label${showLabel ? " input-label--active" : ""}`}
      >
        {label}
      </label>

      <input
        {...field}
        id={name}
        type={type}
        value={viewValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={showLabel ? "" : label}
        className="input"
        maxLength={type === "tel" ? 17 : undefined}
      />

      {error && <div className="input__error">{error}</div>}
    </div>
  );
};
