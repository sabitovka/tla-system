import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function ProductTableRow({ product }) {
  const [loaded, setLoaded] = useState(false);

  function onCheckChange(e) {
    console.log(e.target.checked, loaded);
    setLoaded(e.target.checked);
  }

  const style = {
    bg: product.isLoaded ? 'bg-success' : 'bg-warning',
    text: product.isLoaded ? 'text-light' : 'text-dark',
  }

  return (
    <tr className={style.bg}>
      <td className={style.text}>1</td>
      <td className={style.text}>{product.title}</td>
      <td className={style.text}>{product.price}</td>
      <td className={style.text}>{product.quantity} шт</td>
      <td className={style.text}>{product.total}</td>
      <td className={style.text}>3500 (100x150x50)</td>
      <td className={style.text}>{product.dimensions.weight}</td>
      <td><Form.Check type="checkbox" defaultChecked={product.isLoaded} onChange={onCheckChange} /></td>
    </tr>
  )
}