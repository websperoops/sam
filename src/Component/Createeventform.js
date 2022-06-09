import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";

// material
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Backdrop,
  CircularProgress,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Slider,
  Box,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

//Action
import { uploadEventImage } from "../store/actions/events";

// Styles
import classes from "./form.module.css";

const Createeventform = (props) => {
  const dispatch = useDispatch();
  const { loading, imgURI, imageLoading } = useSelector(
    (state) => state.eventReducer
  );
  const [ImageData, setImageData] = useState("");
  const [avatarPreview, setAvatarPreview] = useState('/assets/realestate_default.png');
  const { editdata } = props;

  //upload image
  const uploadHandler = () => {
    ImageData && dispatch(uploadEventImage(ImageData));
  };

  //Yup validation
  const EventSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    price: Yup.string().required("Price is required"),
    property_size: Yup.string().required("Property Size is required"),
    dateTime: Yup.string().required("Date & Time is required"),
    rooms: Yup.string().required("Rooms is required"),
    bedroom: Yup.string().required("Bedroom is required"),
    bathroom: Yup.string().required("Bathroom is required"),
    monthly_maintainance: Yup.string().required(
      "Monthly Maintainance is required"
    ),
    price_per_ft2: Yup.string().required("Price per ft2 is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required(
      "Image is required. Please select image and press upload button."
    ),
    fulltime_doorman: Yup.boolean(),
    swimming_poll: Yup.boolean(),
    cat_dog_allowd: Yup.boolean(),
    washer_dryer: Yup.boolean(),
  });

  //setup formik
  const initialValues = {
    address: "",
    price: "",
    property_size: "",
    dateTime: "",
    rooms: "",
    bedroom: "",
    bathroom: "",
    monthly_maintainance: "",
    price_per_ft2: "",
    fulltime_doorman: false,
    swimming_poll: false,
    cat_dog_allowd: false,
    washer_dryer: false,
    near_by_railwaystation: "10",
    near_by_busstand: "10",
    near_by_market: "10",
    description: "",
    image: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EventSchema,
    onSubmit: () => {
      const {
        address,
        price,
        property_size,
        dateTime,
        rooms,
        bedroom,
        bathroom,
        monthly_maintainance,
        price_per_ft2,
        fulltime_doorman,
        swimming_poll,
        cat_dog_allowd,
        washer_dryer,
        near_by_railwaystation,
        near_by_busstand,
        near_by_market,
        description,
        image,
      } = values;

      const _id = editdata && editdata._id ? editdata._id : "";
      const data = {
        _id,
        address,
        price,
        property_size,
        dateTime,
        rooms,
        bedroom,
        bathroom,
        monthly_maintainance,
        price_per_ft2,
        Amenities: {
          fulltime_doorman,
          swimming_poll,
          cat_dog_allowd,
          washer_dryer,
          near_by_railwaystation,
          near_by_busstand,
          near_by_market,
        },
        description,
        image,
      };
      props.onsubmitted(data);
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  //prefill values if editmode
  useEffect(() => {
    if (editdata) {
      const mainFields = [
        "address",
        "price",
        "property_size",
        "dateTime",
        "rooms",
        "bedroom",
        "bathroom",
        "monthly_maintainance",
        "price_per_ft2",
        "description",
        "fulltime_doorman",
        "swimming_poll",
        "cat_dog_allowd",
        "washer_dryer",
        "near_by_railwaystation",
        "near_by_busstand",
        "near_by_market",
        "image",
      ];
      //setinitialValues(editdata);
      mainFields.forEach((field) => {
        if (
          field === "fulltime_doorman" ||
          field === "swimming_poll" ||
          field === "cat_dog_allowd" ||
          field === "washer_dryer" ||
          field === "near_by_railwaystation" ||
          field === "near_by_busstand" ||
          field === "near_by_market"
        ) {
          setFieldValue(field, editdata.Amenities[field], false);
        } else {
          setFieldValue(field, editdata[field], false);
        }
      });
    }

    if (imgURI) {
      setFieldValue("image", imgURI, false);
    }
  }, [editdata, setFieldValue, imgURI]);
  return (
    <FormikProvider value={formik}>
      <Form
        className={classes.eventform}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>
          <Stack direction="column" alignItems="center" spacing={2}>
            {/* <label htmlFor="image">
              <input
                accept="image/*"
                id="image"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label> */}

            <label htmlFor="image">
              <input
                accept="image/*"
                id="image"
                name="image"
                type="file"
                hidden
                onChange={(event) => {
                  setImageData(event.currentTarget.files[0]);
                  // setFieldValue("image", event.currentTarget.files[0]);

                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      // setFieldValue("image", fileReader.result);
                      setAvatarPreview(fileReader.result);
                    }
                  };
                  fileReader.readAsDataURL(event.target.files[0]);
                }}
              />
              <img
                alt="Avatar Preview"
                src={values.image && !ImageData ? values.image : avatarPreview}
                style={{ width: "250px", height: "250px", borderRadius: "50%" }}
              />
            </label>

            <ErrorMessage
              name="image"
              render={(message) => {
                return (
                  <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root">
                    {message}
                  </p>
                );
              }}
            />
            <Button
              variant="contained"
              component="span"
              onClick={uploadHandler}
            >
              {imageLoading ? "Loading..." : "Upload"}
            </Button>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Typography
              sx={{
                color: "#212b36",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              Property Info
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Address"
              {...getFieldProps("address")}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />

            <TextField
              fullWidth
              autoComplete="price"
              label="Price"
              {...getFieldProps("price")}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="rooms">Room</InputLabel>
              <Select
                labelId="rooms"
                label="Room"
                {...getFieldProps("rooms")}
                error={Boolean(touched.rooms && errors.rooms)}
                helperText={touched.rooms && errors.rooms}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="1">One</MenuItem>
                <MenuItem value="2">Two</MenuItem>
                <MenuItem value="3">Three</MenuItem>
                <MenuItem value="4">Four</MenuItem>
                <MenuItem value="5">Five</MenuItem>
                <MenuItem value="6">Six</MenuItem>
                <MenuItem value="7">Seven</MenuItem>
                <MenuItem value="8">Eight</MenuItem>
                <MenuItem value="9">Nine</MenuItem>
                <MenuItem value="10">Ten</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="bedroom">Bedroom</InputLabel>
              <Select
                labelId="bedroom"
                label="Bedroom"
                {...getFieldProps("bedroom")}
                error={Boolean(touched.bedroom && errors.bedroom)}
                helperText={touched.bedroom && errors.bedroom}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="1">One</MenuItem>
                <MenuItem value="2">Two</MenuItem>
                <MenuItem value="3">Three</MenuItem>
                <MenuItem value="4">Four</MenuItem>
                <MenuItem value="5">Five</MenuItem>
                <MenuItem value="6">Six</MenuItem>
                <MenuItem value="7">Seven</MenuItem>
                <MenuItem value="8">Eight</MenuItem>
                <MenuItem value="9">Nine</MenuItem>
                <MenuItem value="10">Ten</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="bathroom">Bathroom</InputLabel>
              <Select
                labelId="bathroom"
                label="Bathroom"
                {...getFieldProps("bathroom")}
                error={Boolean(touched.bathroom && errors.bathroom)}
                helperText={touched.bathroom && errors.bathroom}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="1">One</MenuItem>
                <MenuItem value="2">Two</MenuItem>
                <MenuItem value="3">Three</MenuItem>
                <MenuItem value="4">Four</MenuItem>
                <MenuItem value="5">Five</MenuItem>
                <MenuItem value="6">Six</MenuItem>
                <MenuItem value="7">Seven</MenuItem>
                <MenuItem value="8">Eight</MenuItem>
                <MenuItem value="9">Nine</MenuItem>
                <MenuItem value="10">Ten</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Property Size(in ft and m)"
              {...getFieldProps("property_size")}
              error={Boolean(touched.property_size && errors.property_size)}
              helperText={touched.property_size && errors.property_size}
            />

            <TextField
              fullWidth
              id="datetime-local"
              label="Date & Time"
              type="datetime-local"
              spacing={1}
              InputLabelProps={{
                shrink: true,
              }}
              {...getFieldProps("dateTime")}
              error={Boolean(touched.dateTime && errors.dateTime)}
              helperText={touched.dateTime && errors.dateTime}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Typography
              sx={{
                color: "#212b36",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              Financial
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Monthly Maintenance"
              {...getFieldProps("monthly_maintainance")}
              error={Boolean(
                touched.monthly_maintainance && errors.monthly_maintainance
              )}
              helperText={
                touched.monthly_maintainance && errors.monthly_maintainance
              }
            />

            <TextField
              fullWidth
              label="Price per ft2"
              {...getFieldProps("price_per_ft2")}
              error={Boolean(touched.price_per_ft2 && errors.price_per_ft2)}
              helperText={touched.price_per_ft2 && errors.price_per_ft2}
            />
          </Stack>

          <FormGroup>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Typography
                sx={{
                  color: "#212b36",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                Amenities
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-around"
              spacing={5}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("fulltime_doorman")}
                    checked={values.fulltime_doorman}
                  />
                }
                label="Fulltime doorman"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("swimming_poll")}
                    checked={values.swimming_poll}
                  />
                }
                label="Swimming Poll"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("cat_dog_allowd")}
                    checked={values.cat_dog_allowd}
                  />
                }
                label="Cat/Dog Allowed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("washer_dryer")}
                    checked={values.washer_dryer}
                  />
                }
                label="Washer Dryer"
              />
            </Stack>
          </FormGroup>

          <FormGroup>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-around"
              spacing={2}
            >
              <Box>
                <Typography id="near_by_railwaystation" gutterBottom>
                  NearBy Railwaystation
                </Typography>
                <Slider
                  defaultValue={50}
                  aria-labelledby="near_by_railwaystation"
                  valueLabelDisplay="auto"
                  {...getFieldProps("near_by_railwaystation")}
                />
              </Box>

              <Box>
                <Typography id="near_by_busstand" gutterBottom>
                  NearBy Busstand
                </Typography>
                <Slider
                  defaultValue={50}
                  aria-labelledby="near_by_busstand"
                  valueLabelDisplay="auto"
                  {...getFieldProps("near_by_busstand")}
                />
              </Box>

              <Box>
                <Typography id="near_by_market" gutterBottom>
                  NearBy Market
                </Typography>
                <Slider
                  defaultValue={50}
                  aria-labelledby="near_by_market"
                  valueLabelDisplay="auto"
                  {...getFieldProps("near_by_market")}
                />
              </Box>
            </Stack>
          </FormGroup>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={5}
              {...getFieldProps("description")}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            sx={{ boxShadow: "#3529e94d 0px 8px 16px 0px" }}
          >
            {props.title}
          </LoadingButton>
        </Stack>
      </Form>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </FormikProvider>
  );
};

export default Createeventform;
