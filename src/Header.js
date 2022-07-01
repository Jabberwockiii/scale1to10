import { Image, useTheme } from "@aws-amplify/ui-react";

export function Header() {
  const { tokens } = useTheme();
  return (
    <Image
      alt="logo"
      src={require("./static/background1.jpg")}
      padding={tokens.space.medium}
    />
    
  );
}
