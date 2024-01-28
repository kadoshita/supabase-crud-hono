import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginForm({
  handleSubmit,
}: {
  handleSubmit: (values: { email: string; password: string }) => void;
}) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          type="email"
          label="E-Mail"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          type="password"
          label="Password"
          {...form.getInputProps('password')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
