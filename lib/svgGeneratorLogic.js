const fs = require('fs');
const path = require('path');

const generateSVGContent = ({ letters, textColor, shape, shapeColor }) => {
    if (letters.length > 3) {
        throw new Error('Text must be three characters or less.');
    }

    const svgStart = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
    const svgEnd = `</svg>`;

    let svgShape;
    switch (shape.toLowerCase()) {
        case 'circle':
            svgShape = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
            break;
        case 'triangle':
            svgShape = `<polygon points="150, 18 244, 182 56, 182" fill="${shapeColor}" />`;
            break;
        case 'square':
        default:
            svgShape = `<rect x="60" y="10" width="180" height="180" fill="${shapeColor}" />`;
            break;
    }

    const svgText = `<text x="150" y="125" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-size="40" font-family="Arial">${letters}</text>`;

    return `${svgStart}${svgShape}${svgText}${svgEnd}`;
};

const saveSVGToFile = (content, fileName = 'logo.svg') => {
    const filePath = path.join(__dirname, '..', fileName);
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            throw new Error(`Error writing SVG file: ${err}`);
        }
    });
};

module.exports = { generateSVGContent, saveSVGToFile };
