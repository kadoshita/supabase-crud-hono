import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function UserInputForm({
  handleSubmit,
}: {
  handleSubmit: (values: { name: string }) => void;
}) {
  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput withAsterisk label="Name" {...form.getInputProps('name')} />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
