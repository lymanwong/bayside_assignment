const fs = require('fs');
const prompts = require('prompts');

//Prompt user for input
const questions = [
  {
    type: 'text',
    name: 'searchTerms',
    message: 'What is the search terms you wish to use to find duplicate text?'
  },
  {
    type: 'text',
    name: 'fileLocation',
    message: 'Please provide the exact path to your file to search for duplicate text. If you do not have one, try examples/text.txt .'
  },
  {
    type: 'text',
    name: 'action',
    message: 'What action would you like to take? Please type one: Report or Delete.',
  }
];

(async () => {
  const response = await prompts(questions);
	console.log("You want us to look for: " + response.searchTerms + " in " + response.fileLocation + " and " + response.action);
 	const responseSearchTerms = response.searchTerms;
 	const responseFileLocation = response.fileLocation;
 	const responseAction = response.action;
 	uniqueVals(responseSearchTerms, responseFileLocation, responseAction)
})();


// Create a function where you open and read the contents of a file
function uniqueVals(string, fileLocationString, action) {

	//Opens the file at the location given by the user
	fs.readFile(fileLocationString, 'utf8', (err, data) => {

		//Check if there is an error opening the file and throw an error if there's a problem
		if (err) {
			throw 'could not open file: ' + err
		}

		const rawData = data;

		//Creates an array of words from the text file provided by the user
	    const result = [...data.matchAll(/(.+?\.)\s*/g)].map(e => e[1]);

	    //This will hold an array of sentence arrays seperated by commas [[word1,word2],[word3,word4],etc..]
	    const collection = [];

	    //Loop through each item in the arry of words
	    for(let i = 0; i < result.length; i++) {

	    	//Creates an array of arrays of the text file in lower case [[word1,word2],[word3,word4],etc..]
	    	collection.push(result[i].toLowerCase().split(" "));
	    }
	    searchArray(string, result, action, collection, fileLocationString, rawData);
	})
}

//Create a function where we are comparing the user-defined search terms with the words in the text
function searchArray(string, result, action, collection, fileLocationString, rawData){

	//Creates an array of the user-defined search terms in lower case
	const lowSearchString = string.toLowerCase().split(" ");

	//This will hold the matching search terms from the user
	const matchingCollection = [];

	//For each item in the collection array compare the elements with elements from the search terms
	for (let i = 0; i < collection.length; i++) {
		for (let j = 0; j < collection[j].length; j++) { //for each array in the collection array
			for (let k = 0; k < lowSearchString.length; k++) { //for each item in the lowSearchString array

				//Add array index of matches to the matchingCollection array
				if (collection[i][j] == lowSearchString[k]) {
					matchingCollection.push(i);
				}
			}
		}
	}
	executeCommand(string, result, action, collection, matchingCollection, lowSearchString, fileLocationString, rawData);
}

// Create a function to execute what the user wants to do - report duplicates or delete duplicates
function executeCommand(string, result, action, collection, matchingCollection, lowSearchString, fileLocationString, rawData){
	//Formats the user input to lower case
	const lowAction = action.toLowerCase();

	//Creates a SET with only unique values from the matchingCollection array
	const uniqueSet = new Set(matchingCollection);

	//Converts the set from the previous function to an array we can use
	const backToArray = [...uniqueSet];

	//Create a different varible, so that I don't edit the original data set
	const editedCollection = collection;

	//Executes if the user decides to see a report about where the duplicate lines are
	if (lowAction == "report") {

		//Calls a function to make the array readable so the user will know which lines are duplicates
		const readableArray = backToArray.map(convertToReadableArray);

		 //Function adds one to the index so it's readable for the user when referencing a line number on a document
		function convertToReadableArray(num) {
			return num + 1;
		};

		//Check if there is more than one match.
		//If there is only one or less match, then there are no duplicates and tell the user
		if (readableArray.length <= 1) {
			console.log("There are no sentences that contains your search terms.")
			return

		//If there is more than one match, then display the location of the duplicates in the report
		} else {

			//Prints the report to the user with lines are duplicates
			console.log("Your duplicates can be found on the following lines: " + readableArray + ".");
			}
		}

	//Executes if the user wants to delete the duplicate lines from the text file
	else if (lowAction == "delete") {

		//Decided to reverse the array because if we remove the first element, the array order will change
		backToArray = backToArray.reverse();

		//Loop over every element of the element location (backtToArry) and delete the nested array (sentence) at location editedCollection[i]
		for (let i = 0; i < backToArray.length; i++) {
		    editedCollection.splice(backToArray[i],1);
		}
		formatFile(string, result, action, collection, matchingCollection, lowSearchString, fileLocationString, editedCollection, rawData);
	}
	//Executes if the user added an invalid option
	else {
		console.log("Sorry, but you have entered an invalid option.");
	}
}

//Format the edited collection to prep it for writing it to the new document
function formatFile(string, result, action, collection, matchingCollection, lowSearchString, fileLocationString, editedCollection, rawData) {

	//Loop over each array (sentence) and capitalize the first letter of each sentence
	for (let i = 0; i < editedCollection.length; i++) {
		editedCollection[i][0] = editedCollection[i][0].charAt(0).toUpperCase() + editedCollection[i][0].slice((1));
	}

	//Combine the nested arrays (sentences) into a paragraph
		const formattedCollection = editedCollection.flat().join(" ");
		createFile(string, result, action, collection, matchingCollection, lowSearchString, fileLocationString, editedCollection, rawData, formattedCollection);
}

//Create a new file and write the prepared paragraph to it
function createFile(string, result, action, collection, matchingCollection, lowSearchString, fileLocationString, editedCollection, rawData, formattedCollection) {

	//Creates a new document called edited.txt
	let writeStream = fs.createWriteStream('edited.txt');

	//Write the contents in formattedCollection
	writeStream.write(formattedCollection);

	//The finish even is called when all of the data has been used up in the stream
	writeStream.on('finish',() => {
		console.log('A new file called edited.txt has been created in the project folder. The first appearance of the search term will remain in the document whereas the subsequent duplicates have been removed.');
	});

	//Close the stream
	writeStream.end();
}









