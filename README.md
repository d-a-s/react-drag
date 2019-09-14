## Form/Screen/Question drag and drop proof of concept

The validation portion is the main thing here, which is handled in `./tools/validate.js`. It is called in `./tools/state.js`, where new state is validated right before performing a `setState` with the new state. 

If validation fails, the new state is discarded and an error message is added explaining why the update was aborted.

Can be run via beanstalk here: 

http://reactdrag-env.farxhez6zq.us-east-2.elasticbeanstalk.com/

## Usage instructions:
- drag and drop screens/questions to reorder
- click existing criteria to remove
- click [+] button to add new criteria
- click question name/number to edit

Validation should abort any operations (with error message) that would cause issues. 
- Duplicate question are not allowed
- Criteria questions must appear in order before they are used as a criteria. 

This also prevents:
- a question from listing itself as a criteria
- a screen from having a contained question as a criteria
- circular references (two questions having each other as criteria)

Criteria can be added which do not correspond with a question. In a live app there should probably be a white-list to validate these, but for purposes of this spike it is assumed that these are either valid criteria from the server, or possibly from another preceeding form.

---
.

.

.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.