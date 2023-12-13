import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { WithResponseModel } from '../models/withResponse'

interface ResponseSnackBarProps {
    withResponse:WithResponseModel,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>
}

function ResponseSnackBar({withResponse, setWithResponse}:ResponseSnackBarProps) {
  return (
    <Snackbar open={withResponse !== null} onClose={() => setWithResponse(null)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert  severity={withResponse?.color} sx={{ width: '100%' }}>
            {withResponse?.msg}
        </Alert>
    </Snackbar>
  )
}

export default ResponseSnackBar