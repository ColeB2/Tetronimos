import { render, screen} from '@testing-library/react';

import Navbar from './Navbar';

describe('Navbar', () => {
    test('Renders 2 navbar links', () => {
        render(<Navbar />);

        // 4 navbar links should be the home links at top
        // Logo, Logo Words, Home, About
        const navbar = screen.getAllByRole('link') as HTMLAnchorElement[];
        expect(navbar.length).toBe(4);
        expect(navbar[1].textContent).toBe('Guitar Scale Generator');
        expect(navbar[0].textContent).toBe('');
    });
    // test('Renders navbar image', () => {
    //     render(<Navbar />);

    //     const image = screen.getByAltText('Black and white logo of a guitar') as HTMLImageElement;

    //     expect(image.src).toContain('guitar-logo.svg');
    // });
});