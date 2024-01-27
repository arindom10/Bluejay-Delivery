import React, { useState } from "react";
import * as XLSX from "xlsx";

const EmployeeAnalysis = () => {
  const [fileName, setFileName] = useState("null");
  const [arryOfData, setArryOfData] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files[0];

    setFileName(file.name);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    setArryOfData(jsonData);
    console.log(typeof jsonData);
    console.log(jsonData);
  };

  return (
    <div>
      <h1>Spreadsheets Analysis</h1>

      {fileName && (
        <p>
          FileName: <span>{fileName}</span>
        </p>
      )}

      <input type="file" onChange={(e) => handleFile(e)} />
      <div>
        <p>Who Worked More Then Seven days</p>
        <div style={{ paddingLeft: "100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p style={{ width: "100px" }}>Serial</p>
            <p style={{ width: "200px" }}>Name</p>
            <p style={{ width: "100px" }}>Position ID</p>
            <p style={{ width: "100px" }}>Working Days</p>
            <p style={{ width: "150px" }}>Working Hours</p>
            <p style={{ width: "150px" }}>More Then 7 days</p>
            <p style={{ width: "150px" }}>
              More Then 1 hour <br /> Less Then 10 Hours
            </p>
            <p style={{ width: "150px" }}>More Then 14 hour</p>
          </div>
        </div>
        {arryOfData.slice(0, 100).map((single, index) => (
          <div key={index} style={{ paddingLeft: "100px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <p style={{ width: "100px" }}>{index + 1}</p>
              <p style={{ width: "200px" }}>{single.Employee_Name}</p>
              <p style={{ width: "100px" }}>{single.Position_ID}</p>
              <p style={{ width: "100px" }}>
                {Number(single.Pay_Cycle_End_Date) -
                  Number(single.Pay_Cycle_Start_Date)}
              </p>
              <p style={{ width: "150px" }}>{single.Timecard_Hours_as_Time}</p>
              <p style={{ width: "150px" }}>
                {Number(single.Pay_Cycle_End_Date) -
                  Number(single.Pay_Cycle_Start_Date) >=
                7
                  ? "Yes"
                  : "No"}
              </p>
              <p style={{ width: "150px" }}>
                {single.Timecard_Hours_as_Time.split(":")[0] >= 1 &&
                single.Timecard_Hours_as_Time.split(":")[0] < 10
                  ? "Yes"
                  : "No"}
              </p>
              <p style={{ width: "150px" }}>
                {single.Timecard_Hours_as_Time.split(":")[0] >= 14
                  ? "Yes"
                  : "No"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAnalysis;
