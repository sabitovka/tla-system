import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

export default function ToastHandler({ items }) {
  return (
    <ToastContainer position='top-end' className="p-3">
      {
        items.map((item, index) => (
          <Toast key={index} bg="danger">
            <Toast.Header closeButton={true}>
              <strong className="me-auto">{item.header}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{item.text}</Toast.Body>
          </Toast>
        ))
      }
    </ToastContainer>
  );
}
