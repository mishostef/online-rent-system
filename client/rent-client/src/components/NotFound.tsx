import { ReactElement } from "react-markdown/lib/react-markdown";
import notFound from '../assets/notFound.png';
export default function (): ReactElement {
    return (
        <img src={notFound} alt="notFound" />
    )
}