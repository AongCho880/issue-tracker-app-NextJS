"use client";

import { Box, Container, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsFillBugFill } from "react-icons/bs";
import classnames from "classnames";

export const NavBar = () => {

  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" }
  ]

  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href="/"><BsFillBugFill className='text-2xl' /></Link>
            <ul className="flex space-x-7">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href === currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              )
              )}
            </ul>
          </Flex>

          <Box>
            {
              status === "authenticated" && <Link href="/api/auth/signout">Log Out</Link>
            }
            {
              status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>
            }
          </Box>

        </Flex>
      </Container>

    </nav>
  )
}
