import React, { useEffect, useState } from "react";
//import Papa from "papaparse";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {
  // This state will store the parsed data
  const [data, setData] = useState({
    program: "",
    version: "",
    Date: "",
    Time: "",
    Shift: "",
    locationOfChange: "",
    changeDescription: "",
  });

  const [dataArr, setDataArr] = useState([]);

  // useEffect(() => {
  //   setDisplayData();
  // }, [data]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      var content = target.result;
      //remove line breaks
      content = content.replace(/(\r\n|\n|\r)/gm, "");
      //split the content into an array
      var contentSplit = content.split(",");
      //remove empty elements
      contentSplit = contentSplit.filter(isEmpty);
      console.log("content of file = " + content + "\n\n");
      console.log(contentSplit);
      console.log(contentSplit[1]);
      console.log();
      //var count = 0;

      // const dataObject = {
      //   program: contentSplit[contentSplit.indexOf("Program") + 1],
      //   version: contentSplit[contentSplit.indexOf("Version") + 1],
      //   Date: contentSplit[contentSplit.indexOf("Date") + 1],
      //   Time: contentSplit[contentSplit.indexOf("Time") + 1],
      //   Shift: contentSplit[contentSplit.indexOf("Shift") + 1],
      //   locationOfChange:
      //     contentSplit[contentSplit.indexOf("Location of Change") + 1],
      //   changeDescription:
      //     contentSplit[contentSplit.indexOf("Change Description") + 1],
      // };
      data.program = contentSplit[contentSplit.indexOf("Program") + 1];
      data.version = contentSplit[contentSplit.indexOf("Version") + 1];
      data.Date = contentSplit[contentSplit.indexOf("Date") + 1];
      data.Time = contentSplit[contentSplit.indexOf("Time") + 1];
      data.Shift = contentSplit[contentSplit.indexOf("Shift") + 1];
      data.locationOfChange =
        contentSplit[contentSplit.indexOf("Location of Change") + 1];
      data.changeDescription =
        contentSplit[contentSplit.indexOf("Change Description") + 1];
      setDataArr((dataArr) => ({
        dataArr,
        data,
      }));
      //clear object
      // setData({});
      // //fill object
      // setData((data) => ({
      //   dataObject,
      // }));
      //console.log(data)
      console.log(dataArr);
      console.log(data);
      console.log(JSON.stringify(data));
    };
    reader.readAsText(file);
  };

  function isEmpty(val) {
    if (val === "") {
      return false;
    } else {
      return true;
    }
  }

  function setDisplayData() {
    const displayData = (
      <div style={{ marginTop: "3rem" }}>
        <p>program: {data.program}</p>
        <p>version: {data.version}</p>
        <p>Date: {data.Date}</p>
        <p>Time: {data.Time}</p>
        <p>Shift: {data.Shift}</p>
        <p>Location Of Change: {data.locationOfChange}</p>
        <p>Change Description: {data.changeDescription}</p>
      </div>
    );
    return displayData;
  }

  return (
    <div>
      <header>
        <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
        </label>
        <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <div>
          <button onClick={handleParse}>Parse</button>
        </div>
      </header>
      <div style={{ marginTop: "3rem" }}>
        <p>program: {data.program}</p>
        <p>version: {data.version}</p>
        <p>Date: {data.Date}</p>
        <p>Time: {data.Time}</p>
        <p>Shift: {data.Shift}</p>
        <p>Location Of Change: {data.locationOfChange}</p>
        <p>Change Description: {data.changeDescription}</p>
      </div>
    </div>
  );
};

export default App;
