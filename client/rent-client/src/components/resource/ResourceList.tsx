import { ReactElement, useEffect, useState } from "react";
import Resource from "./Resource";
import { IResourceIdentifiable } from "../../models/IResourceIdentifiable";
import './ResourceList.css';
import { getResources } from "../../services/userService";

export function ResourceList(): ReactElement {
    const [data, setData] = useState<IResourceIdentifiable[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = (await getResources()).data;
            setData(result)
            console.log(result);
        };

        fetchData();
    }, [])

    function DeleteResourceById(id: string) {
        const spliced = data.filter(a => a._id !== id);
        setData(spliced);
    }

    return (
        <div className="resouce-list container">{data.map(d => (<div key={d.imageName} className="resouce-list item"><Resource resource={d} DeleteById={DeleteResourceById} /></div>))}

        </div>);
}