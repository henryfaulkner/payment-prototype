const faker = require('faker');
const fs = require('fs');

function generatePayment() {
    const paymentAmount = faker.finance.amount(100, 10000, 2); // Payment amount between 100 and 10000
    const balance = faker.finance.amount(0, paymentAmount - 1, 2); // Balance is positive and less than paymentAmount

    return {
        iD: faker.datatype.number(),
        paymentSourceID: faker.datatype.boolean() ? faker.datatype.number() : null,
        clientID: faker.datatype.boolean() ? faker.datatype.number() : null,
        paymentNumber: faker.datatype.boolean() ? faker.finance.account() : null,
        paymentDate: faker.datatype.boolean() ? faker.date.past().toISOString() : null,
        paymentAmount: parseFloat(paymentAmount),
        paymentStatusID: faker.datatype.boolean() ? faker.datatype.number({ min: 1, max: 5 }) : null,
        paymentMethodID: faker.datatype.boolean() ? faker.datatype.number({ min: 1, max: 10 }) : null,
        balance: parseFloat(balance),
        reversalDate: faker.datatype.boolean() ? faker.date.past().toISOString() : null,
        reversalReasonID: faker.datatype.boolean() ? faker.datatype.number({ min: 1, max: 10 }) : null,
        clientCustomerID: faker.datatype.boolean() ? faker.datatype.number() : null,
        notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        sourceFundingTransactionID: faker.datatype.boolean() ? faker.datatype.number() : null,
        transactionKey: faker.datatype.number(),
    };
}

function generateData(numberOfEntries) {
    const data = [];
    for (let i = 0; i < numberOfEntries; i++) {
        data.push(generatePayment());
    }
    return data;
}

const numberOfEntries = 10; // Change this to generate more entries
const payments = generateData(numberOfEntries);

fs.writeFile('./src/app/core/faker-scripts/data/unreleasedPaymentsData.json', JSON.stringify(payments, null, 2), (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('payments.json has been written successfully');
    }
});
