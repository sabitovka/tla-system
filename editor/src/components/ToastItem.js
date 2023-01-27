import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Toast from "react-bootstrap/Toast";
import * as actions from "../store/actions";

export default function ToastItem({ item }) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(actions.deleteError(item.errorNumber));
    setShow(false);
  }

  return (
    <Toast bg="danger" show={show} onClose={handleClose}>
      <Toast.Header closeButton={true}>
          <strong className="me-auto">{item.header}</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{item.text}</Toast.Body>
    </Toast>
  )
}
