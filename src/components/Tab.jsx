import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InquiryList from './InquiryList';
import Home from './Home';
import Answers from './Answers';

function TabApp() {
    const [value, setValue] = useState("home");

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="home" label="Home" />
                <Tab value="inquirylist" label="Inquiry list" />
                <Tab value="answers" label="Answer report" />
            </Tabs>
            {value === "home" && <Home />}
            {value === "inquirylist" && <InquiryList />}
            {value === "answers" && <Answers />}
        </div>

    )
}

export default TabApp