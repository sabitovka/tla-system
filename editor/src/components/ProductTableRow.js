import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function ProductTableRow({ product, onChecked, onUnchecked }) {
  const [loaded, setLoaded] = useState(product.isLoaded);

  function onCheckChange(e) {
    const checked = e.target.checked
    setLoaded(checked);
    const fn = checked ? onChecked : onUnchecked;
    fn(product, product.isLoaded ? 'delete' : 'insert');
  }

  const style = {
    bg: loaded ? 'bg-success' : 'bg-warning',
    text: loaded ? 'text-light' : 'text-dark',
  }

  return (
    <tr className={style.bg}>
      <td className={style.text}>1</td>
      <td className={style.text}>{product.title}</td>
      <td className={style.text}>{product.price}</td>
      <td className={style.text}>{product.quantity} шт</td>
      <td className={style.text}>{product.total}</td>
      <td className={style.text}>{product.totalVolume}</td>
      <td className={style.text}>{product.totalWeight}</td>
      <td><Form.Check type="checkbox" defaultChecked={loaded} onChange={onCheckChange} /></td>
    </tr>
  )
}