import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Icon from "../../@core/components/icon";
import Drawer from "@mui/material/Drawer";
import React, {Fragment, useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {getId} from "./Workflow";

const Indicator = ({color, name}) => {
  return (
    <Grid
      sx={{
        padding: "10px",
        borderRadius: '5px',
        background: color,
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.30)',
        position: 'relative',
        cursor: 'grab',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Public Sans',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '22px'
        }}
      >
        {name}
      </Typography>
    </Grid>
  );
};

export function ToolBoxDrawer({isOpen, handleDrawer, nodeStyles, setNodes}) {
  const [categories, setCategories] = useState({})

  useEffect(() => {
    let newCategories = {}
    for (const type in nodeStyles) {
      let category = nodeStyles[type].categories;

      if (category in newCategories) {
        newCategories[category].push({...nodeStyles[type], label: type})
      } else {
        newCategories[category] = [{...nodeStyles[type], label: type}]
      }
    }
    setCategories({...newCategories})
  }, [nodeStyles])

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    handleDrawer()
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleDrawer}
      hideBackdrop
      anchor='right'
      variant='persistent'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', 400] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h5'>
          ToolBox
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            onClick={handleDrawer}
            sx={{
              p: '0.375rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        {Object.keys(categories).map((category, i) => {
          return (
            <Fragment key={i}>
              <Typography
                component='p'
                variant='caption'
                sx={{ mb: 5, color: 'text.disabled', textTransform: 'uppercase' }}
              >
                {category}
              </Typography>
              {categories[category].map((element, i) => {
                return (
                  <Box key={i} sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                    <div
                      onDragStart={(event) => onDragStart(event, element.label)}
                      draggable="true"
                      onClick={() => {
                        const newNode = {
                          id: getId(),
                          "type": "baseNode",
                          position: {
                            "x": 0,
                            "y": 0
                          },
                          data: {
                            label: element.label,
                            ...nodeStyles[element.label]
                          },
                        };

                        setNodes((nds) => nds.concat(newNode));
                        handleDrawer()
                      }}
                    >
                      <Indicator color={element.background} name={element.name} />
                    </div>
                  </Box>
                )
              })}
            </Fragment>
          )
        })}
      </Box>
    </Drawer>
  )
}
