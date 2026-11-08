import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// CodeBlock Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface CodeBlockProps extends BoxProps {
  code?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}
