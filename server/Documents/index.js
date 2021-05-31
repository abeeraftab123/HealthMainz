const table = require("./table");
module.exports = ( report,appt,pat ) => {
return `

    <!DOCTYPE html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">
       </head>
       <style>
       body{
         padding:2%;
         font-family: 'Merriweather', serif;
       }
            .main ul li{
        list-style-type: none;
        display: inline-block;
      }

      .doctor{
          padding-left: 60%;
      }


      .main{
          width: 100%;
      }
      table{
        width:60%;
        border-collapse: collapse;
      }

      table tr td{
         border: 1px solid black;
         padding:10px;
      }

            
        </style>
      <body>
         <div class="main">
          <ul>
            <li>
              <div>
              <img src="C:\\Users\\Yashi S\\HealthMainz\\client\\src\\components\\patient\\Auth\\HealthMainz\\Public\\logo.png" />
                <h1>HealthMainz</h1>
                <p>healthmainz@gmail.com</p>
              </div>
            </li>
            <li class="doctor">
              <div>
                <h1>${report.Doc_Name}</h1>
                <p>${appt.doc_id}</p>
              </div>
            </li>
          </ul>
         </div>
         <hr />
         <div class="patient">
          <h2>Patient Details </h2>
          <p>${report.Pat_Name}, ${pat.pat_ID}<p>
          <p>DOB: ${pat.DOB} </p>
          <p>${pat.Address} </p>
         </div>
         <hr />
         <div class="report">
          <h2>Report ID :${report.Report_ID}</h2>
          <h3>Prescription</h3>
          <table>
            <tr>
              <td><strong>Medicine Name</strong></td>
              <td><strong>Dosage Instructions</strong></td>
            </tr>
            ${report.meds.map(med=>table(med))}
          </table>
          <h2>Doctor Feedback</h2>
          <p>${report.feedback}</p>
         </div>
      </body>
    </html>
    `;
};


// <!doctype html>
// <html>
//    <head>
//       <meta charset="utf-8">
//       <title>PDF Result Template</title>
//    </head>
//    <style>

//         .report{
//             padding:2rem;
//         }
//     </style>
//    <body>
//    <div class="report">
//    <div>
//    <h1>HealthMainz Report</h1>
//    <img src="C:\Users\Yashi S\HealthMainz\client\src\components\patient\Auth\HealthMainz\Public\logo.png" />
//    </div>
      
//       <br></br>
//       <h2>Report ID: ${report.Report_ID} </h2>
//       <br></br>
//       <h2>Appointment ID: ${report.Appt_ID} </h2>
//       <br></br>
//       <h2>Doctor Name:  ${report.Doc_Name} </h2>
//       <br></br>
//       <h2>Patient Name: ${report.Pat_Name} </h2>
//       <br></br>
//       <h2>Appointment Date: ${report.Appt_Date} </h2>
//       <br></br>
//       <h2>Appointment Time: ${report.Appt_Time} </h2>
//       <br></br>
//       <h2>Medicines Prescribed:</h2>
//       <br></br>
//       <table id="table">
//         <tr>
//            <td>Medicine Name</td>
//            <td>Dosage</td>
//         </tr>
//         ${report.meds.map(med=>table(med))}
//       </table>
//       <br></br>
//       <h2>Doctor comments:  ${report.feedback} </h2>
//       </div>
//    </body>
// </html>