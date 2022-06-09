import QRCode from "qrcode.react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Action
import { getEventById } from "../store/actions/events";

const Barcode = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.eventReducer);
  const BASE_URL = process.env.REACT_APP_FRONTEND;
  const url = BASE_URL + "/eventview/" + id;

  useEffect(() => {
    dispatch(getEventById(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="qr_div">
        <div id="canvas" className="barcodeclass">
          <QRCode size={300} value={url} />
        </div>
        <div className="scan_here">
          <h3>Welcome! scan here</h3>
          <p>Please scan the QR code above to get more information about open house({event.address})</p>
        </div>
      </div>


    </>
  )
}

export default Barcode