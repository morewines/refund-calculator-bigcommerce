# refund-calculator-bigcommerce

#### Purpose

Internal tool to minimize errors and greatly boost efficiency by eliminating the need to manually calculate partial refunds.

This tool saves 5-7 minutes of manual calculation plus the required double check for each partial refund transaction processed.

#### Why?? Why in the world would you need a tool like this?

Well... BigCommerce doesn't have automatic partial refund calculation like most other platforms.

## Technology Used

#### Front End:

ReactJS | JavaScript ES6 | SuperAgent | React-Icons | React-Modal

HTML5 | CSS3 | MilligramIO

#### Back End:

NodeJS | ExpressJS | Request | BigCommerce API

#### Deployment:

Heroku-PostBuild

##Next Steps

##### Near Term

- Integrate with ShipperHQ to automatically pull shipping rates
- Have a sidebar of 7 day rolling orders to save a few seconds more time (low prio)

##### Long Term

- Integrate with BigCommerce as well as Payment Processor for one click process refunds rather than logging into BC and Payment Gateway

##### Probably Never Term

- Turn into single click BigCommerce Marketplace App
