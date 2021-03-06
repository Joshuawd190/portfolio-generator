const inquirer = require('inquirer');

const generatePage = require('./src/page-template.js');
const { writeFile, copyFile } = require('./utils/generate-site.js');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: (nameInput) =>
        nameInput ? true : console.log('Please enter your name!'),
      // {
      //   if (nameInput) true
      //   else {
      //     console.log('Please enter your name!');
      //     return false;
      //   }
      // }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: (gitInput) =>
        gitInput ? true : console.log('Please enter your GitHub username!'),
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => (confirmAbout ? true : false),
    },
  ]);
};

const promptProject = (portfolioData) => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
=================
Add a New Project
=================
  `);
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: (projectInput) =>
          projectInput ? true : console.log('Please enter your project name!'),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: (projectDescInput) =>
          projectDescInput
            ? true
            : console.log('Please enter your project description!'),
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: [
          'JavaScript',
          'HTML',
          'CSS',
          'ES6',
          'jQuery',
          'Bootstrap',
          'Node',
        ],
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: (projectLinkInput) =>
          projectLinkInput
            ? true
            : console.log('Please enter your project GitHub link!'),
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });
