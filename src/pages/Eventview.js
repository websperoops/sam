import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Modal from "../Component/Modal";
import Userform from "../Component/Userform";

//Action
import { getEventById } from "../store/actions/events";

// Styles
import classes from "./Eventview.css";

const Eventview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { event } = useSelector((state) => state.eventReducer);
  //Event create/edit/delete
  const [create, setCreate] = useState(false);

  //user create/edit/delete
  const handleCreate = () => {
    setCreate(true);
  };

  const handleCancelLocation = () => {
    setCreate(false);
  };

  const onsubmitted = (values) => {
    setCreate(false);
  }

  useEffect(() => {
    dispatch(getEventById(id));
  }, [dispatch, id]);

  return (
    <>
      <div class="top-banner">
        <img alt="bannerImage" src={event.image} />
      </div>
      <div class="description-content">
        <div class="container">
          <div class="description-box">
            <div class="greyline"></div>
            <h3>Information</h3>
            <p class="price-p">Price : <span>${event.price}</span> </p>
            <h4>{event.address}</h4>
            <p class="sarah"><img alt="userImage" src="/img/user.png" /> {event && event.eventData && event.eventData.username}</p>
            <p class="property">Property Size : {event.property_size}<sup>2</sup> </p>
            <div class="amazing-para">
              <p>{event.description}.</p>
              <ul>
                <li><img alt="roomImage" src="/img/plans.png" /> <span>Room</span> {event.rooms} rooms </li>
                <li><img alt="bedroomImage" src="/img/bed.png" /> <span>Bedroom</span> {event.bedroom} bedroom </li>
                <li><img alt="bathroomImage" src="/img/bathtub.png" /> <span>Bathroom</span> {event.bathroom} bathroom </li>
              </ul>
            </div>
            <div class="financial">
              <h3>Financial</h3>
              <p>Property Price : ${event.price}</p>
              <p>Monthly Maintenance : ${event.monthly_maintainance}</p>
              <p>Price per ft : ${event.price_per_ft2}</p>
            </div>
            <div class="financial">
              <h3>House surroundings </h3>
              <p>Close Railway station : {event && event.Amenities && event.Amenities.near_by_railwaystation}km</p>
              <p>Close Bus stand : {event && event.Amenities && event.Amenities.near_by_busstand}km</p>
              <p>Market : {event && event.Amenities && event.Amenities.near_by_market}km</p>
            </div>
            <div class="ammenties">
              <h3>Amenities</h3>
              <div class="ammenties-box">
                <ul>
                  {event && event.Amenities && event.Amenities.fulltime_doorman && <li>
                    <div class="img-amment"><img alt="doormanImage" src="/img/doorman.png" /> </div>
                    <div class="amment-head">
                      <h2>Full-time Doorman</h2>
                      <p>Lorem Ipsum is simply dummy tex</p>
                    </div>
                  </li>}
                  {event && event.Amenities && event.Amenities.swimming_poll && <li>
                    <div class="img-amment"><img alt="swimmingImage" src="/img/swimming-pool.png" /> </div>
                    <div class="amment-head">
                      <h2>Indoor Swimming Pool</h2>
                      <p>Lorem Ipsum is simply dummy tex</p>
                    </div>
                  </li>}
                  {event && event.Amenities && event.Amenities.washer_dryer && <li>
                    <div class="img-amment"><img alt="washerImage" src="/img/washer.png" /> </div>
                    <div class="amment-head">
                      <h2>Washer/Dryer In-Unit</h2>
                      <p>Lorem Ipsum is simply dummy tex</p>
                    </div>
                  </li>}
                  {event && event.Amenities && event.Amenities.cat_dog_allowd && <li>
                    <div class="img-amment"><img alt="allowImage" src="/img/paws.png" /> </div>
                    <div class="amment-head">
                      <h2>Cats and Dogs Allowed</h2>
                      <p>Lorem Ipsum is simply dummy tex</p>
                    </div>
                  </li>}
                </ul>
                  <Modal
                    open={create}
                    handleCancel={handleCancelLocation}
                    title="Check In"
                    popupWidth="sm"
                    content={
                      <Userform event={event} onsubmitted={onsubmitted} />
                    }
                  />
                <div class="booking-button">
                  <a onClick={handleCreate}>Check In</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Eventview;