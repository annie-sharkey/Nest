// import React, { Component } from "react";
// import "./JSONtoExcel.css";

// //***Note: to make sure that data is in the right column, if a field is empty, make sure it is set to an empty string instead of not being there at all

// const value = [
//   {
//     Vehicle: "BMW",
//     Date: "30, Jul 2013 09:24 AM",
//     Location: "Hauz Khas, Enclave, New Delhi, Delhi, India",
//     Speed: 42,
//     Test: "test"
//   },
//   {
//     Vehicle: "Honda CBR",
//     Date: "30, Jul 2013 12:00 AM",
//     Location: "Military Road,  West Bengal 734013,  India",
//     Speed: 0
//   },
//   {
//     Vehicle: "Supra",
//     Date: "30, Jul 2013 07:53 AM",
//     Location: "Sec-45, St. Angel's School, Gurgaon, Haryana, India",
//     Speed: 58,
//     Test: "test"
//   },
//   {
//     Vehicle: "Land Cruiser",
//     Date: "30, Jul 2013 09:35 AM",
//     Location: "DLF Phase I, Marble Market, Gurgaon, Haryana, India",
//     Speed: 83,
//     Test: "test"
//   },
//   {
//     Vehicle: "Suzuki Swift",
//     Date: "30, Jul 2013 12:02 AM",
//     Location:
//       "Behind Central Bank RO, Ram Krishna Rd by-lane, Siliguri, West Bengal, India",
//     Speed: 0,
//     Test: "test"
//   },
//   {
//     Vehicle: "Honda Civic",
//     Date: "30, Jul 2013 12:00 AM",
//     Location:
//       "Behind Central Bank RO, Ram Krishna Rd by-lane, Siliguri, West Bengal, India",
//     Speed: 0,
//     Test: "test"
//   },
//   {
//     Vehicle: "Honda Accord",
//     Date: "30, Jul 2013 11:05 AM",
//     Location: "DLF Phase IV, Super Mart 1, Gurgaon, Haryana, India",
//     Speed: 71,
//     Test: "test"
//   }
// ];
// export default class JSONtoExcel extends Component {
//   handleClick = event => {
//     var data = value;
//     if (data == "") return;

//     this.JSONToCSVConvertor(data, "Vehicle Report", true);
//   };

//   JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
//     var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

//     var CSV = "";
//     //Set Report title in first row or line

//     CSV += ReportTitle + "\r\n\n";

//     //This condition will generate the Label/Header
//     if (ShowLabel) {
//       var row = "";

//       //This loop will extract the label from 1st index of on array
//       for (var index in arrData[0]) {
//         //Now convert each value to string and comma-seprated
//         row += index + ",";
//       }

//       row = row.slice(0, -1);

//       //append Label row with line break
//       CSV += row + "\r\n";
//     }

//     //1st loop is to extract each row
//     for (var i = 0; i < arrData.length; i++) {
//       var row = "";

//       //2nd loop will extract each column and convert it in string comma-seprated
//       for (var index in arrData[i]) {
//         row += '"' + arrData[i][index] + '",';
//       }

//       row.slice(0, row.length - 1);

//       //add a line break after each row
//       CSV += row + "\r\n";
//     }

//     if (CSV == "") {
//       alert("Invalid data");
//       return;
//     }

//     //Generate a file name
//     var fileName = "MyReport_";
//     //this will remove the blank-spaces from the title and replace it with an underscore
//     fileName += ReportTitle.replace(/ /g, "_");

//     //Initialize file format you want csv or xls
//     var uri = "data:text/csv;charset=utf-8," + escape(CSV);

//     // Now the little tricky part.
//     // you can use either>> window.open(uri);
//     // but this will not work in some browsers
//     // or you will not get the correct file extension

//     //this trick will generate a temp <a /> tag
//     var link = document.createElement("a");
//     link.href = uri;

//     //set the visibility hidden so it will not effect on your web-layout
//     link.style = "visibility:hidden";
//     link.download = fileName + ".csv";

//     //this part will append the anchor tag and remove it after automatic click
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   render() {
//     return (
//       <div className="mydiv">
//         {/*<textarea id="txt" className="txtarea" value={value} />*/}
//         <button className="gen_btn" onClick={event => this.handleClick(event)}>
//           Generate File
//         </button>
//       </div>
//     );
//   }
// }
