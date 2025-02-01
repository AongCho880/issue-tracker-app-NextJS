import Link from 'next/link'
import React from 'react'
import { BsFillBugFill } from "react-icons/bs";

export const NavBar = () => {

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" }
  ]

  return (
    <nav className="flex space-x-20 border-b mb-5 px-5 h-16 items-center">
      <Link href="/"><BsFillBugFill className='text-2xl' /></Link>
      <ul className="flex space-x-7">
        {links.map(link =>
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-500 hover:text-zinc-950 transition-colors"
          >{link.label}</Link>
        )}
      </ul>
    </nav>
  )
}
