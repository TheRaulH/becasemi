// types/questionnaire.ts
import { Scholarship } from "./scholarships";

export type QuestionType =
  | "single"
  | "multiple"
  | "boolean"
  | "number"
  | "range";

export type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options?: { value: string; label: string }[];
  required: boolean;
  weight: number; // Peso de la pregunta en el algoritmo (1-10)
  category: "academic" | "personal" | "military" | "economic" | "activities";
};

export type UserProfile = {
  // Información académica
  currentSemester: number;
  academicLevel:
    | "preuniversitario"
    | "psa"
    | "ciencias-basicas"
    | "carrera"
    | "tecnico-superior";
  currentGPA: number;
  hasFailedSubjects: boolean;
  hasUsedOptionalExam: boolean;

  // Información militar/institucional
  militaryStatus:
    | "civil"
    | "militar-estudiante"
    | "oficial"
    | "suboficial"
    | "sargento"
    | "soldado"
    | "marinero";
  isInStudyCommission: boolean;

  // Información personal y económica
  hasEconomicNeed: boolean;
  hasDisability: boolean;
  isOrphan: boolean;
  parentMilitaryDeceased: boolean;
  parentDeceasedInService: boolean;

  // Actividades extracurriculares
  sportsParticipation:
    | "none"
    | "local"
    | "departmental"
    | "national"
    | "international";
  culturalParticipation: "none" | "choir" | "dance" | "band" | "other";
  researchExperience: boolean;
  hasCompletedResearchProject: boolean;

  // Situación disciplinaria
  disciplinaryPoints: number;

  // Información adicional
  isHighSchoolGraduate: boolean;
  wasInvitedDirectly: boolean;
  wonOlympiad: boolean;
  isAccidentVictim: boolean;
};

export type RecommendationResult = {
  scholarship: Scholarship;
  score: number;
  eligibilityStatus: "eligible" | "partially-eligible" | "not-eligible";
  missingRequirements: string[];
  matchingCriteria: string[];
};
