import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Home from "./Home";
import InquiryList2 from "./InquiryList2";
import InquiryPage from "./InquiryPage";
import ReportPage from "./ReportPage";

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

  const handleAnswerClick = (inquiryId) => {
    setValue("specificreport");
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
        <Tab disabled value="specificreport" label="Specific report" />
      </Tabs>
      {value === "home" && <Home />}
      {value === "inquirylist2" && (
        <InquiryList2
          onInquiryClick={handleInquiryClick}
          onAnswerClick={handleAnswerClick}
        />
      )}

      {value === "specificinquiry" && selectedInquiryId && (
        <InquiryPage
          inquiryId={selectedInquiryId}
          onInquiryClick={handleInquiryClick}
          onSubmit={handleInquiryPageSubmit}
        />
      )}
      {value === "specificreport" && selectedInquiryId && (
        <ReportPage
          inquiryId={selectedInquiryId}
          onAnswerClick={handleAnswerClick}
        />
      )}
    </div>
  );
}

export default TabApp;
