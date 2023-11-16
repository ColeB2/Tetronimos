import Link from "next/link";

interface NavbarLinkProps {
    href: string;
    text: string;
}
const NavbarLink = ({href, text}: NavbarLinkProps) => (
        <Link href={href}>
            <span className="md:p-4 py-2 px-4 block hover:text-blue-400 text-white mx-4">
                {text}
            </span>
        </Link>
)

export default NavbarLink;