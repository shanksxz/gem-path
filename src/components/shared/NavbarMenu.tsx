"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export default function NavBarMenu() {

    const router = useRouter();
    const session = useSession();

    if (!session.data?.user) {
        return (
            <Button onClick={() => router.push('/api/auth/signin')}>
                Login
            </Button>
        )
    }

    return (
        <div className="flex items-center justify-center gap-5 underline">
            <Link href={'/register'}>Create Product</Link>
            <Link href={'/track'}>Product</Link>
            <Link href={'/dashboard'}>Dashboard</Link>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        {session.data.user.image && <AvatarImage src={session.data.user.image} />}
                        <AvatarFallback>
                            {session.data.user.name?.split(" ")[0]?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar> 
                    
                        
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-sm" side="bottom" align="end" sideOffset={20}>
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}