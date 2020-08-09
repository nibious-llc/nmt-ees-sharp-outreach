# Sharp Interface Calculator

This code will calculate the sharp interface for user specified input values. It
is designed to be an educational outreach tool. 


## Development Commands

### yarn start

Start the development server

### yarn build

Build a production version

### yarn deploy

Deploy the application via GitHub Pages. This will also do a build automatically.

## Deployment Information

The project is completed in JavaScript with an ejected create-react-app
template. All calculations are completed in 2 web workers: one for sharp
interface and one for flow vectors. This allows the application to be responsive
while the calculations are being computed. 