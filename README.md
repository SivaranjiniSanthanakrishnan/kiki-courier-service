# Kiki-courier-service

Kiki-Courier-service is a command line application that takes input from user and provides delivery time for each packages based on the offer code applied

## Install `Node.js`
- Install the appropriate versions of `node`, `npm`
  - You can use [nvm](https://github.com/creationix/nvm) to manage node versions
  - `npm` comes with `node`, and does not need to be separately installed

| package | version | install                                                             | update version                |
| ------- | ------- | ------------------------------------------------------------------- | ----------------------------- |
| node    | `20.x`  | `brew install node@{VERSION}` or [download](https://nodejs.org/en/) | `nvm install ${VERSION}`      |

## Install `npm` Module

Use npm workspaces to install all npm dependencies.

```
npm install
```

## Run Application

You can start the application using `npm` using below command.

```
npm start
```

## Input

1. First line of input consists of `Base delivery cost` and `No of packages`. Provide first line of input in the below format,

```
BaseDeliveryCost NoOfPackages
Eg: 100 5
```

2. Second line of input loops for number of packages given in the first line of input and it should contain details like `Package Name`, `Package weight`, `Package distance` and `Offer Code` if applies.

```
PackageName PackageWeight DistanceInKm OfferCode
Eg: PKG1 50 30 OFR001
```

Input in the above format should be given as many as number of packages. Every inputs should start with new line.

3. Once all inputs for packages are entered the input for vehicles should be given. Next line of input consists of `Number of vehicles`, `Maximum speed` and `Maximum Carriable Weight` for the package. 

```
NoOfVehicles MaxSpeed MaxCarriableWeight
Eg: 2 70 200
```

## Output

The output will consists of `Package Names`, `Discounted amount`, `Delivery cost` and `Delivery time` for all the packages. Output will be in the below format for all the packages.

```
PackageName Discount TotalCost EstimatedDeliveryTime
Eg: PKG4 105 1395 0.85
```

## Error Message
We may also receive below error messages if our input format is not correct.

- Package already provided!
- Invalid input provided. Please try again!
- Vehicle weight doesn't fit for any package

## Tests

### Run Spec & Integration Tests

```
npm test
---
// Run one spec file
npm test {your-spec-file.js}
```