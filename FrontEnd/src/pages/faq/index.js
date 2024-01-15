import {Fragment, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Icon from "../../@core/components/icon";
import Typography from "@mui/material/Typography";
import FaqHeader from "../../views/faq/FaqHeader";
import FAQS from "../../views/faq/Faqs";
import FaqFooter from "../../views/faq/FaqFooter";

export default function faq() {
    const [data, setData] = useState(
  {
    "faqData": [
    {
      "id": "User Interface and Navigation",
      "icon": "tabler:users",
      "title": "User Interface and Navigation",
      "subtitle": "",
      "qandA": [
        {
          "id": 0,
          "question": "What does LinkEase's homepage offer to users?",
          "answer": "LinkEase's homepage provides a compelling experience, presents key information, and guides users to different sections of the site."
        },
        {
          "id": 1,
          "question": "How is LinkEase's homepage structured?",
          "answer": "The homepage includes a navigation bar to access various LinkEase features. Users can create new Workspaces and Services by clicking the 'Create' buttons."
        },
        {
          "id": 2,
          "question": "What information is available in the Workspaces tables on the homepage?",
          "answer": "Each Workspace table displays the Workspace name, creator, user list, and Workspace status (enabled or disabled)."
        },
        {
          "id": 3,
          "question": "How can I quickly create a new Workspace from the homepage?",
          "answer": "Users can create a new Workspace by clicking the 'Create Workspace' button and providing necessary information, facilitating the initiation of new projects."
        },
        {
          "id": 4,
          "question": "What actions can I perform on a Workspace from the Workspaces page?",
          "answer": "On the Workspaces page, you can view, edit, enable/disable, duplicate, and delete a Workspace. These actions offer complete control over collaborative project management."
        },
        {
          "id": 5,
          "question": "How do I create a new automate from the Automate page?",
          "answer": "Using the 'Create automate' button, you can create a new automate and add it directly to the relevant Workspace."
        },
        {
          "id": 6,
          "question": "What elements are displayed on the LinkService Service page?",
          "answer": "The LinkService Services page displays a list of available Services with information such as Service name, creator, users, and Service status."
        },
        {
          "id": 7,
          "question": "How can I create a new Service from the Services page?",
          "answer": "Users can create a new Service by clicking the 'Create Service' button and providing necessary information, allowing seamless integration with partner sites."
        },
        {
          "id": 8,
          "question": "How can I customize my account from the User Settings page?",
          "answer": "The User Settings page offers four distinct sections to manage the account: Account, Security, Friends, and Connection. You can modify your profile picture, update your email, change your password, manage friends, etc."
        },
        {
          "id": 9,
          "question": "How does the search bar work on the User Settings page?",
          "answer": "The search bar on the User Settings page allows you to search for items throughout the site, including Workspace, Service, and FAQ. It provides quick navigation to desired information."
        }
      ]
    },
    {
      "id": "Workflow Basics",
      "icon": "tabler:command",
      "title": "Workflow Basics",
      "subtitle": "",
      "qandA": [
        {
          "id": 0,
          "question": "What is the Workflow on LinkEase?",
          "answer": "The Workflow on LinkEase is a powerful feature allowing users to create and manage automates, defining sequences of actions and triggers to automate various processes."
        },
        {
          "id": 1,
          "question": "How can I access the Workflow creation interface from the main page?",
          "answer": "You can access the Workflow creation interface by editing an existing Automate or adding new actions/triggers. The 'Create Workflow' button is also available on the main Automate page."
        },
        {
          "id": 2,
          "question": "What key actions can I perform with the Workflow?",
          "answer": "The Workflow offers several features, including creating custom actions, managing triggers, exporting/importing configurations, recording changes, and adding blocks via the 'ToolBox.'"
        },
        {
          "id": 3,
          "question": "How can I use the ToolBox in the Workflow?",
          "answer": "The ToolBox is an organized set of ready-to-use blocks to build your automate. You can add these blocks by dragging them from the ToolBox to the Workflow creation space."
        },
        {
          "id": 4,
          "question": "What types of blocks are available in the ToolBox?",
          "answer": "The ToolBox offers blocks from different categories, such as Conversion, Variable, Mark, Control, Event, Comparison, and Events. Each category provides specific blocks for various actions and logics."
        }
      ]
    },
    {
      "id": "Workflow Block Functionalities",
      "icon": "tabler:3d-cube-sphere",
      "title": "Workflow Block Functionalities",
      "subtitle": "",
      "qandA": [
        {
          "id": 0,
          "question": "Can you explain how the 'Control' category blocks in the ToolBox work?",
          "answer": "The blocks in the 'Control' category (blue) execute complex actions. Among them are blocks like 'If' for conditional actions, 'For' for loops, 'ForEach' for specific loops, 'On' to trigger an action on an event, and 'At' to schedule an action at a specific time."
        },
        {
          "id": 1,
          "question": "How can I connect blocks in the Workflow?",
          "answer": "Blocks can be connected using links represented by colored dots. Each port type has a specific color, indicating the expected connection type. You can connect two ports by clicking on the edge of the source port, holding, and dragging to the destination port."
        },
        {
          "id": 2,
          "question": "Can I customize blocks in the Workflow?",
          "answer": "Yes, you can customize blocks by left-clicking on a block, opening a pop-up with block-specific options. You can dynamically add input ports or delete the block via this pop-up."
        },
        {
          "id": 3,
          "question": "What possibilities does the IA prompt offer in the Workflow?",
          "answer": "The IA prompt facilitates creation by understanding natural commands. It can be used for tasks such as creating links between blocks, deleting links, or any other Workflow management command."
        },
        {
          "id": 4,
          "question": "How can I export/import a Workflow on LinkEase?",
          "answer": "You can export your Workflow content in JSON format using the 'Export' button. Similarly, the 'Import' button allows you to load an existing Workflow, providing flexibility in configuration management."
        }
      ]
    }
  ]
  })
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('User Interface and Navigation')

    const handleChange = (event, newValue) => {
        setActiveTab(newValue)
    }

    const renderNoResult = (
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', '& svg': { mr: 2 } }}>
            <Icon fontSize='1.5rem' icon='tabler:alert-circle' />
            <Typography variant='h5'>No Results Found!!</Typography>
        </Box>
    )

    return (
        <Fragment>
            <FaqHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {data !== null ? <FAQS data={data} activeTab={activeTab} handleChange={handleChange} /> : renderNoResult}
            <FaqFooter />
        </Fragment>
    )
}
