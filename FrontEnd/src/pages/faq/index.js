import {Fragment, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Icon from "../../@core/components/icon";
import Typography from "@mui/material/Typography";
import FaqHeader from "../../views/faq/FaqHeader";
import FAQS from "../../views/faq/Faqs";
import FaqFooter from "../../views/faq/FaqFooter";

export default function faq() {
    const [data, setData] = useState({
        "faqData": [
            {
                "id": "test",
                "icon": "tabler:urgent",
                "title": "Test",
                "subtitle": "A description",
                "qandA": [
                    {
                        "id": 0,
                        "question": "Where do you live ?",
                        "answer": "I'm living in Frouzins"
                    }
                ]
            }
        ]
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('test')

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
