import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Button, FormControl, InputLabel, Modal, Select } from '@mui/material'
import Icon from 'src/@core/components/icon'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'

import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    useEdgesState,
    addEdge,
    getSmoothStepPath,
    BaseEdge
  } from 'reactflow';

import StartBlock from 'src/@core/components/reactflowBlocks/markingBlock/startBlock';
import EndBlock from 'src/@core/components/reactflowBlocks/markingBlock/endBlock';
import IfBlock from 'src/@core/components/reactflowBlocks/controlBlocks/ifBlock';
import AtBlock from 'src/@core/components/reactflowBlocks/controlBlocks/atBlock';
import ForBlock from 'src/@core/components/reactflowBlocks/controlBlocks/forBlock';
import EqualBlock from 'src/@core/components/reactflowBlocks/comparaisonBlocks/equalBlock';
import NotEqualBlock from 'src/@core/components/reactflowBlocks/comparaisonBlocks/notEqualBlock';
import SuperiorBlock from 'src/@core/components/reactflowBlocks/comparaisonBlocks/superiorBlock';
import InferiorBlock from 'src/@core/components/reactflowBlocks/comparaisonBlocks/inferiorBlock';
import SuperiorOrEqualBlock from 'src/@core/components/reactflowBlocks/comparaisonBlocks/superiorOrEqualBlock';
import InferiorOrEqualBlock from 'src/@core/components/reactflowBlocks/comparaisonBlocks/inferiorOrEqualBlock';
import NumberBlock from 'src/@core/components/reactflowBlocks/stockageBlocks/numberBlock';
import BooleanBlock from 'src/@core/components/reactflowBlocks/stockageBlocks/booleanBlock';
import StringBlock from 'src/@core/components/reactflowBlocks/stockageBlocks/stringBlock';

import IfBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/controlBlocks/ifBlockIndicator';
import ForBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/controlBlocks/forBlockIndicator';
import StartBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/markingBlocks';
import EndBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/markingBlocks/endBlockIndicator';
import EqualBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/comparaisonBlocks/equalBlock';
import NotEqualBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/comparaisonBlocks/notEqualBlock';
import SuperiorBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/comparaisonBlocks/superiorBlock';
import SuperiorOrEqualBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/comparaisonBlocks/superiorOrEqualBlock';
import InferiorBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/comparaisonBlocks/inferiorBlock';
import InferiorOrEqualBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/comparaisonBlocks/inferiorOrEqualBlock';
import BooleanBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/stockageBlocks/booleanBlock';
import NumberBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/stockageBlocks/numberBlock';
import StringBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/stockageBlocks/stringBlock';

