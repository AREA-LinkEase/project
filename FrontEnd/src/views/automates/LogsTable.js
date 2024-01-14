import Box from "@mui/material/Box";
import Icon from "../../@core/components/icon";
import Typography from "@mui/material/Typography";
import CustomChip from "../../@core/components/mui/chip";
import IconButton from "@mui/material/IconButton";
import {forwardRef, useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CustomTextField from "../../@core/components/mui/text-field";
import {DataGrid} from "@mui/x-data-grid";
import NetworkConfig from "../../configs/networkConfig";
import Avatar from "@mui/material/Avatar";
import {useRouter} from "next/router";

const defaultColumns = [
    {
        flex: 0.2,
        field: 'value',
        minWidth: 90,
        headerName: 'Value',
        renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.message}</Typography>
    },
    {
        flex: 0.15,
        minWidth: 80,
        field: 'user',
        headerName: 'User',
        renderCell: ({ row }) => <Avatar src={NetworkConfig.url + "/assets/avatars/" + row.userId + ".png"} alt={row.userId} sx={{ mr: 4, width: 30, height: 30 }} />
    },
    {
        flex: 0.25,
        minWidth: 90,
        field: 'type',
        headerName: 'Type',
        renderCell: ({ row }) => <CustomChip rounded label={row.status} skin='light' color={row.status} />
    }
]

const LogsTable = ({data, automate}) => {
    const [value, setValue] = useState('')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })

    const columns = [
        ...defaultColumns
    ]

    const router = useRouter()

    return (
        <Card>
            <CardContent
                sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Button variant='contained' color={"error"} onClick={async () => {
                  await automate.clearLogs()
                  router.reload()
                }}>
                    Clear logs
                </Button>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomTextField value={value} placeholder='Search Logs' onChange={e => setValue(e.target.value)} />
                </Box>
            </CardContent>
            <DataGrid
                autoHeight
                rowHeight={54}
                rows={data}
                columns={columns}
                disableRowSelectionOnClick
                paginationModel={paginationModel}
                pageSizeOptions={[6, 10, 25, 50]}
                onPaginationModelChange={setPaginationModel}
            />
        </Card>
    )
}

export default LogsTable
