"use client";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsFillBugFill } from "react-icons/bs";
import classnames from "classnames";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const NavBar = () => {

  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href="/">
              <BsFillBugFill className='text-2xl' />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>

    </nav>
  )
}



const NavLinks = () => {

  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" }
  ]

  return (
    <ul className="flex space-x-7">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      )
      )}
    </ul>
  );
}



const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width='3rem'/>;

  if (status === "unauthenticated")
    return <Link className='nav-link' href="/api/auth/signin">Login</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="cursor-pointer">
            <Avatar
              src={session?.user?.image || ''}
              fallback="?"
              size='3'
              radius='full'
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>
              {session?.user?.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}