import { setReduxNodes } from 'src/store/apps/nodes';
import { setReduxEdges, addReduxEdge, removeReduxEdge } from 'src/store/apps/edges';
import ForEachBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/controlBlocks/forEachBlockIndicator';
import OnBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/controlBlocks/onBlockIndicator';
import OnBlock from 'src/@core/components/reactflowBlocks/controlBlocks/onBlock';
import ForEachBlock from 'src/@core/components/reactflowBlocks/controlBlocks/forEachBlock';
import NumberToBoolBlock from 'src/@core/components/reactflowBlocks/conversionBlock/numberToBoolBlock';
import NumberToStringBlock from 'src/@core/components/reactflowBlocks/conversionBlock/numberToStringBlock';
import { getConnectedNodes, isComparaisonNode } from 'src/@core/layouts/utils';
import ArrayBlock from 'src/@core/components/reactflowBlocks/stockageBlocks/arrayBlock';
import ObjectBlock from 'src/@core/components/reactflowBlocks/stockageBlocks/objectBlock';
import RecurrenceBlock from 'src/@core/components/reactflowBlocks/timeBlocks/recurrenceBlock';
import DateBlock from 'src/@core/components/reactflowBlocks/timeBlocks/dateBlock';
import StringToNumberBlock from 'src/@core/components/reactflowBlocks/conversionBlock/stringToNumberBlock';
import StringBuilderBlock from 'src/@core/components/reactflowBlocks/stockageBlocks/stringBuilderBlock';
import AtBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/controlBlocks/atBlockIndicator';
import NumberToBoolBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/conversionsBlocks/numberToBool';
import StringToNumberBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/conversionsBlocks/stringToNumber';
import NumberToStringBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/conversionsBlocks/numberToString';
import StringBuilderBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/stockageBlocks/stringBuilderBlock';
import ArrayBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/stockageBlocks/arrayBlock';
import ObjectBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/stockageBlocks/objectBlock';
import DateBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/temporalBlock/dateBlock';
import RecurrenceBlockIndicator from 'src/@core/components/reactflowBlocksIndicator/temporalBlock/recurrenceBlock';
import RequestBlock from '../reactflowBlocks/eventBlocks/requestBlock';
import RequestBlockIndicator from '../reactflowBlocksIndicator/eventBlocks/requestBlock';
import TestBlockIndicator from '../reactflowBlocksIndicator/eventBlocks/testBlock';
import TestBlock from '../reactflowBlocks/eventBlocks/testBlock';
import QuantityInput from './quantityInput';
import ArgumentBlockIndicator from '../reactflowBlocksIndicator/stockageBlocks/argumentBlock';
import ArgumentBlock from '../reactflowBlocks/stockageBlocks/argumentBlock';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: 400,
    zIndex: theme.zIndex.modal,
    '& .MuiFormControlLabel-root': {
        marginRight: '0.6875rem'
    },
    '& .MuiDrawer-paper': {
        border: 0,
        width: 400,
        zIndex: theme.zIndex.modal,
        boxShadow: theme.shadows[9]
    }
}))

const CustomizerSpacing = styled('div')(({ theme }) => ({
    padding: theme.spacing(5, 6)
}))

const generateBlockIndicator = (name) => {
    return <TestBlockIndicator name={name} />;
};

const generateBlockComponent = (name) => {
    const DynamicBlock = ({ data }) => {
      return <TestBlock name={name} data={data} />;
    };
  
    return DynamicBlock;
  };

