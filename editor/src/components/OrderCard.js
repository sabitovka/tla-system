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
      request(`${config.app.orderApiUrl}/app/web/api/orders?id=${orderId}`)
        .then((data) => {
            onOrderLoaded(data);
        });
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

const mapStateToProps = (state, ownProps) => {
    const { orderId } = ownProps;
    console.log(state, orderId, state.orders[orderId]);
    return { order: state.orders }
}

const mapDispatchToProps = (dispatch) => {
    console.log(2);
    return {
        onOrderLoaded: (fetched) => {
            return dispatch(actions.fetchOrder({ id: fetched.id, products: fetched.products, customer: fetched.customer }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
