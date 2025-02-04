const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const junitReportDir = './newman';
const parser = new xml2js.Parser();
const builder = new xml2js.Builder({ headless: true });

async function enrichPostmanJUnitReports() {
  const junitFiles = fs.readdirSync(junitReportDir).filter(file => file.endsWith('.xml'));

  for (const junitFile of junitFiles) {
    const filePath = path.join(junitReportDir, junitFile);
    const xmlContent = fs.readFileSync(filePath, 'utf8');

    const result = await parser.parseStringPromise(xmlContent);

    // Traverse test cases and enrich each request as a separate test case
    result.testsuite.testcase.forEach(testcase => {
      if (testcase['system-out']) {
        const requestDetail = testcase['system-out'].join('\n');
        
        // Extracting relevant request info (this can be customized)
        if (requestDetail.includes('Request Name:')) {
          const requestName = requestDetail.split('Request Name: ')[1].split('\n')[0];
          testcase.$.name = `Request: ${requestName}`;  // Update test case name
        }
      }
    });

    // Write the updated XML back to the same file
    const updatedXML = builder.buildObject(result);
    fs.writeFileSync(filePath, updatedXML, 'utf8');

    console.log(`Updated ${filePath} with detailed Postman request mapping.`);
  }
}

enrichPostmanJUnitReports().catch(err => console.error('Error enriching JUnit reports:', err));