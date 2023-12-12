import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InquiryPage from "./InquiryPage";
import ReportPage from "./ReportPage";
import "bootstrap/dist/css/bootstrap.min.css";

function InquiryList2({ onInquiryClick, onAnswerClick }) {
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

  //handleInquiryClick updates the value state in TabApp to "specificinquiry"
  //and sets the selectedInquiryId state
  const handleInquiryClick = (inquiryId) => {
    onInquiryClick(inquiryId);
    setSelectedInquiryId(inquiryId);
  };

  const handleAnswerClick = (inquiryId) => {
    onAnswerClick(inquiryId);
    setSelectedInquiryId(inquiryId);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="container mt-5" style={{ marginLeft: "10px" }}>
      <h1>Inquiries</h1>
      <p>Choose the inquiry you want to open.</p>

      {inquiries.map((inquiry) => (
        <div key={inquiry.inquiryId} className="mb-3">
          <div className="card">
            <div className="card-body text-start">
              {/*clicking inquiry calls "handleInquiryClick" */}
              <button
                className="btn btn-primary"
                onClick={() => handleInquiryClick(inquiry.inquiryId)}
              >
                <h3>{inquiry.name}</h3>
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => handleAnswerClick(inquiry.inquiryId)}
              >
                <h3>Show answers</h3>
              </button>
            </div>
          </div>
        </div>
      ))}

      {selectedInquiryId && (
        <Tabs value={"specificinquiry"} className="mt-3">
          <Tab label="Specific Inquiry" value="specificinquiry">
            <InquiryPage
              inquiryId={selectedInquiryId}
              onInquiryClick={onInquiryClick}
            />
          </Tab>
        </Tabs>
      )}

      {selectedInquiryId && (
        <Tabs value={"specificreport"} className="mt-3">
          <Tab label="Specific Report" value="specificreport">
            <ReportPage
              inquiryId={selectedInquiryId}
              onAnswerClick={onAnswerClick}
            />
          </Tab>
        </Tabs>
      )}
    </div>
  );
}

export default InquiryList2;
