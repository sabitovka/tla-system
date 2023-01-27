import { useSelector } from "react-redux";
import ToastContainer from "react-bootstrap/ToastContainer";
import ToastItem from "./ToastItem";

export default function ToastHolder() {
    const errors = useSelector((state) => state.errors);

    return (
        <ToastContainer position='top-end' className="p-3">
        {
            errors.map((item, index) => <ToastItem item={item} key={index} />)
        }
        </ToastContainer>
    );
}
