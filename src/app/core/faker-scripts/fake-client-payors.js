const faker = require('faker');
const fs = require('fs');

class ClientPaymentPayorResponseEntity {
    constructor(payorClientId, payorClientName) {
        this.payorClientId = payorClientId;
        this.payorClientName = payorClientName;
    }
}

function generateClientPaymentPayorResponseEntity() {
    const payorClientId = faker.datatype.number();
    const payorClientName = faker.company.companyName();

    return new ClientPaymentPayorResponseEntity(
        payorClientId,
        payorClientName
    );
}

function generateData(numberOfEntries) {
    const data = [];
    for (let i = 0; i < numberOfEntries; i++) {
        data.push(generateClientPaymentPayorResponseEntity());
    }
    return data;
}

const numberOfEntries = 10; // Change this to generate more entries
const clientPaymentData = generateData(numberOfEntries);

fs.writeFile('./src/app/core/faker-scripts/data/clientsPayorData.json', JSON.stringify(clientPaymentData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('File has been written successfully');
    }
});
