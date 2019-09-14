## Form/Screen/Question drag and drop proof of concept

The validation portion is the main thing here, which is handled in `./tools/validate.js`. It is called in `./tools/state.js`, where new state is validated right before performing a `setState` with the new state. 

If validation fails, the new state is discarded and an error message is added explaining why the update was aborted.

Can be run via beanstalk here: 
http://reactdrag-env.farxhez6zq.us-east-2.elasticbeanstalk.com/

-----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.