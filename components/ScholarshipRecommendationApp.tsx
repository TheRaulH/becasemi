/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { QuestionnaireStep } from "./QuestionnaireStep";
import { useRecommendationEngine } from "../hooks/useRecommendationEngine";
import { UserProfile } from "../types/questionnaire";
import { QUESTIONNAIRE } from "../constants/questions";
import {
  buildUserProfileFromAnswers,
  validateUserProfile,
} from "@/utils/profileBuilder";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useEffect } from "react";


export function ScholarshipRecommendationApp() {
   

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  // justo antes del hook
  const savedAnswersJSON =
    typeof window !== "undefined" ? localStorage.getItem("emi-answers") : null;
  const savedAnswers = savedAnswersJSON ? JSON.parse(savedAnswersJSON) : {};
  const initialProfile = buildUserProfileFromAnswers(savedAnswers);

  // ahora sí usamos el hook pasando el perfil inicial
  const { userProfile, updateProfile, getTopRecommendations, getStats } =
    useRecommendationEngine(initialProfile);

  // Cargar datos persistidos al montar el componente
  useEffect(() => {
    const savedIndex = localStorage.getItem("emi-current-question");
    const savedResults = localStorage.getItem("emi-show-results");

    if (savedIndex) setCurrentQuestionIndex(Number(savedIndex));
    if (savedResults === "true") setShowResults(true);
    if (savedAnswers) setAnswers(savedAnswers);
  }, []);

  // Guardar en localStorage cada vez que cambia algo
  useEffect(() => {
    localStorage.setItem("emi-answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(
      "emi-current-question",
      currentQuestionIndex.toString()
    );
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem("emi-show-results", showResults.toString());
  }, [showResults]);

  const handleReset = () => {
  setAnswers({});
  setCurrentQuestionIndex(0);
  setShowResults(false);
  updateProfile({}); // resetea el perfil también

  localStorage.removeItem("emi-answers");
  localStorage.removeItem("emi-current-question");
  localStorage.removeItem("emi-show-results");
};


  const handleAnswerChange = (questionId: string, value: any) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const profile = buildUserProfileFromAnswers(newAnswers);
    updateProfile(profile);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONNAIRE.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    const finalProfile = buildUserProfileFromAnswers(answers);
    const validation = validateUserProfile(finalProfile);

    if (validation.isValid) {
      setShowResults(true);
    } else {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>
            Faltan campos: {validation.missingFields.join(", ")}
          </AlertTitle>
        </Alert>
      );
    }
  };

  if (showResults && userProfile) {
    const recommendations = getTopRecommendations(
      userProfile as UserProfile,
      5
    );
    const stats = getStats(userProfile as UserProfile);

    return (
      <div className="max-w-4xl mx-auto p-4 space-y-2 bg-background min-h-screen overflow-hidden">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-card-foreground">
              Tus Recomendaciones de Becas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <div className="text-2xl font-bold text-primary">
                      {stats.eligible}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-primary font-medium">Elegibles</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-secondary-foreground" />
                    <div className="text-2xl font-bold text-secondary-foreground">
                      {stats.partiallyEligible}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-secondary-foreground font-medium">
                    Parcialmente Elegibles
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <div className="text-2xl font-bold text-destructive">
                      {stats.notEligible}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-destructive font-medium">
                    No Elegibles
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {recommendations.map((rec) => (
                <Card
                  key={rec.scholarship.id}
                  className={`border-2 transition-all duration-300 hover:shadow-lg ${
                    rec.eligibilityStatus === "eligible"
                      ? "border-primary/30 bg-gradient-to-r from-primary/5 to-transparent hover:border-primary/50"
                      : rec.eligibilityStatus === "partially-eligible"
                      ? "border-secondary/30 bg-gradient-to-r from-secondary/5 to-transparent hover:border-secondary/50"
                      : "border-destructive/30 bg-gradient-to-r from-destructive/5 to-transparent hover:border-destructive/50"
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-card-foreground">
                        {rec.scholarship.name}
                      </CardTitle>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          {rec.score}%
                        </div>
                        <Badge
                          variant={
                            rec.eligibilityStatus === "eligible"
                              ? "default"
                              : rec.eligibilityStatus === "partially-eligible"
                              ? "secondary"
                              : "destructive"
                          }
                          className="mt-1"
                        >
                          {rec.eligibilityStatus === "eligible"
                            ? "Elegible"
                            : rec.eligibilityStatus === "partially-eligible"
                            ? "Parcialmente Elegible"
                            : "No Elegible"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {rec.scholarship.definition}
                    </p>

                    <Badge
                      variant="outline"
                      className="text-base px-2 py-1 font-semibold w-full  "
                    >
                      {rec.scholarship.percentage.value}
                    </Badge>

                    {rec.matchingCriteria.length > 0 && (
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Criterios que cumples:
                        </h4>
                        <ul className="space-y-2">
                          {rec.matchingCriteria.map((criteria, idx) => (
                            <li
                              key={idx}
                              className="text-primary/80 flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {rec.missingRequirements.length > 0 && (
                      <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                        <h4 className="font-medium text-destructive mb-3 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Requisitos faltantes:
                        </h4>
                        <ul className="space-y-2">
                          {rec.missingRequirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="text-destructive/80 flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={handleReset}>
                  Reiniciar Cuestionario
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = QUESTIONNAIRE[currentQuestionIndex];

  return (
    <div className="h-min bg-background flex items-center justify-center">
      <Card className="max-w-3xl w-full border-border bg-card shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-card-foreground text-xl">
              Cuestionario de Becas EMI
            </CardTitle>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {currentQuestionIndex + 1} de {QUESTIONNAIRE.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progreso</span>
              <span>
                {Math.round(
                  ((currentQuestionIndex + 1) / QUESTIONNAIRE.length) * 100
                )}
                %
              </span>
            </div>
            <Progress
              value={((currentQuestionIndex + 1) / QUESTIONNAIRE.length) * 100}
              className="h-3"
            />
          </div>
        </CardHeader>

        <CardContent className="py-1">
          <QuestionnaireStep
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
          />
        </CardContent>

        <CardFooter className="flex justify-between pt-2 border-t border-border">
          <Button
            variant="outline"
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
            className="px-6"
          >
            Anterior
          </Button>

          {currentQuestionIndex === QUESTIONNAIRE.length - 1 ? (
            <Button onClick={handleFinish} className="px-4">
              Ver Recomendaciones
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={
                currentQuestion.required &&
                (currentQuestion.type === "boolean"
                  ? answers[currentQuestion.id] === undefined
                  : !answers[currentQuestion.id])
              }
              className="px-6"
            >
              Siguiente
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
