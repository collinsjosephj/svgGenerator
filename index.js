const inquirer = require('inquirer');
const { generateSVGContent, saveSVGToFile } = require('./lib/svgGeneratorLogic');

const questions = [
    {
        type: 'input',
        name: 'letters',
        message: 'Enter up to 3 letters:',
        validate: input => input.length <= 3 || 'Text must be three characters or less.'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (color keyword or hexadecimal):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (color keyword or hexadecimal):'
    }
];

const runApp = async () => {
    try {
        console.log('==================================');
        console.log('Welcome to the SVG.LOGO Generator!');
        console.log('==================================\n');

        const answers = await inquirer.prompt(questions);
        const { letters, textColor, shape, shapeColor } = answers;
        const svgContent = generateSVGContent({ letters, textColor, shape, shapeColor });
        saveSVGToFile(svgContent, 'logo.svg');
        console.log('Generated logo.svg');
    } catch (err) {
        console.error('Error:', err.message);
    }
};

runApp();
