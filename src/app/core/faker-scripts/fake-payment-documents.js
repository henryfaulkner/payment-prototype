const faker = require('faker');
const fs = require('fs');

// Number of records to generate
const numRecords = 10;

// Function to generate a single fake record
const generateRecord = () => ({
  iD: faker.random.number({ min: 1, max: 100 }),
  fileName: `${faker.system.fileName().replace(/\.[^/.]+$/, '')}.pdf`,
  storageUrl: faker.internet.url(),
});

// Generate an array of records
const records = Array.from({ length: numRecords }, generateRecord);

// Write the array to a JSON file
fs.writeFile('./src/app/core/faker-scripts/data/paymentDocumentsData.json', JSON.stringify(records, null, 2), (err) => {
  if (err) {
    console.error('Error writing file', err);
  } else {
    console.log('File successfully written');
  }
});
