import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InquiryPage from "./InquiryPage";

function InquiryList2({ onInquiryClick }) {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const fetchInquiries = () => {
    fetch("http://localhost:8080/inquiries")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch: " + response.statusText);
      })
      .then((data) => {
        setInquiries(data);
      })
      .catch((err) => console.error(err));
  };

  const handleInquiryClick = (inquiryId) => {
    onInquiryClick(inquiryId);
    setSelectedInquiryId(inquiryId);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <>
      <h1>Inquiries</h1>
      <p>Choose the inquiry you want to open.</p>

      <div>
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.inquiryId}
            style={{marginBottom: '10px'}}
          >
            <button onClick={() => handleInquiryClick(inquiry.inquiryId)}>
              <h3>{inquiry.name}</h3>
            </button>
          </div>
        ))}
      </div>

      {selectedInquiryId && (
        <Tabs value={"specificinquiry"}>
          <Tab label="Specific Inquiry" value="specificinquiry">
            {/* Pass onInquiryClick prop to InquiryPage to handle navigation back to the list */}
            <InquiryPage
              inquiryId={selectedInquiryId}
              onInquiryClick={onInquiryClick}
            />
          </Tab>
        </Tabs>
      )}
    </>
  );
}

export default InquiryList2;
