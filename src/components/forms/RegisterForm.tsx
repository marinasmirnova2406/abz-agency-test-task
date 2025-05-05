import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getPositions, Position } from "../../api/positions";
// Components
import { BaseInput } from "../common/inputs/BaseInput";
import { RadioGroup } from "../common/inputs/RadioGroup";
import { FileInput } from "../common/inputs/FileInput";
import Button from "../common/Button";

/* Yup‑валидация */
const emailPattern =
  /^(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Must be at least 2 characters")
    .max(60, "Must be at most 60 characters"),

  email: Yup.string()
    .required("Email is required")
    .min(6, "Must be at least 6 characters")
    .max(100, "Must be at most 100 characters")
    .matches(emailPattern, "Must be a valid email address"),

  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\+?380\d{9}$/, "Phone is required"),

  position_id: Yup.number()
    .required("Position is required")
    .typeError("Position must be selected")
    .min(1, "Position ID must be at least 1"),

  photo: Yup.mixed()
    .required("Photo is required")
    .test(
      "fileSize",
      "File must be less than 5MB",
      (file) => file instanceof File && file.size <= 5 * 1024 * 1024
    )
    .test(
      "fileFormat",
      "Only .jpg or .jpeg allowed",
      (file) => file instanceof File && ["image/jpeg"].includes(file.type)
    ),
});

export const RegisterForm: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    getPositions().then(setPositions);
  }, []);

  const handleSubmit = (values: any) => {
    console.log("📦 Submitted values:", values);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        position_id: 1,
        photo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="register-form">
        <BaseInput name="name" label="Your name" type="text" />
        <BaseInput name="email" label="Email" type="email" />
        <BaseInput name="phone" label="Phone" type="tel" />
        <RadioGroup name="position_id" options={positions} />
        <FileInput name="photo" />

        <Button type="submit">Sign up</Button>
      </Form>
    </Formik>
  );
};
