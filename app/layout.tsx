// @/layout.tsx
// Imports
import type { Metadata } from 'next'
import './globals.css'
import 'tracey-ui/dist/cjs/index.css'
// WebApp metadata
export const metadata: Metadata = {
    title: 'Arithmetica',
    description: '[]',
}
/**
 * Overflow-x:hidden doesn't prevent content from overflowing in mobile browsers
 *
 * Creating a site wrapper div inside the <body> and applying the overflow-x:hidden
 * to the wrapper instead of the <body> or <html> fixed the issue.
 * It appears that browsers that parse the <meta name="viewport"> tag
 * simply ignore overflow attributes on the html and body tags.
 * Note: You may also need to add position: relative to the wrapper div.
 *
 * https://stackoverflow.com/questions/14270084/overflow-xhidden-doesnt-prevent-content-from-overflowing-in-mobile-browsers
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <div className="mobile__container">{children}</div>
            </body>
        </html>
    )
}
