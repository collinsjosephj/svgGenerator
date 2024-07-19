const { generateSVGContent, saveSVGToFile } = require('../lib/svgGeneratorLogic');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('SVG Generator Functions', () => {
    describe('generateSVGContent', () => {
        test('should generate correct SVG content for circle', () => {
            const svg = generateSVGContent({
                letters: 'ABC',
                textColor: 'black',
                shape: 'circle',
                shapeColor: 'green'
            });
            expect(svg).toContain('<circle cx="150" cy="100" r="80" fill="green" />');
            expect(svg).toContain('<text x="150" y="125" dominant-baseline="middle" text-anchor="middle" fill="black" font-size="40" font-family="Arial">ABC</text>');
        });

        test('should generate correct SVG content for triangle', () => {
            const svg = generateSVGContent({
                letters: 'DEF',
                textColor: 'blue',
                shape: 'triangle',
                shapeColor: 'yellow'
            });
            expect(svg).toContain('<polygon points="150, 18 244, 182 56, 182" fill="yellow" />');
            expect(svg).toContain('<text x="150" y="125" dominant-baseline="middle" text-anchor="middle" fill="blue" font-size="40" font-family="Arial">DEF</text>');
        });

        test('should generate correct SVG content for square', () => {
            const svg = generateSVGContent({
                letters: 'GHI',
                textColor: 'red',
                shape: 'square',
                shapeColor: 'blue'
            });
            expect(svg).toContain('<rect x="60" y="10" width="180" height="180" fill="blue" />');
            expect(svg).toContain('<text x="150" y="125" dominant-baseline="middle" text-anchor="middle" fill="red" font-size="40" font-family="Arial">GHI</text>');
        });

        test('should throw error if letters length exceeds 3 characters', () => {
            expect(() => generateSVGContent({
                letters: 'TOOLONG',
                textColor: 'black',
                shape: 'circle',
                shapeColor: 'green'
            })).toThrow('Text must be three characters or less.');
        });
    });

    describe('saveSVGToFile', () => {
        test('should save SVG content to file', () => {
            const content = '<svg></svg>';
            const fileName = 'test.svg';
            const expectedPath = path.join(__dirname, '..', fileName);

            fs.writeFile.mockImplementation((filePath, content, callback) => {
                expect(filePath).toBe(expectedPath);
                callback(null);
            });

            console.log = jest.fn();  // Mock console.log
            saveSVGToFile(content, fileName);
            expect(console.log).toHaveBeenCalledWith('Generated logo.svg');
        });

        test('should throw error when writeFile fails', () => {
            fs.writeFile.mockImplementation((filePath, content, callback) => {
                callback(new Error('Failed to write file'));
            });

            expect(() => saveSVGToFile('<svg></svg>', 'test.svg')).toThrow('Error writing SVG file: Error: Failed to write file');
        });
    });
});
