import {useState} from "react";
import {Grid} from "@mui/material";
import CustomTextField from "../../../../@core/components/mui/text-field";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";

export function RecurrenceInput({value, onChange}) {
  const [date, setDate] = useState(new Date());

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
      <Grid item className="custom-select-container">
        <CustomTextField select id='custom-select' fullWidth className="nodrag" SelectProps={{
          value: value?.day || "all",
          onChange: e => onChange({...value, day: e.target.value}),
          onMouseDown: (e) => e.stopPropagation()
        }}
        sx={{
          background: "#fff",
          borderRadius: "6px"
        }}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
          <MenuItem value="Sunday">Sunday</MenuItem>
        </CustomTextField>
      </Grid>
      <Grid style={{ paddingRight: '5px' }} />
      <Grid item>
        <DatePicker
          className="custom-datepicker nodrag"
          selected={date}
          onChange={(date) => {
            setDate(date)
            onChange({...value, hours: date.getHours(), minutes: date.getMinutes()})
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </Grid>
    </Grid>
  )
}
