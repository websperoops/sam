import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// material
import {
  Card,
  Table,
  Stack,
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
} from "@mui/material";

//Action
import { getVisitedUser } from "../store/actions/visitedUser";

// Styles
import classes from './User.module.css';


// Components
import Modal from "../Component/Modal";
import Userform from "../Component/Userform";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phoneNo", label: "Phone No", alignRight: false },
  { id: "event", label: "Event Address", alignRight: false }
];

export default function User() {
  const dispatch = useDispatch();
  const { visitedUsers, loading } = useSelector((state) => state.visitedUserReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Event create/edit/delete
  const [create, setCreate] = useState(false);

  useEffect(() => {
    dispatch(getVisitedUser(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  //  //user create/edit/delete
  //  const handleCreate = () => {
  //   setCreate(true);
  // };

  const handleCancelLocation = () => {
    setCreate(false);
  };

  const onsubmitted = (values) => {
    // dispatch(insertEvent({eventdetails: values, page, rowsPerPage}));
    setCreate(false);
  }

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom sx={{fontSize:'24px',fontWeight: '700',color: '#212b36'}}>
          User
        </Typography>
        {/* <Button
          variant="contained"
          onClick={handleCreate}
          startIcon={<Box component={Icon} icon={"eva:plus-fill"} />}
          className={classes.userbutton}
        >
          New User
        </Button> */}
        <Modal
          open={create}
          handleCancel={handleCancelLocation}
          title="Create User"
          content={
            <Userform onsubmitted={onsubmitted}/>
          }
        />
      </Stack>
      <Card className={classes.userscontainer}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{padding: '16px', width: 'auto'}}>
                  {/* <Checkbox /> */}
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
                <TableRow >
                  <TableCell colSpan="10">
                    <Box sx={{ display: "flex", justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                visitedUsers && visitedUsers.users && visitedUsers.users.length === 0 && (
                  <TableRow >
                  <TableCell colSpan="10" >
                      No record found
                  </TableCell>
                </TableRow>
                )}
              {!loading &&
                visitedUsers && visitedUsers.users && visitedUsers.users.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>
                      {/* <Checkbox /> */}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {event.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{event.email}</TableCell>
                    <TableCell align="left">{event.phoneNo}</TableCell>
                    <TableCell align="left">{event.eventData.address}</TableCell>
                    {/* <TableCell align="right">
                      <Box component={Icon} icon={"eva:more-vertical-fill"} />
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={visitedUsers.totalRecord}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
        />
      </Card>
    </Container>    
  );
}
