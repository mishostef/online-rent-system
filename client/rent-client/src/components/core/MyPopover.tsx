import { List, ListItem, ListItemIcon, ListItemText, makeStyles, Popover, ThemeProvider, Typography } from "@material-ui/core"
import { Comment } from "@material-ui/icons"


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px',//theme.spacing(1),
        margin: '10px'
    },
}))

const MyPopover: React.FC<{ open: boolean, anchorEl: any, items: string[], handleClose: Function }> = ({ open, anchorEl, items, handleClose }) => {
    const classes = useStyles();
    const listItems = items.map((item, index) => <ListItem key={index} button>
        <ListItemIcon>
            <Comment />
        </ListItemIcon>
        <ListItemText primary={item} />
    </ListItem>)
    function handlePopoverClose() {
        handleClose();
    }
    return (
        <Popover onClick={handlePopoverClose}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            <p> <Typography className={classes.root} variant="h6" color="primary">
                comments
            </Typography>
            </p>
            <List component="nav" aria-label="main mailbox folders">{listItems}</List>
        </Popover >
    )
}
export default MyPopover;