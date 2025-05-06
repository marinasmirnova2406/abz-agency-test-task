import React, { useRef } from "react";
import { useField, useFormikContext } from "formik";

type Props = { name: string };

export const FileInput: React.FC<Props> = ({ name }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [field, meta] = useField<File | null>(name);
  const formik = useFormikContext<any>();
  const error = meta.touched && meta.error;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Save the file into formik's state
    formik.setFieldValue(name, file);
    formik.setFieldTouched(name, true, false);

    // Check if file format is valid
    if (file.type !== "image/jpeg") {
      formik.setFieldError(name, "Only .jpg or .jpeg allowed");
    }

    // Check file size (should be <= 5MB)
    if (file.size > 5 * 1024 * 1024) {
      formik.setFieldError(name, "File must be less than 5MB");
    }

    // Check image dimensions (min: 70x70px)
    const img = new Image();
    img.onload = () => {
      if (img.width < 70 || img.height < 70) {
        formik.setFieldError(name, "Minimum size is 70x70px");
      }
    };
    img.onerror = () => {
      formik.setFieldError(name, "Invalid image file");
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className={`file-input${error ? " file-input--error" : ""}`}>
      <div className="file-input__wrapper">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="file-input__button"
        >
          Upload
        </button>
        <div
          className={`file-input__filename${
            field.value ? " file-input__filename--filled" : ""
          }`}
        >
          {field.value?.name || "Upload your photo"}
        </div>
      </div>

      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleSelect}
        accept="image/jpeg"
      />

      {error && <div className="file-input__error">{error}</div>}
    </div>
  );
};
