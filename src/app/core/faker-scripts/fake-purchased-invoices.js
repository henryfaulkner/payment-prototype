const faker = require('faker');
const fs = require('fs');

function generatePurchasedInvoice() {
    const invoiceNumber = faker.finance.account();
    const approvedAmount = faker.finance.amount();
    const balance = faker.finance.amount();
    const purchaseDate = faker.date.past().toISOString();
    const dPD = faker.datatype.number({ min: 1, max: 365 });
    const storageUrl = faker.internet.url();

    return {
        invoiceNumber,
        approvedAmount: parseFloat(approvedAmount),
        balance: parseFloat(balance),
        purchaseDate,
        dPD,
        storageUrl
    };
}

function generateData(numberOfEntries) {
    const data = [];
    for (let i = 0; i < numberOfEntries; i++) {
        data.push(generatePurchasedInvoice());
    }
    return data;
}

const numberOfEntries = 10; // Change this to generate more entries
const purchasedInvoices = generateData(numberOfEntries);

fs.writeFile('./src/app/core/faker-scripts/data/appliedPurchasedInvoicesData.json', JSON.stringify(purchasedInvoices, null, 2), (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('File has been written successfully');
    }
});
