import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Questionnaire Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface QuestionnaireOptionData {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
}

export interface QuestionnaireQuestionData {
  id: string;
  question: string;
  description?: string;
  type?: "single" | "multiple";
  options: QuestionnaireOptionData[];
  required?: boolean;
}

export interface QuestionnaireProps extends BoxProps {
  questions: QuestionnaireQuestionData[];
  onComplete?: (answers: Record<string, string | string[]>) => void;
  submitText?: string;
}
