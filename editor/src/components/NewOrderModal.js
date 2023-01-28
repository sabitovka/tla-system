import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import useHttp from '../hooks/http.hook';
import * as actions from '../store/actions';
import config from '../config/default';
import { NewOrderModalItem } from "./NewOrderModalItem";

export default function NewOrderModal(props) {
  const [show, setShow] = useState(false);
  const { request } = useHttp();
  const orders = useSelector((state) => state.allOrders);
  const ordersQueue = useSelector((state) => state.ordersQueue);
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (show && !orders.length) {
      request(`http://transportloading/app/web/api/orders/all?forLoadingId=${loading.id}`)
      .then((data) => dispatch(actions.fetchAllOrder(data)))
      .catch((err) => dispatch(actions.addError(err)));
    }
  }, [orders, show, request, dispatch, loading.id]);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    request(
      `${config.app.orderApiUrl}/app/web/api/orders/save-batch`,
      'POST',
      ordersQueue
    )
    .then(() => {
      window.location.reload();
    })
    .catch((e) => dispatch(actions.addError('Произошла ошибка при выполнении запроса', e.message)));
  }

  const addToQueue = (order, action) => {
    dispatch(actions.addOrder(order, loading.id, action));
  }

  const removeFromQueue = (product) => {
    dispatch(actions.removeOrder(product, loading.id));
  } 

  const ordersCount = useMemo(() => orders.filter((order) => order.isSelected).length, [orders]);

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
              {
                orders.map((order, idx) => <NewOrderModalItem
                  order={order}
                  key={idx}
                  addToQueue={addToQueue}
                  removeFromQueue={removeFromQueue} />)
              }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <div className='float-left'>
            Выбрано зказов: {ordersCount + ordersQueue.length}/{orders.length}
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}