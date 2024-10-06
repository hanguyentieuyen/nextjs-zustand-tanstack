import React from "react";
import { useThemeContext } from "./Provider";

export default function ListItem() {
  const theme = useThemeContext();
  return <li style={theme?.theme}>i'm learning about provider pattern</li>;
}
