import { Box } from "@mui/system";
import * as React from "react";
import { Button } from "../button";
import { Progress } from "../progress";
import type { QuestionnaireProps } from "./questionnaire.types";

export const Questionnaire = React.forwardRef<
  HTMLDivElement,
  QuestionnaireProps
>(
  (
    {
      questions,
      onComplete,
      submitText = "Submit Survey",
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState<
      Record<string, string | string[]>
    >({});

    if (!questions || questions.length === 0) return null;

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progressPercent = Math.round(
      ((currentIndex + 1) / totalQuestions) * 100,
    );

    const isMultiple = currentQuestion.type === "multiple";
    const currentAnswer = answers[currentQuestion.id];

    const handleSelectOption = (value: string) => {
      if (isMultiple) {
        const prevList = (
          Array.isArray(currentAnswer) ? currentAnswer : []
        ) as string[];
        const nextList = prevList.includes(value)
          ? prevList.filter((v) => v !== value)
          : [...prevList, value];
        setAnswers({ ...answers, [currentQuestion.id]: nextList });
      } else {
        setAnswers({ ...answers, [currentQuestion.id]: value });
      }
    };

    const isCurrentAnswered = isMultiple
      ? Array.isArray(currentAnswer) && currentAnswer.length > 0
      : Boolean(currentAnswer);

    const canProceed = !currentQuestion.required || isCurrentAnswered;

    const handleNext = () => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete?.(answers);
      }
    };

    const handleBack = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    const isLast = currentIndex === totalQuestions - 1;

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          width: "100%",
          p: 3,
          borderRadius: "var(--theme-shape-borderRadius, 14px)",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor: "var(--theme-color-background-paper)",
          boxShadow: "var(--theme-shadow-card, 0 4px 16px rgba(0, 0, 0, 0.06))",
          ...sx,
        }}
        className={`flex flex-col w-full rounded-2xl ${className || ""}`.trim()}
        {...other}
      >
        {/* Progress Header */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--theme-color-text-secondary)",
            }}
          >
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>{progressPercent}% Complete</span>
          </Box>
          <Progress
            value={progressPercent}
            color="primary"
            sx={{ height: 6 }}
          />
        </Box>

        {/* Question Heading */}
        <Box sx={{ mb: 2.5 }}>
          <Box
            component="h3"
            sx={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--theme-color-text-primary)",
              m: 0,
            }}
          >
            {currentQuestion.question}
          </Box>
          {currentQuestion.description && (
            <Box
              sx={{
                fontSize: "0.875rem",
                color: "var(--theme-color-text-secondary)",
                mt: 0.5,
              }}
            >
              {currentQuestion.description}
            </Box>
          )}
        </Box>

        {/* Options Stack */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
          {currentQuestion.options.map((option) => {
            const isSelected = isMultiple
              ? Array.isArray(currentAnswer) &&
                currentAnswer.includes(option.value)
              : currentAnswer === option.value;

            return (
              <Box
                key={option.value}
                component="button"
                type="button"
                onClick={() => handleSelectOption(option.value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.75,
                  borderRadius: "10px",
                  border: isSelected
                    ? "2px solid var(--theme-color-primary-main)"
                    : "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
                  backgroundColor: isSelected
                    ? "rgba(var(--theme-color-primary-main-channel) / 0.08)"
                    : "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  "&:hover": {
                    borderColor: "var(--theme-color-primary-main)",
                    backgroundColor: isSelected
                      ? "rgba(var(--theme-color-primary-main-channel) / 0.12)"
                      : "var(--theme-color-action-hover, rgba(145, 158, 171, 0.04))",
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      fontSize: "0.9375rem",
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected
                        ? "var(--theme-color-primary-dark, var(--theme-color-primary-main))"
                        : "var(--theme-color-text-primary)",
                    }}
                  >
                    {option.label}
                  </Box>
                  {option.description && (
                    <Box
                      sx={{
                        fontSize: "0.8125rem",
                        color: "var(--theme-color-text-secondary)",
                        mt: 0.25,
                      }}
                    >
                      {option.description}
                    </Box>
                  )}
                </Box>

                {/* Radio/Checkbox indicator dot */}
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: isMultiple ? "4px" : "50%",
                    border: isSelected
                      ? "5px solid var(--theme-color-primary-main)"
                      : "2px solid var(--theme-color-divider, rgba(145, 158, 171, 0.4))",
                    backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                    transition: "all 150ms ease",
                    flexShrink: 0,
                    ml: 1.5,
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Action Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "auto",
            pt: 2,
            borderTop:
              "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.12))",
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            disabled={currentIndex === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            disabled={!canProceed}
            onClick={handleNext}
          >
            {isLast ? submitText : "Next Question"}
          </Button>
        </Box>
      </Box>
    );
  },
);

Questionnaire.displayName = "Questionnaire";

export * from "./questionnaire.styles";
export * from "./questionnaire.types";
export * from "./questionnaire-context";
