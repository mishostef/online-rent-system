import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resource } from "../../models/enums/resource";
import { IUser } from "../../models/IUser";
import { ResourceTemplate } from "../../models/ResourceTemplate";
import { getResourceById } from "../../services/resourceService";
import AddAdvertisement from "./AddAdvertisement";


const EditAdvertisement: React.FC<{ user?: IUser }> = ({user}) => {
    const params = useParams();
    const resourceId = params.resourceId;
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [imageName, setImageName] = useState('');
    const [resType, setResourceType] = useState(resource.house);//('house');
    const [shortDescription, setShortDescription] = useState('');
    const [MD, setMD] = useState(false);

    useEffect(() => {
        (async function () {
            const ires = await getResourceById(resourceId);
            setAddress(ires.address);
            setDescription(ires.description);
            setDate(new Date(ires.date));
            setImageName(ires.imageName);
            setResourceType(ires.resourceType);
            setShortDescription(ires.shortDescription);
            setMD(ires.isMD);
        })()
    }, []);


    if (address !== '' && description !== '' && imageName !== '') {
        console.log(`date=${date}`);
        console.log(`imageName=${imageName}`);
        return (<AddAdvertisement props={new ResourceTemplate(address, description, date, imageName, resType, shortDescription, MD)} method="put" resourceId={resourceId} user={user} />
            //return (<AddAdvertisement props={new ResourceTemplate(address, description, date, imageName, resource[resType as keyof typeof resource], shortDescription, MD)} method="put" resourceId={resourceId} />
        )
    }

    return (<h1>loading...</h1>)

}

export default EditAdvertisement;