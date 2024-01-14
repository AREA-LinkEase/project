import {Grid, TextField} from "@mui/material";
import React from "react";

export function TextInput({value, onChange}) {
  return (
    <Grid
      item
      xs={7}
      sx={{
        "display": "flex",
        alignItems: "center",
        zIndex: 500
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        placeholder='Value'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          height: "60%"
        }}
        InputProps={{
          style: {
            display: 'flex',
            padding: '0px 14px',
            alignItems: 'center',
            gap: '12px',
            flex: '1 0 0',
            borderRadius: '6px',
            color: '#B7B5BE',
            fontFeatureSettings: 'clig off, liga off',
            fontFamily: 'Public Sans',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            backgroundColor: 'rgba(0, 0, 0, 0.26)',
          },
        }}
      />
    </Grid>
  )
}
