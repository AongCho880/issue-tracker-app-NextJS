import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import Link from '@/app/components/Link';
import NextLink from 'next/link';
import IssueActions from './IssueActions';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    orderDirection?: 'asc' | 'desc';
  };
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  // Validate status parameter
  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(searchParams.status as Status)
    ? searchParams.status
    : undefined;

  // Validate orderBy parameter
  const validOrderByColumns = columns.map(col => col.value);
  const orderBy = validOrderByColumns.includes(searchParams.orderBy as keyof Issue)
    ? searchParams.orderBy
    : undefined;

  // Validate orderDirection parameter
  const orderDirection = ['asc', 'desc'].includes(searchParams.orderDirection as string)
    ? searchParams.orderDirection
    : 'asc';

  // Build Prisma query
  const prismaOrderBy = orderBy 
    ? { [orderBy]: orderDirection }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: prismaOrderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isSorted = orderBy === column.value;
              const currentDirection = isSorted ? orderDirection : 'asc';
              const nextDirection = currentDirection === 'asc' ? 'desc' : 'asc';

              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{
                      query: {
                        ...(status && { status }),
                        orderBy: column.value,
                        orderDirection: isSorted ? nextDirection : 'asc',
                      },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {isSorted && (
                    <ArrowUpIcon
                      className={`inline ${
                        orderDirection === 'desc' ? 'transform rotate-180' : ''
                      }`}
                    />
                  )}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuePage;