// utils/profileBuilder.ts
import { UserProfile } from "../types/questionnaire";


/**
 * Construye un perfil de usuario completo desde las respuestas del cuestionario
 */
export function buildUserProfileFromAnswers(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: Record<string, any>
): UserProfile {
  return {
    // Información académica
    currentSemester: answers["current-semester"] || 1,
    academicLevel: answers["academic-level"] || "preuniversitario",
    currentGPA: answers["current-gpa"] || 0,
    hasFailedSubjects: answers["failed-subjects"] || false,
    hasUsedOptionalExam: answers["optional-exam"] || false,

    // Información militar/institucional
    militaryStatus: answers["military-status"] || "civil",
    isInStudyCommission: answers["study-commission"] || false,

    // Información personal y económica
    hasEconomicNeed: answers["economic-need"] || false,
    hasDisability: answers["has-disability"] || false,
    isOrphan: answers["is-orphan"] || false,
    parentMilitaryDeceased: answers["parent-military-deceased"] || false,
    parentDeceasedInService: answers["parent-deceased-service"] || false,

    // Actividades extracurriculares
    sportsParticipation: answers["sports-participation"] || "none",
    culturalParticipation: answers["cultural-participation"] || "none",
    researchExperience: answers["research-experience"] || false,
    hasCompletedResearchProject: answers["completed-research"] || false,

    // Situación disciplinaria
    disciplinaryPoints: answers["disciplinary-points"] || 0,

    // Información adicional
    isHighSchoolGraduate: answers["high-school-graduate"] || false,
    wasInvitedDirectly: answers["direct-invitation"] || false,
    wonOlympiad: answers["olympiad-winner"] || false,
    isAccidentVictim: answers["accident-victim"] || false,
  };
}

/**
 * Valida que el perfil tenga la información mínima requerida
 */
export function validateUserProfile(profile: UserProfile): {
  isValid: boolean;
  missingFields: string[];
} {
  const requiredFields: Array<{ key: keyof UserProfile; label: string }> = [
    { key: "academicLevel", label: "Nivel académico" },
    { key: "currentSemester", label: "Semestre actual" },
    { key: "currentGPA", label: "Promedio actual" },
    { key: "militaryStatus", label: "Estatus militar" },
    { key: "disciplinaryPoints", label: "Puntos disciplinarios" },
  ];

  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (
      profile[field.key] === undefined ||
      profile[field.key] === null
    ) {
      missingFields.push(field.label);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}
