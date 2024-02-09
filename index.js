const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Add a statement before the questions
console.log('Please build your team:');

// Array of questions
const initialQuestions = [
    {
      type: 'input',
      name: 'managerName',
      message: 'What is the team manager\'s name?',
      validate: input => (input !== '') ? true : 'Name is required',
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the team manager\'s ID?',
      validate: input => (input !== '') ? true : 'ID is required',
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'What is the team manager\'s email?',
      validate: input => (input !== '') ? true : 'Email is required',
    },
    {
      type: 'input',
      name: 'managerOfficeNumber',
      message: 'What is the team manager\'s office number?',
      validate: input => (input !== '') ? true : 'Office number is required',
    },
    {
      type: 'list',
      name: 'teamMemberType',
      message: 'Which type of team member would you like to add?',
      choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members'],
    },
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: "What is the engineer's name?",
        validate: input => (input !== '') ? true : 'Name is required',
    },
    {
        type: 'input',
        name: 'engineerId',
        message: "What is the engineer's ID?",
        validate: input => (input !== '') ? true : 'ID is required',
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "What is the engineer's email?",
        validate: input => (input !== '') ? true : 'Email is required',
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: "What is the engineer's GitHub username?",
        validate: input => (input !== '') ? true : 'GitHub username is required',
    },
    {
        type: 'list',
        name: 'teamMemberType',
        message: 'Would you like to add another team member?',
        choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members'],
      },
];

const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: "What is the intern's name?",
        validate: input => (input !== '') ? true : 'Name is required',
    },
    {
        type: 'input',
        name: 'internId',
        message: "What is the intern's ID?",
        validate: input => (input !== '') ? true : 'ID is required',
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "What is the intern's email?",
        validate: input => (input !== '') ? true : 'Email is required',
    },
    {
        type: 'input',
        name: 'internSchool',
        message: "Which school does the intern attend?",
        validate: input => (input !== '') ? true : 'School information is required',
    },
    {
        type: 'list',
        name: 'teamMemberType',
        message: 'Would you like to add another team member?',
        choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members'],
      },
];

function promptQuestions(questions) {
    inquirer.prompt(questions)
        .then(answers => {
            // Do something with the answers
            console.log(answers);
            // If the user selected 'Engineer', prompt the additional engineer questions
            if (answers.teamMemberType === 'Engineer') {
                promptQuestions(engineerQuestions);
            } else if (answers.teamMemberType === 'Intern') {
                promptQuestions(internQuestions);
            } else {
                // Do something else or end the process
                console.log('Process completed!');
            }
        })
        .catch(error => console.error('Error during inquirer prompt:', error));
}

// Start the process with the initial set of questions
promptQuestions(initialQuestions);
