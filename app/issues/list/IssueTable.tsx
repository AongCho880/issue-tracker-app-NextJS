import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import { default as Link, default as NextLink } from 'next/link';

export interface IssueQuery {
  status?: Status;
  orderBy?: keyof Issue;
  page?: string;
  orderDirection?: 'asc' | 'desc';
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  // Set default values if no searchParams provided
  const { 
    orderBy = 'createdAt', 
    orderDirection = 'desc', 
    status 
  } = searchParams;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => {
            const isSorted = orderBy === column.value;
            const currentDirection = isSorted ? orderDirection || 'asc' : 'asc';
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
                      page: '1',
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {isSorted && (
                  <ArrowUpIcon
                    className={`inline ${
                      currentDirection === 'desc' ? 'rotate-180' : ''
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
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map(column => column.value);

export default IssueTable;