const ReactFlowComponent = ({value, onChange, newNodes}) => {
    const dispatch = useDispatch();
    const reduxNodes = useSelector((state) => state.nodes.nodes);
    const reduxEdges = useSelector((state) => state.edges);
    const [test, setTest] = useState(false);
    const [index, setIndex] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedNode, setSelectedNode] = useState('');
    const [entryPoints, setEntryPoints] = useState(1);

    const DefaultSmoothStepEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
        const [edgePath] = getSmoothStepPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
        });
      
        return (
          <>
            <BaseEdge
              id={id}
              path={edgePath}
              style={{ strokeWidth: 3 }}
            />
          </>
        );
    };

    const edgeTypes = useMemo(() => {
        return {
          'custom-edge': DefaultSmoothStepEdge,
        };
    }, []);
    
    const nodeColor = (node) => {
        const isDynamicBlock = newNodes.some(dynamicBlock => (
            dynamicBlock.name === node.type && dynamicBlock.id === node.id
        ));
    
        if (isDynamicBlock)
            return '#28C76F';
        switch (node.type) {
            case 'start':
            case 'end':
                return '#7367F0';
            case 'if':
            case 'for':
            case 'on':
            case 'forEach':
            case 'at':
                return '#000000';
            case '==':
            case '!=':
            case '>':
            case '<':
            case '>=':
            case '<=':
                return '#FF9F43';
            case 'variableNumber':
            case 'variableString':
            case 'variableBoolean':
            case 'variableArray':
            case 'variableObject':
            case 'stringBuilder':
            case 'variableArgument':
                return '#E83E8C';
            case 'NumberToBool':
            case 'NumberToString':
            case 'StringToNumber':
                return '#00CFE8';
            case 'variableRecurrence':
            case 'variableDate':
                return '#EA5455';
            case 'request':
            case 'test':
                return '#28C76F';
            default:
                return '#ff0072';
        }
    }

    const JSONToReactFlow = (json) => {
        const reactFlowNodes = json.nodes.map((jsonNode) => ({
          id: jsonNode.id,
          type: jsonNode.type,
          position: jsonNode.position,
          data: jsonNode.data,
        }));
      
        const reactFlowEdges = json.edges.map((jsonEdge) => ({
          id: jsonEdge.id,
          source: jsonEdge.source,
          target: jsonEdge.target,
        }));
      
        return {
          nodes: reactFlowNodes,
          edges: reactFlowEdges,
        };
      };

    const reactFlowToJSON = (nodes, edges) => {
        const jsonNodes = nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        }));
      
        const jsonEdges = edges.map((edge) => ({ // je peux récup direct edges reducer
          id: edge.id,
          source: edge.source,
          target: edge.target,
        }));
      
        return {
          nodes: jsonNodes,
          edges: jsonEdges,
        };
    };
    const initialEdges = [];

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const checkType = (verif, sourceNode, targetNode) => { // Conversion with type value checker
        const connectedNodeType = sourceNode && sourceNode.data.typeOutput ? sourceNode.data.typeOutput : sourceNode ? sourceNode.data.type : '';

        if (connectedNodeType && targetNode.data.type) {
            if (connectedNodeType !== targetNode.data.type)
                return 1;
        }
        return verif;
    };

    const checkAlreadyConnected = (verif, sourceNode, targetNode, connection) => {
        const connectedNodes = getConnectedNodes(targetNode, reduxNodes, reduxEdges);
        return verif;
    };
    
    const checkAtType = (sourceNode, targetNode, targetType) => {
        if (targetType === 'element') {
            if (sourceNode.data.type !== 'object' && sourceNode.data.type !== 'array') {
                return true;
            }
        }
        if (targetType === 'entry') {
            if (sourceNode.data.type && sourceNode.data.type !== '')
                return true;
        }
        if (targetType === 'key') {
            const connectedNodes = getConnectedNodes(targetNode.id, reduxNodes, reduxEdges);
            let typeValue = '';
            connectedNodes.forEach((connectedNode) => {
              if (connectedNode.data && connectedNode.data.type !== "") {
                typeValue = connectedNode.data.type;
              }
            });
            if (typeValue === 'object' && sourceNode.data.type !== 'str') {
                console.log('ok');
                return true;
            }
            if (typeValue === 'array' && sourceNode.data.type !== 'number')
                return true;
          }
        return false;
    };

    const isValidConnection = (connection) => {
        let verif = 0;
        const sourceNode = reduxNodes.find((node) => node.id === connection.source);
        const targetNode = reduxNodes.find((node) => node.id === connection.target);
        
        if (sourceNode && targetNode) { // rules
            if (targetNode.type === 'at' && checkAtType(sourceNode, targetNode, connection.targetHandle)) {
                verif = 1;
            }
            if (targetNode.type !== 'at')
                verif = checkType(verif, sourceNode, targetNode);
            // verif = checkAlreadyConnected(verif, sourceNode, targetNode, connection);
        }
        if (verif === 0)
            return true;
        return false;
    };

    const onConnect = useCallback((params) => {
        let verif = 0;
    
        const updatedNodes = reduxNodes.map((node) => {
            if (node.id === params.target) {
                const connectedNode = reduxNodes.find((n) => n.id === (node.id === params.source ? params.target : params.source));
                const connectedNodeType = connectedNode && connectedNode.data.typeOutput ? connectedNode.data.typeOutput : connectedNode ? connectedNode.data.type : '';
    
                if (node.type == 'at') {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            type: connectedNodeType === 'object' ? 'str' : connectedNodeType === 'array' ? 'number' : connectedNodeType === 'str' ? 'str' : connectedNodeType === 'number' ? 'number' : ''
                        },
                    };
                }
                if (isComparaisonNode(node.type)) {
                    if (node.data.type === '' || node.data.type === connectedNodeType) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                type: connectedNodeType
                            },
                        };
                    }
                }
            }
            return node;
        });
    
        if (verif === 0) {
            setEdges((els) =>
                addEdge(
                    {
                        ...params,
                        type: 'smoothstep',
                        style: { strokeWidth: 3 },
                    },
                    els
                )
            );
    
            const edgeId = `${params.sourceHandle}#${params.targetHandle}`;
            const newEdge = {
                id: edgeId,
                source: params.source,
                target: params.target,
                type: 'smoothstep',
                style: { strokeWidth: 3 },
            };
    
            dispatch(addReduxEdge(newEdge));
            dispatch(setReduxNodes(updatedNodes));
    
            const updatedObject = {
                nodes: updatedNodes,
                edges: [...reduxEdges, newEdge],
            };
    
            if (onChange) {
                onChange(updatedObject);
            }
        }
    }, [setEdges, reduxNodes, reduxEdges, dispatch, onChange]);

  useEffect(() => {
    if (value !== undefined && Object.keys(value).length > 0) {
        const reactFlowData = JSONToReactFlow(value);
        
        if (JSON.stringify(reduxNodes) !== JSON.stringify(reactFlowData.nodes)) {
            dispatch(setReduxNodes(reactFlowData.nodes));
        }
        setTest(true);
    }
  }, []);

  useEffect(() => {
    if (value !== undefined && Object.keys(value).length > 0) {     
        const reactFlowData = JSONToReactFlow(value);
    
        if (test && reduxNodes) {
            const edgesWithType = reactFlowData.edges.map((edge) => ({
              ...edge,
              type: 'custom-edge',
            }));
          
            dispatch(setReduxEdges(edgesWithType));
            setEdges(edgesWithType);
          }
    }
  }, [test]);

    const nodeTypes = useMemo(() => {
        const generatedNodeTypes = newNodes.reduce((types, { name }) => {
          types[name] = generateBlockComponent(name);
          return types;
        }, {});
      
        return {
          start: StartBlock,
          end: EndBlock,
          if: IfBlock,
          for: ForBlock,
          on: OnBlock,
          forEach: ForEachBlock,
          at: AtBlock,
          '==': EqualBlock,
          '!=': NotEqualBlock,
          '>': SuperiorBlock,
          '<': InferiorBlock,
          '<=': InferiorOrEqualBlock,
          '>=': SuperiorOrEqualBlock,
          variableNumber: NumberBlock,
          variableBoolean: BooleanBlock,
          variableString: StringBlock,
          variableArray: ArrayBlock,
          variableObject: ObjectBlock,
          NumberToBool: NumberToBoolBlock,
          NumberToString: NumberToStringBlock,
          StringToNumber: StringToNumberBlock,
          variableRecurrence: RecurrenceBlock,
          variableDate: DateBlock,
          variableArgument: ArgumentBlock,
          stringBuilder: StringBuilderBlock,
          request: RequestBlock,
          test: TestBlock,
          ...generatedNodeTypes,
        };
      }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);

    const onDragStart = (event, nodeType, nodeData) => {
        setIsCreateMenuOpen(false);
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow-data', JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();
    
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const data = JSON.parse(event.dataTransfer.getData('application/reactflow-data'));
    
        const newNode = {
            id: data.newId ? data.newId : getId(index),
            type,
            position: reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            }),
            data: {
                ...data,
                label: data.newId ? data.newId : getId(index),
            },
        };
    
        const updatedNodes = [...reduxNodes, newNode];
        const updatedObject = {
            nodes: updatedNodes,
            edges: reduxEdges
        };
    
        dispatch(setReduxNodes(updatedNodes));
    
        if (onChange) {
            onChange(updatedObject);
        }
    };
    

    const handleCloseMenu = () => {
        setIsCreateMenuOpen(false);
    }

    const handleOpenMenu = () => {
        setIsCreateMenuOpen(true);
    };

    const handleSave = () => {
        const json = reactFlowToJSON(reduxNodes, reduxEdges);
        const jsonString = JSON.stringify(json, null, 2);
        console.log(jsonString);
        const blob = new Blob([jsonString], { type: 'application/json' });
    
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'output.json';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    };

    const getId = (nbr) => {
        setIndex(index + 1);
        return `${nbr + 1}`;
    };

    const onEdgeClick = (event, edge, edges, setEdges) => {
        if (event.detail === 3) {
            const updatedEdges = edges.filter((e) => e.id !== edge.id);
            setEdges(updatedEdges);
    
            const targetNode = reduxNodes.find((node) => node.id === edge.target);
    
            const updatedNodes = reduxNodes.map((node) => {
                if (targetNode && node.id === targetNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            type: isComparaisonNode(targetNode.type) ? '' : node.data.type,
                        },
                    };
                }
                return node;
            });
    
            const updatedObject = {
                nodes: updatedNodes,
                edges: updatedEdges,
            };
    
            dispatch(setReduxNodes(updatedNodes));
            if (onChange) {
                onChange(updatedObject);
            }
    
            dispatch(removeReduxEdge(edge.id));
        }
    };

    const onNodeClick = (event, node, nodes, edges) => {
        if (event.detail === 3) {
            const updatedNodes = nodes.filter((n) => n.id !== node.id);

            const updatedEdges = edges.filter((edge) => edge.source !== node.id && edge.target !== node.id);
    
            const updatedObject = {
                nodes: updatedNodes,
                edges: updatedEdges,
            };
    
            dispatch(setReduxNodes(updatedNodes));
            dispatch(setReduxEdges(updatedEdges));
    
            if (onChange) {
                onChange(updatedObject);
            }
        } else if (event.button === 0 && node.data.newId) {
            setSelectedNode(node.id);
            setOpenPopup(true);
        }
    };

    const handleClose = () => {
        setOpenPopup(false);
    };

      const handleAdd = () => {
        const updatedNodeIndex = reduxNodes.findIndex((n) => n.id === selectedNode);
      
        if (updatedNodeIndex !== -1) {
          const updatedNodes = [...reduxNodes];
          const updatedNode = { ...updatedNodes[updatedNodeIndex] };
          const updatedData = { ...updatedNode.data };
          updatedData.nbrEntry = entryPoints;
          updatedNode.data = updatedData;
          updatedNodes[updatedNodeIndex] = updatedNode;
          dispatch(setReduxNodes(updatedNodes));
      
          console.log(updatedNode);
        } else {
          console.error(`Node with ID ${selectedNode} not found in the nodes array.`);
        }
      
        handleClose();
      };
      

    const onNodeDragStop = (event, draggedNode) => {
        const { id, position } = draggedNode;
        const newPosition = { x: position.x, y: position.y };
    
        const updatedNodes = [...reduxNodes];
        const nodeIndex = updatedNodes.findIndex((node) => node.id === id);
    
        if (nodeIndex !== -1) {
            updatedNodes[nodeIndex] = {
                ...updatedNodes[nodeIndex],
                position: newPosition,
            };
    
            const updatedObject = {
                nodes: updatedNodes,
                edges: reduxEdges
            };
    
            dispatch(setReduxNodes(updatedNodes));
    
            if (onChange) {
                onChange(updatedObject);
            }
        } else {
            console.error(`Node with ID ${id} not found in the nodes array.`);
        }
    };

    return (
        <Grid container spacing={2}>
        <Modal
            open={openPopup}
            onClose={handleClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '20px',
                maxWidth: '300px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}
        >
        <h2 id="modal-modal-title">
            Select the number of entry ports
        </h2>

        <QuantityInput quantity={entryPoints} setQuantity={setEntryPoints}/>
        <div style={{paddingBottom:'20px'}}/>
        <Button
            variant='contained'
            color='primary'
            startIcon={<Icon icon='tabler:save' fontSize={20} />}
            onClick={handleAdd}
            >
            Add
        </Button>
    </div>
</Modal>

            <PageHeader
                title={
                    <Grid container spacing={2} justifyContent="space-between">
                    <Grid item>
                        <Typography variant='h4' sx={{ mb: 6 }}>
                            Workflow
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                        variant='contained'
                        color='primary'
                        startIcon={<Icon icon='tabler:save' fontSize={20} />}
                        onClick={handleSave}
                        sx={{ mr: 2 }}
                        >
                        Enregister
                        </Button>
                        <Button
                        variant='contained'
                        color='primary'
                        startIcon={<Icon icon='tabler:plus' fontSize={20} />}
                        onClick={handleOpenMenu}>
                            Add Block
                        </Button>
                    </Grid>
                    </Grid>
                }
            />
            <Grid item style={{ width: '100%', height: '68vh' }}>
                <ReactFlowProvider>
                    <ReactFlow
                        ref={reactFlowWrapper}
                        nodes={reduxNodes}
                        edges={edges}
                        defaultNodes={reduxNodes}
                        defaultEdges={edges}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onConnect={onConnect}
                        isValidConnection={isValidConnection}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onEdgeClick={(event, edge) => onEdgeClick(event, edge, edges, setEdges)}
                        onNodeClick={(event, node) => onNodeClick(event, node, reduxNodes, reduxEdges)}
                        onNodeDragStop={onNodeDragStop}
                        fitView
                    >
                        <Background
                            id="1"
                            gap={10}
                            color="#f1f1f1"
                            variant={BackgroundVariant.Lines}
                        />
                        <Background
                            id="2"
                            gap={100}
                            color="#ccc"
                            variant={BackgroundVariant.Lines}
                        />
                        <Controls />
                        <MiniMap
                            nodeColor={nodeColor}
                            nodeStrokeColor={() => {
                                return "#000000";
                            }}
                            nodeBorderRadius={15}
                            style={{
                                border: "1px solid black"
                            }}
                            maskColor="rgb(0,0,0, 0.1)"
                        />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            </Grid>
            <Drawer open={isCreateMenuOpen} hideBackdrop anchor='right' variant='persistent'>
                <Box
                className='customizer-header'
                sx={{
                    position: 'relative',
                    p: theme => theme.spacing(3.5, 5),
                    borderBottom: theme => `1px solid ${theme.palette.divider}`
                }}
                >
                <Typography variant='h4' sx={{ fontWeight: 600 }}>
                    Toolbox
                </Typography>
                <IconButton
                    onClick={handleCloseMenu}
                    sx={{
                    right: 20,
                    top: '50%',
                    position: 'absolute',
                    color: 'text.secondary',
                    transform: 'translateY(-50%)'
                    }}
                >
                    <Icon icon='tabler:x' fontSize={20} />
                </IconButton>
                </Box>
                <PerfectScrollbar options={{ wheelPropagation: false }}>

                <CustomizerSpacing className='customizer-body'>
                    <Typography
                        component='p'
                        variant='caption'
                        sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
                        >
                        Marking blocks
                    </Typography>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'start', {})} draggable="true">
                            <StartBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: -5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'end', {})} draggable="true">
                            <EndBlockIndicator/>
                        </div>
                    </Box>
                </CustomizerSpacing>

                <CustomizerSpacing className='customizer-body'>
                    <Typography
                        component='p'
                        variant='caption'
                        sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
                        >
                        Control blocks
                    </Typography>
                        
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'if', {type: 'bool'})} draggable="true">
                            <IfBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'for', {type: 'bool'})} draggable="true">
                            <ForBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'forEach', {type: 'array'})} draggable="true">
                            <ForEachBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'on', {type: 'recurrence-date'})} draggable="true">
                            <OnBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: -5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'at', {type: ''})} draggable="true">
                            <AtBlockIndicator/>
                        </div>
                    </Box>
                </CustomizerSpacing>

                <CustomizerSpacing className='customizer-body'>
                    <Typography
                        component='p'
                        variant='caption'
                        sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
                        >
                        Stockage blocks
                    </Typography>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableBoolean', {value: '', type: 'bool'})} draggable="true">
                            <BooleanBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableNumber', {value: '', type: 'number'})} draggable="true">
                            <NumberBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableString', {value: '', type: 'str'})} draggable="true">
                            <StringBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableObject', {value: '', type: 'object'})} draggable="true">
                            <ObjectBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableArray', {value: '', type: 'array'})} draggable="true">
                            <ArrayBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableArgument', {})} draggable="true">
                            <ArgumentBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: -5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'stringBuilder', {type: 'str', typeOutput: 'str', value: ''})} draggable="true">
                            <StringBuilderBlockIndicator/>
                        </div>
                    </Box>
                </CustomizerSpacing>

                <CustomizerSpacing className='customizer-body'>
                    <Typography
                        component='p'
                        variant='caption'
                        sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
                        >
                        Conversion blocks
                        </Typography>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'NumberToBool', {type: 'number', typeOutput: 'bool'})} draggable="true">
                            <NumberToBoolBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'NumberToString', {type: 'number', typeOutput: 'str'})} draggable="true">
                            <NumberToStringBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: -5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'StringToNumber', {type: 'str', typeOutput: 'number'})} draggable="true">
                            <StringToNumberBlockIndicator/>
                        </div>
                    </Box>
                </CustomizerSpacing>

                <CustomizerSpacing className='customizer-body'>
                    <Typography
                        component='p'
                        variant='caption'
                        sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
                        >
                        Comparaison blocks
                    </Typography>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, '==', {type: '', typeOutput: 'bool'})} draggable="true">
                            <EqualBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, '!=', {type: '', typeOutput: 'bool'})} draggable="true">
                            <NotEqualBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, '>', {type: '', typeOutput: 'bool'})} draggable="true">
                            <SuperiorBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, '>=', {type: '', typeOutput: 'bool'})} draggable="true">
                            <SuperiorOrEqualBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, '<', {type: '', typeOutput: 'bool'})} draggable="true">
                            <InferiorBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: -5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, '<=', {type: '', typeOutput: 'bool'})} draggable="true">
                            <InferiorOrEqualBlockIndicator/>
                        </div>
                    </Box>

                </CustomizerSpacing>

                <CustomizerSpacing className='customizer-body'>
                    <Typography
                        component='p'
                        variant='caption'
                        sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
                        >
                        Temporal blocks
                    </Typography>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableRecurrence', {type: 'recurrence-date', value: {}})} draggable="true">
                            <RecurrenceBlockIndicator/>
                        </div>
                    </Box>
                    <Box sx={{ mb: -5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'variableDate', {type: 'recurrence-date', value: {}})} draggable="true">
                            <DateBlockIndicator/>
                        </div>
                    </Box>
                </CustomizerSpacing>

                <CustomizerSpacing className='customizer-body'>
                    <Typography
                        component='p'
                        variant='caption'
                        sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
                        >
                        Event blocks
                    </Typography>
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'request', {type: 'str'})} draggable="true">
                            <RequestBlockIndicator/>
                        </div>
                    </Box>
                    {newNodes.map(({ name, id }) => (
                        <Box key={name} sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                            <div onDragStart={(event) => onDragStart(event, name, {newId: id})} draggable="true">
                                {generateBlockIndicator(name)}
                            </div>
                        </Box>
                    ))}
                    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        <div onDragStart={(event) => onDragStart(event, 'test', {nbrEntry: 0})} draggable="true">
                            <TestBlockIndicator/>
                        </div>
                    </Box>
                    
                </CustomizerSpacing>

                </PerfectScrollbar>
            </Drawer>
        </Grid>
    )
  }
  
  export default ReactFlowComponent
