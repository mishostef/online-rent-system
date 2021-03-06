import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ITokenInfo } from "../../models/ITokenInfo";
import { DataGrid, GridCellEditCommitParams, GridSelectionModel } from '@mui/x-data-grid';
import { deleteMany, editUsers, getAllUsers } from "../../services/userService";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Delete, Edit } from "@material-ui/icons";

export interface IDataGridUser extends ITokenInfo {
    id: string;
}

function AllUsersAdmin(): ReactElement {
    const [data, setData] = useState<IDataGridUser[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editedElements, setEditedElements] = useState<ITokenInfo[]>([]);
    const [editedIndices, setEditedIndices] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllUsers();
            setEditedElements(result.data as ITokenInfo[]);
            const resultData = result.data.map((user: any) => { user.id = user._id; return user; })
            console.log(resultData);
            setData(result.data as IDataGridUser[]);
        };

        fetchData();
    }, [])



    const columns = [
        { field: 'id', headerName: 'ID', width: 220, editable: false },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 110,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 110,
            editable: true,
        }

    ];

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    function handleChange(ids: GridSelectionModel) {
        console.log(ids);
        console.log(`in handler:${ids.join(' ')}`)
        const selected: string[] = Array.from(ids).map(x => x.toString());
        setSelectedIds(selected);
    }

    async function handleDelete() {
        alert(selectedIds);
        const removedSelected = data.filter(d => !selectedIds.includes(d.id));
        try {
            const response = await deleteMany(selectedIds);
            const message = response.data.message;
            setData(removedSelected);
            alert(message);
        } catch (err: any) {
            alert(JSON.stringify(err.response.data));
        }
    }

    function handleEdit(params: GridCellEditCommitParams) {
        const id = params.id;
        const key = params.field;
        const value = params.value;
        const editedElNext = [...editedElements];
        const currentField = editedElNext.find(el => el._id === id);
        console.log(currentField);
        (currentField as any)[key] = value;
        setEditedElements(editedElNext);
        setEditedIndices([...editedIndices, id.toString()]);
    }

    async function btnHandleEdit() {
        const edited = editedElements.filter(x => editedIndices.includes(x._id));
        alert(JSON.stringify(edited));
        console.log(edited);
        try {
            await editUsers(edited);
        } catch (err) {
            console.dir(err);
        }
    }

    return (<>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onCellEditCommit={(params) => handleEdit(params)
                }
                onSelectionModelChange={(ids) => handleChange(ids)}
            />
        </div>
        <Button variant="contained" color="secondary"
            className={classes.button}
            startIcon={<Delete />} onClick={handleDelete}>
            Delete selected
        </Button>

        <Button variant="contained" color="primary"
            className={classes.button}
            startIcon={<Edit />} onClick={btnHandleEdit}>
            Edit selected
        </Button>
    </>)
}

export default AllUsersAdmin;