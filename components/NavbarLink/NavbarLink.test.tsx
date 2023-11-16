import { render, screen} from '@testing-library/react';

import NavbarLink from './NavbarLink';

describe('Navbar', () => {
    const HREF = "/exampleHref"
    const TEXT = "Test Text"
    test('Renders a NavbarLink', () => {
        render(<NavbarLink href={HREF} text={TEXT} />);

        // 2 navbar links should be the home links at top
        const navbarlink = screen.getByRole('link') as HTMLAnchorElement;
        expect(navbarlink.textContent).toBe(TEXT);
        expect(navbarlink.href).toContain(HREF);
    });
});