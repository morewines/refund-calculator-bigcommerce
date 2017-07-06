# Partial Refund Calculator <sup>for BigCommerce!</sup>

#### Purpose

Internal tool to minimize errors and greatly boost efficiency by eliminating manually calculated partial refunds.

This tool saves 5-7 minutes of manual calculation **in addition** to the required double check for each manual partial refund transaction processed.

#### Why?? Why in the world would you need a tool like this?

Well... BigCommerce doesn't have automatic partial refund calculation unlike other OOTB ecommerce platforms.

## Technology Used

#### Front End:

ReactJS | JavaScript ES6 | SuperAgent | React-Icons | React-Modal

HTML5 | CSS3 | MilligramIO

#### Back End:

NodeJS | ExpressJS | Request | BigCommerce API

#### Deployment:

Heroku-PostBuild

## Getting Started

The live web app is behind an access key. However, feel free to run a local version by setting your own access code and BigCommerce API credentials in your environment variables.

## Next Steps

##### Near Term

- Ability to add substitute items or completely remove items from order instead of just adjustments
- Integrate with ShipperHQ to automatically pull shipping rates (dependant on pending API access)
- Have a sidebar of 7 day rolling orders to save a few seconds more time (low prio)

##### Long Term

- Integrate with BigCommerce as well as Payment Processor for one click process refunds rather than logging into BC and Payment Gateway

##### Probably Never Term

- Turn into single click BigCommerce Marketplace App
