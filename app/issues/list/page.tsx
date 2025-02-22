import Pagination from '@/app/components/Pagination';
import IssueTable, { columnNames, IssueQuery } from '@/app/issues/list/IssueTable';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import IssueActions from './IssueActions';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
  searchParams: IssueQuery
}

const IssuePage = async ({ searchParams }: Props) => {
  
  // Validate status parameter
  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(searchParams.status as Status)
    ? searchParams.status
    : undefined;

  const where = { status };

  // Default to createdAt if no valid orderBy
  const orderBy = columnNames.includes(searchParams.orderBy as keyof Issue)
    ? searchParams.orderBy
    : 'createdAt'; // Default sort column

  // Default to desc if no valid orderDirection
  const orderDirection = ['asc', 'desc'].includes(searchParams.orderDirection as string)
    ? searchParams.orderDirection
    : 'desc'; // Default sort direction

  // Build Prisma query
  const prismaOrderBy = orderBy 
    ? { [orderBy]: orderDirection }
    : undefined;

  const page = parseInt(searchParams.page ?? '1') || 1;
  const pageSize = 8;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: prismaOrderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues"
};

export default IssuePage;