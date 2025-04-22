import React from "react";

const ReportGenerating = () => {
  return (
    <div id="report">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <em>Report Generating...</em>
      </div>
    </div>
  );
};

export default ReportGenerating;
