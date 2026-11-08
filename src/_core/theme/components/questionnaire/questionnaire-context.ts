import * as React from "react";

// ----------------------------------------------------------------------
// Questionnaire Context
// ----------------------------------------------------------------------

export type QuestionnaireContextValue = Record<string, unknown>;

export const QuestionnaireContext =
  React.createContext<QuestionnaireContextValue | null>(null);

export const useQuestionnaireContext = () =>
  React.useContext(QuestionnaireContext);
