import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Accordion from 'react-bootstrap/Accordion';
import Placeholder from 'react-bootstrap/Placeholder';
import ProductTable from './ProductTable';
import useHttp from "../hooks/http.hook";
import * as actions from "../store/actions"; 
import config from '../config/default';

export default function OrderCard({ orderId, eventKey }) {
  const { request, error } = useHttp();
  const order = useSelector((state) => state[orderId]);
  const dispatch = useDispatch();

  const fetchOrder = useCallback(async () => {
    try {
      const fetched = await request(`${config.app.orderApiUrl_}/orders/${orderId}?_include=products`);
      console.log(fetched)
      dispatch(actions.fetchOrder({ id: orderId, products: fetched.products, customer: fetched.customer }));
    } catch (e) {}
  }, [request, orderId, dispatch]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    if (error) {
      dispatch(actions.addError('Произошла ошибка при выполнении запроса. ', error));
      console.error(error);
    }
  }, [dispatch, error]);
  
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        { order ? `${order.id}` : <Placeholder xs={8} /> }
      </Accordion.Header>
      <Accordion.Body className='p-0'>
        { order && <ProductTable /> }
      </Accordion.Body>
    </Accordion.Item>
  )
}
