import { useState, useEffect } from "react";

function InquiryList2() {
  const [inquiries, setInquiries] = useState([]);

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

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <>
      <h1>Inquiries</h1>

      <div>
        {inquiries.map((inquiry) => (
          <div key={inquiry.inquiryId}>
            <h3>{inquiry.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default InquiryList2;
