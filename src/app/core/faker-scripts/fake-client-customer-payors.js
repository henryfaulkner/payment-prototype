const faker = require('faker');
const fs = require('fs');

class ClientPaymentPayorResponseEntity {
    constructor(payorClientId, payorClientName) {
        this.payorClientId = payorClientId;
        this.payorClientName = payorClientName;
    }
}

class CustomerPaymentPayorResponseEntity {
    constructor(payorClientId, payorClientName, payorClientCustomerId, payorClientCustomerName) {
        this.payorClientId = payorClientId;
        this.payorClientName = payorClientName;
        this.payorClientCustomerId = payorClientCustomerId;
        this.payorClientCustomerName = payorClientCustomerName;
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

function generateCustomerPaymentPayorResponseEntity(payorClientId, payorClientName) {
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
    const clientPaymentData = [];
    const customerPaymentData = [];

    for (let i = 0; i < numberOfEntries; i++) {
        const clientEntity = generateClientPaymentPayorResponseEntity();
        clientPaymentData.push(clientEntity);

        const customerEntity = generateCustomerPaymentPayorResponseEntity(
            clientEntity.payorClientId,
            clientEntity.payorClientName
        );
        customerPaymentData.push(customerEntity);
    }

    return { clientPaymentData, customerPaymentData };
}

const numberOfEntries = 10; // Change this to generate more entries
const { clientPaymentData, customerPaymentData } = generateData(numberOfEntries);

fs.writeFile('./src/app/core/faker-scripts/data/clientsPayorData.json', JSON.stringify(clientPaymentData, null, 2), (err) => {
    if (err) {
        console.error('Error writing clientPayments.json', err);
    } else {
        console.log('clientPayments.json has been written successfully');
    }
});

fs.writeFile('./src/app/core/faker-scripts/data/customerPayorData.json', JSON.stringify(customerPaymentData, null, 2), (err) => {
    if (err) {
        console.error('Error writing customerPayments.json', err);
    } else {
        console.log('customerPayments.json has been written successfully');
    }
});
