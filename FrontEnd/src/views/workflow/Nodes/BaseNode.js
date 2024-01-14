import {Grid, Typography} from "@mui/material";
import {Handle, Position, useReactFlow, useStoreApi, useUpdateNodeInternals} from "reactflow";
import React, {useEffect, useState} from "react";
import {TextInput} from "./Inputs/TextInput";
import {SelectInput} from "./Inputs/SelectInput";
import {DateInput} from "./Inputs/DateInput";
import {RecurrenceInput} from "./Inputs/RecurrenceInput";
import {HandleTypes} from "./nodes";

const ColorTypes = {
  "any": {
    "background": "#FFF",
    "border": "#b3b3b3"
  },
  "number": {
    "background": "#007bff",
    "border": "#0056b3"
  },
  "boolean": {
    "background": "#ea5455",
    "border": "#a43b3c"
  },
  "object": {
    "background": "#ffe500",
    "border": "#b8a500"
  },
  "array": {
    "background": "#ab5c00",
    "border": "#784100"
  },
  "string": {
    "background": "#28c76f",
    "border": "#1c8c4e"
  },
  "date": {
    "background": "#7367f0",
    "border": "#5c53ad"
  }
}

const valuePicker = {
  "text": TextInput,
  "select": SelectInput,
  "date": DateInput,
  "recurrence": RecurrenceInput
}

const actions = {
  "stringBuilder": (id, data, store, setNodes) => {
    if (!("value" in data)) return;
    let count = Math.floor((data.value.split("%").length - 1) / 2);
    let inputs = [];

    if (count === data.inputs.length) return;
    for (let i = 0; i < count; i++)
      inputs.push({
        "id": "argument_" + (i + 1),
        "type": HandleTypes.STRING
      })
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            inputs
          };
        }
        return node;
      })
    );
  }
}

export default function BaseNode({data, id}) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [value, setValue] = useState(data.value)
  const updateNodeInternals = useUpdateNodeInternals();

  const onChange = (e) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            value: e,
          };
          setValue(e)
        }
        return node;
      })
    );
  }

  useEffect(() => {
    if (data.label in actions)
      actions[data.label](id, data, store, setNodes, updateNodeInternals)
    updateNodeInternals(id);
  }, [data]);

  return (
    <Grid
      sx={{
        width: '431px',
        height: '73px',
        flexShrink: 0,
        borderRadius: '10px',
        background: data.background,
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.30)',
        position: 'relative',
        justifyContent: "space-around",
        alignItems: "center"
      }}
      data={data}
      container
    >
      <Typography
        variant="h5"
        sx={{
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Public Sans',
          fontSize: '30px',
          fontStyle: 'normal',
          fontWeight: 900,
          lineHeight: '22px'
        }}
      >
        {data.name}
      </Typography>
      {(data.valuePicker) ?
        React.createElement(valuePicker[data.valuePicker.type], {"data": data.valuePicker, value, onChange})
      : null}
      <div style={{
        position: "absolute",
        width: "431px",
        height: "73px",
        display: "flex",
        justifyContent: "space-around"
      }}>
        {data.inputs.map((input, i) => {
          return(
            <div key={i} style={{
              position: "relative"
            }}>
              <Handle
                type="target"
                position={Position.Top}
                id={input.id + "#" + input.type}
                style={{
                  zIndex: 500,
                  width: '13.129px',
                  height: '13.129px',
                  background: ColorTypes[input.type].background,
                  borderColor: ColorTypes[input.type].border,
                  borderWidth: '1px'
                }}
              >
                <div
                  style={{
                    color: '#fff',
                    fontSize: '10px',
                    position: 'absolute',
                    top: '17px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {(input.name) ? input.name : ""}
                </div>
              </Handle>
            </div>
          )
        })}
      </div>
      <div style={{
        position: "absolute",
        width: "431px",
        height: "73px",
        display: "flex",
        justifyContent: "space-around"
      }}>
        {data.outputs.map((output, i) => {
          return (
            <div key={i} style={{
              position: "relative"
            }}>
              <Handle
                type="source"
                position={Position.Bottom}
                id={output.id + "#" + output.type}
                style={{
                  zIndex: 500,
                  width: '13.129px',
                  height: '13.129px',
                  background: ColorTypes[output.type].background,
                  borderColor: ColorTypes[output.type].border,
                  borderWidth: '1px'
                }}
              >
                <div
                  style={{
                    color: '#fff',
                    fontSize: '10px',
                    position: 'absolute',
                    top: '-7px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {(output.name) ? output.name : ""}
                </div>
              </Handle>
            </div>)
        })}
      </div>
    </Grid>
  )
}
