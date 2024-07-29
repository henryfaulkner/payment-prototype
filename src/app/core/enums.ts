export enum StepIndexes {
    Documents = 0,
    Sources = 1,
    FindPayor = 2, 
    Details = 3,
    Application = 4,
};

export enum PaymentSources {
    Customer = 0,
    Client = 1, 
    Atradius = 2,
}

export enum PaymentNavEvent {
    None = 0,
    Back = 1,
    Forward = 2,
}