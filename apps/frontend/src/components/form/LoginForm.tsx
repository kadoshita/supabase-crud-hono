import { TextInput, Button, Group, Box, Input } from '@mantine/core';
import { useForm } from '@mantine/form';

interface EmailFormValues {
  type: 'email';
  email: string;
  password: string;
}

interface GithubFormValues {
  type: 'github';
}

interface GoogleFormValues {
  type: 'google';
}

export type SubmitValues =
  | {
      type: 'email';
      email: string;
      password: string;
    }
  | {
      type: 'github';
    }
  | {
      type: 'google';
    };

export default function LoginForm({
  handleSubmit,
}: {
  handleSubmit: (values: SubmitValues) => void;
}) {
  const emailForm = useForm<EmailFormValues>({
    initialValues: {
      type: 'email',
      email: '',
      password: '',
    },
  });
  const githubForm = useForm<GithubFormValues>({
    initialValues: {
      type: 'github',
    },
  });
  const googleForm = useForm<GoogleFormValues>({
    initialValues: {
      type: 'google',
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={emailForm.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          type="email"
          label="E-Mail"
          {...emailForm.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          type="password"
          label="Password"
          {...emailForm.getInputProps('password')}
        />
        <Input
          type="hidden"
          value="email"
          {...emailForm.getInputProps('type')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      <form onSubmit={githubForm.onSubmit(handleSubmit)}>
        <Input
          type="hidden"
          value="github"
          {...githubForm.getInputProps('type')}
        />
        <Group justify="center" mt="md">
          <Button fullWidth color="dark" type="submit">
            GitHub
          </Button>
        </Group>
      </form>

      <form onSubmit={googleForm.onSubmit(handleSubmit)}>
        <Input
          type="hidden"
          value="google"
          {...googleForm.getInputProps('type')}
        />
        <Group justify="center" mt="md">
          <Button fullWidth color="blue" type="submit">
            Google
          </Button>
        </Group>
      </form>
    </Box>
  );
}
