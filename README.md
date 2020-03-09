Saturday, March 7, 2020

Hello hiring manager,

My name is Lyman Wong and I'm applying for the Front-End Developer role at Apple.
I had a great time working on this project and appreciate the opportunity.

This feature is based on the Linux 'uniq' text processing feature. Based on the user's search term,
the feature is suppose to either report or filter out repeated lines in a file. Instead of
overriting the original file, I've decided to create a duplicate file with the edits.

If you have any feedback, I would love to hear it.

Best,

Lyman Wong
lymanwong@gmail.com
lymanwong.github.io
(415) 509 - 1409

---

Instructions:
1. After installation and unzipping the file, open the Terminal application.
2. CD into the project folder.
3. Type in "npm install" to install the dependencies.
4. Type in "node index" to trigger the program
5. Enter the search parameters
	  a. Enter the search terms in the order you like for the tool to search for it.
	  b. If you don't have a text file to check, you can use either "./text.txt" or "./text2.txt". I used a
	  	 random sentence generator for the text.
	  c. Type Report or Delete
	  		- Report will tell you where the duplicate phrase(s) lie in your text.
	  		- Delete will create another file ("edited.txt) in the project folder with all of the lines in the text
	          keeping the first set of lines, but remove subsequent duplicate lines in a paragraph format.

---

Original Assignment:
Full Stack Role Coding Challenge. Complete in 24 hours.

For this challenge you will be tasked with creating a command-line utility
developed in Node.js. Your program will be a modern twist on any of the classic
[Unix commands](https://en.wikipedia.org/wiki/List_of_Unix_commands).
It should reasonably re-create one of these utilities by implementing some of its flags, consuming user input similarly, etc.

Below are general guidelines for this challenge:
- Choose a sufficiently challenging program to re-create (e.g. filesystem I/O, consuming user input, etc.)
- Only implement the basics — your solution is not expected to be a 1:1 replication
- Express yourself! If you have a new idea of how the command could work, implement it
- Any libraries/frameworks/build systems are allowed
- Include documentation explaining how to use the command
- Linting/testing is encouraged
- Must run on the Node.js runtime

Remember, this challenge is meant to showcase your abilities, so please make
sure to choose a sufficiently challenging command to re-create. The following
commands are examples:
- `diff`
- `find`
- `ls`
- `sed`