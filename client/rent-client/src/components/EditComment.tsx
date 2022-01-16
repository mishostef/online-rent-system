
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import { getCommentById } from "../services/userservice";

export default function EditComment(): ReactElement {
    const { commentId } = useParams();
    const [val, setVal] = useState('');

    useEffect(() => {
        (async function fetchData() {
            const res = await getCommentById(commentId!);
            const text = await res.data.text;
            console.log(text);
            setVal(text);
        })()

    }, [])


    if (val == '') return (<div>Loading...</div>)
    else
        return (<><AddComment initialV={val} method="PUT" commentId={commentId} /></>)

}