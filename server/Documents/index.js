module.exports = ( report ) => {
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
       </head>
       <style>

            .report{
                padding:2rem;
            }
        </style>
       <body>
       <div class="report">
          <h1>HealthMainz Report</h1>
          <br></br>
          <h2>Report ID: ${report.Report_ID} </h2>
          <br></br>
          <h2>Appointment ID: ${report.Appt_ID} </h2>
          <br></br>
          <h2>Doctor Name:  ${report.Doc_Name} </h2>
          <br></br>
          <h2>Patient Name: ${report.Pat_Name} </h2>
          <br></br>
          <h2>Appointment Date: ${report.Appt_Date} </h2>
          <br></br>
          <h2>Appointment Time: ${report.Appt_Time} </h2>
          <br></br>
          <h2>Doctor comments:  ${report.feedback} </h2>
         
          </div>
       </body>
    </html>
    `;
};