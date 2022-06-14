import { ChangeEventHandler } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";

interface Props {
  changeHandler: ChangeEventHandler<HTMLFormElement>;
  maxItems: number;
}
type error = {
  id?: string;
};

type Values = {
  id: string | number;
};

const initialValues: Values = {
  id: "",
};

const InputId = (props: Props) => {
  return (
    <Formik<Values>
      initialValues={initialValues}
      validate={(values) => {
        let errors: error = {};
        if (typeof values.id === "number" && values.id > props.maxItems - 1) {
          errors.id = `id must be smaller than ${props.maxItems}`;
        } else if (typeof values.id === "number" && values.id < 1) {
          errors.id = "id must be higher than 0";
        }
        return errors;
      }}
      initialTouched={{ id: true }}
      onSubmit={() => {}}
    >
      {(formik) => {
        return (
          <Form onChange={props.changeHandler}>
            <Field
              component={TextField}
              name="id"
              type="number"
              label="filter data by ID"
              variant="filled"
            />
            {!formik.errors.id && <div style={{ height: "23px" }}></div>}
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputId;
