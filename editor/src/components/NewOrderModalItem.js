import Form from 'react-bootstrap/Form';

export function NewOrderModalItem({ order, addToQueue, removeFromQueue }) {
    function onCheckChange(e) {
        const checked = e.target.checked       
        var fn;
        if (order.isSelected) {
          fn = checked ? removeFromQueue : addToQueue;
        } else {
          fn = checked ? addToQueue : removeFromQueue;
        }
        fn(order, order.isSelected ? 'delete' : 'insert');
    
      }

    return (
        <tr>
            <td><Form.Check type="checkbox" defaultChecked={!!order.isSelected} onChange={onCheckChange} /></td>
            <td>{order.customer.name}</td>
            <td>{order.customer.tel}</td>
            <td>{order.customer.adress}</td>
            <td>{order.totalQuantity} шт.</td>
            <td>{order.total} руб.</td>
        </tr>
    )
}