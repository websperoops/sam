import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';


// material
import {
  Table,
  Stack,
  Button,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Box,
  Paper
} from "@mui/material";

// Components
import Modal from "../Component/Modal";
import Createeventform from "../Component/Createeventform";
import Barcode from "../Component/Barcode";

//Action
import {
  getEvents,
  insertEvent,
  updateEvent,
  deleteEvent,
} from "../store/actions/events";

// Styles
import classes from "./Event.module.css";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "address", label: "Address", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "property_size", label: "Property Size", alignRight: false },
  { id: "dateTime", label: "Event Date", alignRight: false },
  { id: "rooms", label: "Room", alignRight: false },
  { id: "bedroom", label: "Bedroom", alignRight: false },
  { id: "bathroom", label: "Bathroom", alignRight: false },
  {
    id: "monthly_maintainance",
    label: "Monthly Maintainance",
    alignRight: false,
  },
  { id: "price_per_ft2", label: "Price Per ft2", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

export default function Event() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading } = useSelector((state) => state.eventReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Event create/edit/delete
  const [create, setCreate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [barcode, setBarcode] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    dispatch(getEvents(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  //events create/edit/delete
  const handleCreate = () => {
    setEditData();
    setCreate(true);
  };

  const handleEdit = (event) => {
    setEditData(event);
    setEditMode(true);
  };

  const onSubmitted = (values) => {
    if (editMode) {
      console.log(values);
      dispatch(updateEvent({ eventdetails: values, page, rowsPerPage }));
    } else {
      delete values._id;
      console.log(values);
      dispatch(insertEvent({ eventdetails: values, page, rowsPerPage }));
    }
    setCreate(false);
    setEditMode(false);
  };

  const handleCancelEvent = () => {
    setCreate(false);
    setEditMode(false);
  };

  const handleDeleteEvent = (ele) => {
    setIsDelete(ele._id);
  };

  const handleOkDelete = () => {
    dispatch(deleteEvent(isDelete, page, rowsPerPage));
    setIsDelete(false);
  };

  const handleCancelDelete = () => {
    setIsDelete(false);
  };

  //barcode handel
  const handleBarcode = (value) => {
    navigate(`/barcode/${value}`, { replace: true })
    // const url = BASE_URL + "/eventview/" + value;
    // setBarcodeurl(url);
    // setBarcode(true);
  };

  const handlePreview = (value) => {
    navigate(`/eventview/${value}`, { replace: true });
  }

  const handleCancelBarcode = () => {
    setBarcode(false);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: "24px", fontWeight: "700", color: "#212b36" }}
        >
          Events
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreate}
          startIcon={<Box component={Icon} icon={"eva:plus-fill"} />}
          className={classes.eventbutton}
        >
          Add New List
        </Button>
        <Modal
          open={create || editMode}
          handleCancel={handleCancelEvent}
          title={editMode ? "Edit List" : "Add List"}
          content={
            <Createeventform
              title={editMode ? "Edit List" : "Add List"}
              editdata={editData}
              onsubmitted={onSubmitted}
            />
          }
        />
        <Modal
          open={isDelete ? true : false}
          handleOk={handleOkDelete}
          handleCancel={handleCancelDelete}
          title="Delete Event"
          content={<div>Are you sure you want to delete?</div>}
          actions={true}
        />
        {/* <Modal
          open={barcode}
          handleCancel={handleCancelBarcode}
          title="Event Barcode"
          content={<Barcode barValue={barcodeurl} />}
        /> */}
      </Stack>
      {/* <Card className={classes.eventscontainer}> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{ padding: "16px", width: "auto" }}
                >
                </TableCell>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.alignRight ? "right" : "left"}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan="10">
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                events &&
                events.event &&
                events.event.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {event.address}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{event.price}</TableCell>
                    <TableCell align="left">{event.property_size}</TableCell>
                    <TableCell align="left">{event.dateTime}</TableCell>
                    <TableCell align="left">{event.rooms}</TableCell>
                    <TableCell align="left">{event.bedroom} </TableCell>
                    <TableCell align="left">{event.bathroom} </TableCell>
                    <TableCell align="left">
                      {event.monthly_maintainance}
                    </TableCell>
                    <TableCell align="left">{event.price_per_ft2}</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={5}
                      >
                        <Box
                          component={Icon}
                          icon={"akar-icons:edit"}
                          onClick={() => {
                            handleEdit(event);
                          }}
                        />
                        <Box
                          component={Icon}
                          icon={"ant-design:delete-twotone"}
                          onClick={() => {
                            handleDeleteEvent(event);
                          }}
                        />
                        <Box
                          component={Icon}
                          onClick={(e) => handlePreview(event._id)}
                          icon={"ic:outline-preview"}
                        />
                        <Box
                          component={Icon}
                          onClick={(e) => handleBarcode(event._id)}
                          icon={"bx:barcode-reader"}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={events.totalRecord}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
        />
      {/* </Card> */}
    </Container>
  );
}
