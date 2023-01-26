import { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import Accordion from 'react-bootstrap/Accordion';
import Placeholder from 'react-bootstrap/Placeholder';
import ProductTable from './ProductTable';
import useHttp from "../hooks/http.hook";
import * as actions from "../store/actions"; 
import config from '../config/default';

const OrderCard = ({ orderId, order, eventKey, onOrderLoaded }) => {
  const { request, error } = useHttp();

  const fetchOrder = useCallback(async () => {
    try {
      const data = await request(`${config.app.orderApiUrl}/app/web/api/orders/${orderId}`)
      onOrderLoaded(data)
    } catch (e) {}
  }, [request, orderId, onOrderLoaded]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    if (error) {
      // dispatch(actions.addError('Произошла ошибка при выполнении запроса. ', error));
      console.error(error);
    }
  }, [/* dispatch, */ error]);

  const header = (order) => {
    if (order && order.customer) {
      return `Заказ №${order.id} - ${order.customer.name}, ${order.customer.adress}, ${order.customer.tel}`;
    }
    return <Placeholder xs={8} />
  }

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        { header(order) }
      </Accordion.Header>
      <Accordion.Body className='p-0'>
        { order?.products && <ProductTable products={order.products} /> }
      </Accordion.Body>
    </Accordion.Item>
  )
}

const mapStateToProps = (state, ownProps) => {
    const { orderId } = ownProps;
    return {
      order: state.orders.find((order) => orderId === order.orderId),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderLoaded: (fetched) => {
            return dispatch(actions.fetchOrder(fetched))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
