import {useState} from "react";
import {Grid} from "@mui/material";
import DatePicker from "react-datepicker";

export function DateInput({onChange}) {
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
      <DatePicker
        className='custom-datepicker2'
        selected={date}
        onChange={(date) => {
          setDate(date)
          onChange({timestamp: date.getTime()})
        }}
        showTimeSelect
        timeFormat="HH:mm"
        showMonthDropdown
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </Grid>
  )
}
