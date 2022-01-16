import React, { ReactElement, useEffect, useState } from "react";
import axios from 'axios';
import { IResource } from "../models/IResource";
import { resource } from '../enums/resource'
import Resource from "./Resource";
import { IResourceIdentifiable } from "../models/IResourceIdentifiable";
import { date } from "yup/lib/locale";
import './ResourceList.css';
import { resourcesAddress } from "../constants";

export function ResourceList(): ReactElement {
    const [data, setData] = useState<IResourceIdentifiable[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const result = (await axios(resourcesAddress)).data;
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