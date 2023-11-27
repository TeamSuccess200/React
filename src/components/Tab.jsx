import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Home from "./Home";
import Answers from "./Answers";
import InquiryList2 from "./InquiryList2";
import InquiryPage from "./InquiryPage";

function TabApp() {
  const [value, setValue] = useState("home");
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleInquiryClick = (inquiryId) => {
    setValue("specificinquiry");
    setSelectedInquiryId(inquiryId);
  };

  const handleInquiryPageSubmit = () => {
    setValue("inquirylist2");
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="home" label="Home" />
        <Tab value="inquirylist2" label="Inquiry list" />
        <Tab disabled value="specificinquiry" label="Specific inquiry" />
        <Tab value="answers" label="Answer report" />
      </Tabs>
      {value === "home" && <Home />}
      {value === "answers" && <Answers />}
      {value === "inquirylist2" && (
        <InquiryList2 onInquiryClick={handleInquiryClick} />
      )}
      {value === "specificinquiry" && selectedInquiryId && (
        <InquiryPage
          inquiryId={selectedInquiryId}
          onInquiryClick={handleInquiryClick}
          onSubmit={handleInquiryPageSubmit}
        />
      )}
    </div>
  );
}

export default TabApp;
