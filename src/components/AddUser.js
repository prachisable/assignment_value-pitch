import React, { useMemo } from "react";
//import ReactDOM from "react-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import countryList from "react-select-country-list";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { getUserData, setUserData } from "./UserDataTable";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  dateOfBirth: Yup.date()
    .transform((value) => {
      return value ? moment(value).toDate() : value;
    })
    .required("Date of Birth is required")
    .max(moment(), "Future date not allowed"),

  email: Yup.string()
    .email("Wrong email format")
    .required("Please enter your email"),
  country: Yup.mixed().required("Please select country").nullable(true),
  address: Yup.string().required("Please enter your address"),
});

export default function AddUser() {
  const location = useLocation();
  const userList = getUserData();
  const navigate = useNavigate();

  const options = useMemo(() => countryList().getData(), []);
  const Error = ({ error }) => {
    if (error) {
      return <div className="text-danger">{error}</div>;
    }
    return <div />;
  };

  const initialValues = {
    name: location.state !== null ? location.state.data.name : "",
    email: location.state !== null ? location.state.data.email : "",
    country: location.state !== null ? location.state.data.country : "",
    dateOfBirth: location.state !== null ? location.state.data.dateOfBirth : "",
    address: location.state !== null ? location.state.data.address : "",
    id: location.state !== null ? location.state.data.id : "",
  };
  return (
    <div className="container">
      <h1>Add User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={location.state}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let payload = values;
          let list = [...userList];
          payload.country = values.country.value;
          if (!payload.id) {
            payload.id = Math.floor(Math.random() * 100) + 1;
            list.push(payload);
          } else {
            let index = list.findIndex((item) => item.id == payload.id);
            list[index] = payload;
          }
          setUserData(list);
          navigate("/user-data");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Name</label>
                <br />
                <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  name="name"
                  placeholder="Your name please"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="form-control"
                  type="text"
                />
                <Error touched={touched.name} error={errors.name} />
              </div>
              <br></br>

              <div>
                <label>Email</label>
                <br />
                <TextField
                  id="outlined-basic"
                  label="email"
                  name="email"
                  placeholder="Your email please"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="form-control"
                  type="email"
                />
                <Error touched={touched.email} error={errors.email} />
              </div>
              <br></br>

              <div>
                <label>Date Of Birth</label>
                <br />
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Your date of birth please"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfBirth}
                  className="form-control"
                />
                <Error
                  touched={touched.dateOfBirth}
                  error={errors.dateOfBirth}
                />
              </div>
              <br></br>

              <div>
                <label>Address</label>
                <br />
                <TextField
                  id="outlined-multiline-flexible"
                  label="address"
                  multiline
                  maxRows={4}
                  name="address"
                  placeholder="Your address please"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className="form-control"
                />

                <Error touched={touched.address} error={errors.address} />
              </div>
              <br></br>

              <div>
                <label>Country</label>
                <div class="custom-select">
                  <Select
                    options={options}
                    value={
                      options
                        ? options.find(
                            (option) => option.value === values.country
                          )
                        : ""
                    }
                    name="country"
                    onChange={(selectedOption) => {
                      setFieldValue("country", selectedOption);
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                <Error touched={touched.country} error={errors.country} />
              </div>
              <br></br>
              <br></br>

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
