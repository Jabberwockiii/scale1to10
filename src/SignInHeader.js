import { Heading, useTheme } from "@aws-amplify/ui-react";

export function SignInHeader() {
  const { tokens } = useTheme();

  return (
    <Heading level={3} padding={`${tokens.space.xl} ${tokens.space.xl} 0`}>
      问脸：颜值测评社区
    </Heading>
  );
}
