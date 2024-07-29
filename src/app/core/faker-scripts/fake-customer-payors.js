const faker = require('faker');
const fs = require('fs');

class CustomerPaymentPayorResponseEntity {
    constructor(payorClientId, payorClientName, payorClientCustomerId, payorClientCustomerName) {
        this.payorClientId = payorClientId;
        this.payorClientName = payorClientName;
        this.payorClientCustomerId = payorClientCustomerId;
        this.payorClientCustomerName = payorClientCustomerName;
    }
}

function generateCustomerPaymentPayorResponseEntity() {
    const payorClientId = faker.datatype.number();
    const payorClientName = faker.company.companyName();
    const payorClientCustomerId = faker.datatype.number();
    const payorClientCustomerName = faker.name.findName();

    return new CustomerPaymentPayorResponseEntity(
        payorClientId,
        payorClientName,
        payorClientCustomerId,
        payorClientCustomerName
    );
}

function generateData(numberOfEntries) {
    const data = [];
    for (let i = 0; i < numberOfEntries; i++) {
        data.push(generateCustomerPaymentPayorResponseEntity());
    }
    return data;
}

const numberOfEntries = 10; // Change this to generate more entries
const customerPaymentData = generateData(numberOfEntries);

fs.writeFile('./src/app/core/faker-scripts/data/customerPayorData.json', JSON.stringify(customerPaymentData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('File has been written successfully');
    }
});
