import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function NewOrderModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div {...props}>
      <Button variant="success" onClick={handleShow}>
        Выбрать заказ
      </Button>

      <Modal 
        show={show}
        onHide={handleClose}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Список заказов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Заказчик</th>
                <th>Телефон</th>
                <th>Адрес</th>
                <th>Товаров всего</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Form.Check type="checkbox" /></td>
                <td>Заказчик</td>
                <td>Телефон</td>
                <td>Адрес</td>
                <td>Товаров всего</td>
                <td>Сумма</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <div className='float-left'>
            Выбрано зказов: 6/7
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}