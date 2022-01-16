import { List, ListItem, ListItemIcon, ListItemText, Popover } from "@material-ui/core"
import { Drafts, Inbox } from "@material-ui/icons"
import { useState } from "react"

const MyPopover: React.FC<{ open: boolean, anchorEl: any, items: string[], handleClose: Function }> = ({ open, anchorEl, items, handleClose }) => {

    const listItems = items.map(item => <li>{item}</li>)
    function handlePopoverClose() {
        handleClose();
    }
    return (<Popover onClick={handlePopoverClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
        comments:
        <ul>
            <li>{listItems}</li>
        </ul>
    </Popover>)
}
export default MyPopover;