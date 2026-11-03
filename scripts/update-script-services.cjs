const fs = require('fs');
const path = require('path');

const scriptPath = path.resolve(__dirname, '../script.js');
const servicesPath = path.resolve(__dirname, '../data/services.json');

const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

// Format services nicely
const formattedServices = JSON.stringify(servicesData, null, 2);

const startMarker = 'var DEFAULT_SERVICES = window.DEFAULT_SERVICES || [';
const endMarker = 'window.DEFAULT_SERVICES = DEFAULT_SERVICES;';

const startIndex = scriptContent.indexOf(startMarker);
const endIndex = scriptContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found in script.js');
  process.exit(1);
}

const replacement = `var DEFAULT_SERVICES = (typeof window !== 'undefined' && window.DEFAULT_SERVICES && window.DEFAULT_SERVICES.length >= 21) 
  ? window.DEFAULT_SERVICES 
  : ${formattedServices};\nwindow.DEFAULT_SERVICES = DEFAULT_SERVICES;`;

const newScript = scriptContent.slice(0, startIndex) + replacement + scriptContent.slice(endIndex + endMarker.length);
fs.writeFileSync(scriptPath, newScript, 'utf-8');
console.log('Successfully updated script.js with all 21 default services!');
