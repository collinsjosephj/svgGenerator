const { Circle, Triangle, Square } = require('../lib/shapes');

describe('Shape Classes', () => {
    describe('Circle', () => {
        test('should render correctly with given color', () => {
            const shape = new Circle();
            shape.setColor('blue');
            expect(shape.render()).toEqual('<circle cx="150" cy="100" r="80" fill="blue" />');
        });
    });

    describe('Triangle', () => {
        test('should render correctly with given color', () => {
            const shape = new Triangle();
            shape.setColor('blue');
            expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
        });
    });

    describe('Square', () => {
        test('should render correctly with given color', () => {
            const shape = new Square();
            shape.setColor('blue');
            expect(shape.render()).toEqual('<rect x="60" y="10" width="180" height="180" fill="blue" />');
        });
    });
});
