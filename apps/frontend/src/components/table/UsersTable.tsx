import { ActionIcon, Table as MantineTable } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export default function UsersTable({
  elements,
  handleDelete,
}: {
  elements: { id: string; name: string }[];
  handleDelete: (id: string) => void;
}) {
  const rows = elements.map((element) => (
    <MantineTable.Tr key={element.id}>
      <MantineTable.Td>{element.id}</MantineTable.Td>
      <MantineTable.Td>{element.name}</MantineTable.Td>
      <MantineTable.Td>
        <ActionIcon
          variant="filled"
          aria-label="Delete"
          onClick={() => handleDelete(element.id)}
        >
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </MantineTable.Td>
    </MantineTable.Tr>
  ));

  return (
    <MantineTable>
      <MantineTable.Thead>
        <MantineTable.Tr>
          <MantineTable.Th>User ID</MantineTable.Th>
          <MantineTable.Th>User Name</MantineTable.Th>
          <MantineTable.Th>Delete</MantineTable.Th>
        </MantineTable.Tr>
      </MantineTable.Thead>
      <MantineTable.Tbody>{rows}</MantineTable.Tbody>
    </MantineTable>
  );
}
