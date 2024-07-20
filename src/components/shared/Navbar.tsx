import Link from "next/link";
import NavBarMenu from "./NavbarMenu";
import { ModeToggle } from "./ModleToggle";

export default async function NavBar() {

    return (
        <header>
            <nav className="py-8 flex justify-between items-end">
                <Link
                    href={'/'}
                >
                    <h1 className=' text-[2rem] font-mono font-bold'>GemPath</h1>
                </Link>
                <div className="flex gap-5 justify-center items-center">
                    <NavBarMenu />
                    <ModeToggle />
                </div>
            </nav>
        </header>
    )
}