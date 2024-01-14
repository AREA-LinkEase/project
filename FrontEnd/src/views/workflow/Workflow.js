import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge, ConnectionLineType,
} from 'reactflow';
import BaseNode from "./Nodes/BaseNode";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import {Button, DialogTitle} from "@mui/material";
import Icon from "../../@core/components/icon";
import {ToolBoxDrawer} from "./ToolBoxDrawer";
import {HandleTypes, nodeGlobalStyles} from "./Nodes/nodes";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CustomTextField from "../../@core/components/mui/text-field";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CustomChip from "../../@core/components/mui/chip";
import {promptWorkflowAI} from "../../models/AI";
import Spinner from "../../@core/components/spinner";

const types = {
  baseNode: BaseNode
}

let id = 0;
export const getId = () => `LinkEaseNode_${id++}`;

export default function WorkflowComponent({value, onChange, events}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(value.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(value.edges);
  const [nodeStyles, setNodeStyles] = useState({
    ...nodeGlobalStyles,
    ...events
  })
  const [isOpen, setOpen] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const [countPin, setCountPin] = useState(0);
  const fileInputRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setNodeStyles({
      ...nodeGlobalStyles,
      ...events
    })
  }, [events])
  useEffect(() => {
    for (const node of value.nodes) {
      let value = parseInt(node.id.split("_")[1]);
      if (value > id)
        id = value;
    }
    id++;
  }, [])

  const onConnect = useCallback(
    (params) => {
      const { sourceHandle, targetHandle } = params;
      const [idSource, typeSource] = sourceHandle.split("#");
      const [idTarget, typeTarget] = targetHandle.split("#");

      if (typeSource !== HandleTypes.ANY && typeTarget !== HandleTypes.ANY && typeSource !== typeTarget) {
        toast.error("You cannot connect these handles")
        return;
      }
      setEdges((eds) => addEdge({...params, type: ConnectionLineType.SmoothStep, link: idSource + "#" + idTarget}, eds))
    },
    [setEdges],
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(flow)
      onChange(flow);
    }
  }, [reactFlowInstance]);

  const onExport = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const jsonString = JSON.stringify(flow, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const a = document.createElement('a');

      a.href = URL.createObjectURL(blob);
      a.download = 'output.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [reactFlowInstance])

  const handleDrawer = () => setOpen(!isOpen)

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        "type": "baseNode",
        position,
        data: {
          label: type,
          ...nodeStyles[type]
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onNodeContextMenu = useCallback((event, node) => {
      event.preventDefault();
      setCountPin(node.data.inputs.length);
      setMenu(node);
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onEdgeDoubleClick = (event, ed) => {
    setEdges((edges) => edges.filter((edge) => edge.id !== ed.id));
  };

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const flow = JSON.parse(content);

          if (flow) {
            setNodes(flow.nodes || [])
            setEdges(flow.edges || [])
          } else {
            toast.error("An error has occurred")
          }
        } catch (e) {
          console.log(e)
          toast.error("An error has occurred")
        }
      };
      reader.readAsText(file);
    }
  }, [setNodes, setEdges]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onPrompt = async (event) => {
    if (event.key !== "Enter") return;
    setLoading(true)
    try {
      console.log(prompt)
      const flow = reactFlowInstance.toObject();
      let workflow = await promptWorkflowAI(prompt, nodeStyles, {nodes: flow.nodes, edges: flow.edges})

      console.log(workflow)
      if (workflow && typeof workflow !== "number") {
        if (Array.isArray(workflow.nodes))
          setNodes(workflow.nodes || [])
        if (Array.isArray(workflow.edges))
          setEdges(workflow.edges || [])
      } else {
        toast.error("An error has occurred")
      }
    } catch (e) {
      console.log(e)
      toast.error("An error has occurred")
    }
    setLoading(false)
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between" sx={{mb: 3}}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label={<div style={{
              display: "flex",
              alignItems: "center"
            }}>prompt AI<CustomChip sx={{ml: 2}} label='Beta' skin='light' color='error' /></div>}
            fullWidth
            height={38}
            onKeyDown={onPrompt}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            component='label'
            variant='contained'
            onClick={onExport}
            sx={{ mr: 2 }}
            startIcon={<Icon icon='tabler:external-link' fontSize={20} />}
          >
            Export
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<Icon icon='tabler:download' fontSize={20}/>}
            sx={{mr: 2}}
            htmlFor='account-settings-upload-image'
            onClick={handleButtonClick}
          >
            <input
              hidden
              type='file'
              onChange={handleFileChange}
              ref={fileInputRef}
              id='account-settings-upload-image'
            />
            Import
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<Icon icon='tabler:file-import' fontSize={20}/>}
            sx={{ mr: 2 }}
            onClick={onSave}
          >
            Register
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleDrawer}
            startIcon={<Icon icon='tabler:plus' fontSize={20} />}
          >
            Add Block
          </Button>
        </Grid>
      </Grid>
      {
        isLoading ?
            <Spinner sx={{
              "height": "100%"
            }} />
          :
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        nodeTypes={types}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeDoubleClick={onEdgeDoubleClick}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      }
      <ToolBoxDrawer isOpen={isOpen} handleDrawer={handleDrawer} nodeStyles={nodeStyles} setNodes={setNodes} />
      <Dialog open={Boolean(menu)} onClose={onPaneClick} aria-labelledby='form-dialog-title' maxWidth="sm">
        <DialogTitle id='form-dialog-title'>Node</DialogTitle>
        <DialogContent>
          <CustomTextField id='name' autoFocus fullWidth type="number" label='Number of entry point' value={countPin}
                           onChange={(e) => setCountPin((e.target.value !== "") ? parseInt(e.target.value) : 0)} />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button
            variant='contained'
            color='error'
            startIcon={<Icon icon='tabler:trash' fontSize={20} />}
            sx={{ mr: 2 }}
            onClick={() => {
              setNodes((nodes) => nodes.filter((node) => node.id !== menu.id));
              setEdges((edges) => edges.filter((edge) => edge.source !== menu.id));
              onPaneClick()
            }}
          >
            Delete
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<Icon icon='tabler:check' fontSize={20} />}
            sx={{ mr: 2 }}
            onClick={() => {
              let inputs = [];

              for (let i = 0; i < countPin; i++)
                inputs.push({
                  "id": "argument_" + (i + 1),
                  "type": HandleTypes.ANY
                })
              setNodes(nodes.map((nde) => {
                if (nde.id === menu.id) {
                  nde.data = {
                    ...nde.data,
                    inputs
                  };
                }
                return nde;
              }));
              onPaneClick()
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
