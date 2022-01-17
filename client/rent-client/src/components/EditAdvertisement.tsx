import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useParams } from "react-router-dom";
import { resourcesAddress } from "../constants";
import { resource } from "../models/enums/resource";
import { IResource } from "../models/IResource";
import { ResourceTemplate } from "../models/ResourceTemplate";
import AddAdvertisement from "./AddAdvertisement";



export  function EditAdvertisement(): ReactElement {
    const params = useParams();
    const resourceId = params.resourceId;
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [imageName, setImageName] = useState('');
    const [resType, setResourceType] = useState('house');
    const [shortDescription, setShortDescription] = useState('');
    const [MD, setMD] = useState(false);

    useEffect(() => {
        axios.get(`${resourcesAddress}/${resourceId}`)
            .then(data => {
                console.log(data.data);
                const ires = (data.data as IResource);
                console.log(ires);                
                setAddress(ires.address);
                setDescription(ires.description);
                setDate(new Date(ires.date));
                setImageName(ires.imageName);
                setResourceType(data.data.resourceType);
                setShortDescription(ires.shortDescription);
                setMD(ires.isMD);
            })
    }, [resourceId]);


    if (address !== '') {
        console.log(`date=${date}`);

        return (<AddAdvertisement props={new ResourceTemplate(address, description, date, imageName, resource[resType as keyof typeof resource], shortDescription, MD)} method="put" resourceId={resourceId} />
        )
    }

    return (<h1>loading...</h1>)

}

