const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Ensure that the output directory exists, create it if necessary
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Generated employees array
const employees = [];


// Statement before the questions
console.log('Please build your team:');

// Array of initial questions
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

// Array of Engineer questions
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

// Array of Intern questions
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

// Propmt the questions with inquirer
function promptQuestions(questions) {
    inquirer.prompt(questions)
        .then(answers => {
            if (questions === initialQuestions) {
                // Create an instance of the Manager class using the constructor and push it to the employees array
                const manager = new Manager(
                    answers.managerName,
                    answers.managerId,
                    answers.managerEmail,
                    answers.managerOfficeNumber
                );
                employees.push(manager);
            } else if (questions === engineerQuestions) {
                // Create an instance of the Engineer class using the constructor and push it to the employees array
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGithub
                );
                employees.push(engineer);
            } else if (questions === internQuestions) {
                // Create an instance of the Intern class using the constructor and push it to the employees array
                const intern = new Intern(
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchool
                );
                employees.push(intern);
            }

            // Propmt questions for each team member
            if (answers.teamMemberType === 'Engineer') {
                promptQuestions(engineerQuestions);
            } else if (answers.teamMemberType === 'Intern') {
                promptQuestions(internQuestions);
            } else {
                // If there are no more team memebers
                console.log('Process completed!');

                // Call the render function with the array of employee objects
                const renderedHTML = render(employees);

                // Define the output path for the team.html file within the output directory
                // const outputPath = path.join(OUTPUT_DIR, 'team.html');

                // Write the generated HTML to the team.html file
                fs.writeFileSync(outputPath, renderedHTML);
            }
        })
        .catch(error => console.error('Error during inquirer prompt:', error));
}

// Start the process with the initial set of questions
promptQuestions(initialQuestions);