import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Tooltip } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Comment, Edit } from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IResourceIdentifiable } from "../models/IResourceIdentifiable";
import { resource as res } from '../enums/resource';
import { Delete, HouseRounded } from "@material-ui/icons";
import ReactMarkdown from "react-markdown";
import { bookResource, getCookieJWTInfo, deleteResource, likeResource, getAllCommentsByResourceId } from "../services/userservice";
import { staticAddress } from "../constants";
import { useNavigate } from "react-router-dom";
import { getDateString } from "../utils/utils";
import MyPopover from "./MyPopover";
import Favourite from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        header: {
            maxHeight: '30px',
        },
        media: {
            height: 0,
            maxHeight: '70px',
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

const Resource: React.FC<{ resource: IResourceIdentifiable, DeleteById: Function }> = ({ resource, DeleteById }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [allComments, setAllComments] = useState([]);
    let buttonRef = React.useRef(null);
    const imageUrl = `${staticAddress}/${resource.imageName}`;
    const resourceId = resource._id;
    const navigate = useNavigate();




    const handleExpandClick = (e: React.MouseEvent<HTMLElement>) => {
        setExpanded(!expanded);
    };

    async function handleReservation() {
        if (window.confirm(` Dou you want to book ${resourceId}`)) {
            try {
                const response = await bookResource(resourceId);
                console.log(response.data.message);
                alert(response.data.message);
            } catch (err) {
                alert((err as any).response?.data.message);
            }
        }
    }

    async function handleDelete() {
        if (window.confirm(` Dou you want to delete ${resourceId}`)) {
            try {
                const response = await deleteResource(resourceId);
                console.log(response.data.message);
                DeleteById(resource._id);
                // alert(response.data.message);
            } catch (err) {
                alert((err as any).response?.data.message);
            }
        }
    }

    async function handleComment() {
        navigate(`/add-comment/${resourceId}`)
    }


    async function showComments() {
        toggleComments();
        const response = await getAllCommentsByResourceId(resourceId);
        console.log(response.data);
        setAllComments(response.data);
    }

    async function toggleComments() {
        const currentOpen = commentsOpen;
        setCommentsOpen(!currentOpen);
    }

    async function handleLikes() {
        try {
            const response = await likeResource(resourceId);
            console.log(response.data);
        } catch (err) {
            alert((err as any).response?.data.message);
        }
    }



    return (<>
        <Card className={classes.root}>
            <CardHeader className={classes.header}
                avatar={
                    <Avatar aria-label="resourceType" className={classes.avatar}>
                        {isNaN(+resource.resourceType) ? resource.resourceType : res[resource.resourceType]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={showComments}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={resource.isMD ? (<ReactMarkdown>{resource.shortDescription}</ReactMarkdown>) : (<>{resource.shortDescription}</>)}
                subheader={getDateString(resource.date)}
            />
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title="imageUrl"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {isNaN(+resource.resourceType) ? resource.resourceType : res[resource.resourceType]}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Like">
                    <IconButton aria-label="like" onClick={handleLikes}>
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
                {getCookieJWTInfo() && (<Tooltip title="Book">
                    <IconButton aria-label="book" onClick={handleReservation}>
                        <HouseRounded />
                    </IconButton></Tooltip>)}
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Comment">
                    <IconButton aria-label="comment" onClick={handleComment}>
                        <Comment />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton aria-label="comment" onClick={() => navigate(`/edit-advertisement/${resourceId}`)}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    ref={buttonRef}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>description:</Typography>

                    {resource.isMD ? (<ReactMarkdown>{resource.description}</ReactMarkdown>) : (<>{resource.description}</>)}

                </CardContent>
            </Collapse>
        </Card>
        <MyPopover open={commentsOpen} anchorEl={buttonRef.current} items={allComments} handleClose={toggleComments} />
    </>

    )

}



export default Resource;