export default function RootLayout({
    children,
} : Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <main className="flex h-screen justify-center items-center">
                    {children}
                </main>
            </body>
        </html>
    )
}