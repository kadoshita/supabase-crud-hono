import { Table as MantineTable } from '@mantine/core';

export default function UsersTable({
  elements,
}: {
  elements: { id: string; name: string }[];
}) {
  const rows = elements.map((element) => (
    <MantineTable.Tr key={element.id}>
      <MantineTable.Td>{element.id}</MantineTable.Td>
      <MantineTable.Td>{element.name}</MantineTable.Td>
    </MantineTable.Tr>
  ));

  return (
    <MantineTable>
      <MantineTable.Thead>
        <MantineTable.Tr>
          <MantineTable.Th>User ID</MantineTable.Th>
          <MantineTable.Th>User Name</MantineTable.Th>
        </MantineTable.Tr>
      </MantineTable.Thead>
      <MantineTable.Tbody>{rows}</MantineTable.Tbody>
    </MantineTable>
  );
}
