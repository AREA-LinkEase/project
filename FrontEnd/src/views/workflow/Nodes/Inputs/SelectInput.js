import {Grid} from "@mui/material";
import CustomTextField from "../../../../@core/components/mui/text-field";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

export function SelectInput({value, onChange, data}) {
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
      <CustomTextField select id='custom-select' fullWidth className="nodrag" SelectProps={{
        value: value,
        onChange: e => onChange(e.target.value),
        onMouseDown: (e) => e.stopPropagation()
      }}
                       sx={{
                         background: "#fff",
                         borderRadius: "6px"
                       }}>
        {data.elements.map((element, i) => {
          return <MenuItem value={element} key={i}>{element}</MenuItem>
        })}
      </CustomTextField>
    </Grid>
  )
}
