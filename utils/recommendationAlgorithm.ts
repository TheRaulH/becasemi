// utils/recommendationAlgorithm.ts
import { UserProfile, RecommendationResult } from "../types/questionnaire";
import { Scholarship } from "../types/scholarships";


export class ScholarshipRecommendationEngine {
  private scholarships: Scholarship[];

  constructor(scholarships: Scholarship[]) {
    this.scholarships = scholarships;
  }

  /**
   * Genera recomendaciones de becas basadas en el perfil del usuario
   */
  public generateRecommendations(profile: UserProfile): RecommendationResult[] {
    const results: RecommendationResult[] = [];

    for (const scholarship of this.scholarships) {
      const result = this.evaluateScholarship(scholarship, profile);
      results.push(result);
    }

    // Ordenar por score descendente
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * Evalúa una beca específica contra el perfil del usuario
   */
  private evaluateScholarship(
    scholarship: Scholarship,
    profile: UserProfile
  ): RecommendationResult {
    let score = 0;
    const missingRequirements: string[] = [];
    const matchingCriteria: string[] = [];

    // Evaluación específica por tipo de beca
    switch (scholarship.id) {
      case "beca-honor":
        score += this.evaluateBecaHonor(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-excelencia-academica":
        score += this.evaluateBecaExcelencia(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-invitacion-directa":
        score += this.evaluateBecaInvitacion(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-institucional":
        score += this.evaluateBecaInstitucional(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-convocatoria-publica":
        score += this.evaluateBecaConvocatoria(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-investigacion":
        score += this.evaluateBecaInvestigacion(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-social":
        score += this.evaluateBecaSocial(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-solidaridad":
        score += this.evaluateBecaSolidaridad(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-deportiva":
        score += this.evaluateBecaDeportiva(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-cultural":
        score += this.evaluateBecaCultural(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-servicio-militar-obligatorio":
        score += this.evaluateBecaServicioMilitar(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-al-exterior":
        score += this.evaluateBecaExterior(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-olimpiadas-ciencias-exactas":
        score += this.evaluateBecaOlimpiadas(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
      case "beca-al-valor-boliviano":
        score += this.evaluateBecaValor(
          scholarship,
          profile,
          missingRequirements,
          matchingCriteria
        );
        break;
    }

    // Determinar estatus de elegibilidad
    let eligibilityStatus: "eligible" | "partially-eligible" | "not-eligible" =
      "not-eligible";
    if (missingRequirements.length === 0 && score > 70) {
      eligibilityStatus = "eligible";
    } else if (missingRequirements.length <= 2 && score > 40) {
      eligibilityStatus = "partially-eligible";
    }

    return {
      scholarship,
      score: Math.min(100, Math.max(0, score)),
      eligibilityStatus,
      missingRequirements,
      matchingCriteria,
    };
  }

  // Métodos de evaluación específicos para cada beca

  private evaluateBecaHonor(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    // Solo para estudiantes en último semestre
    if (
      (profile.academicLevel === "carrera" && profile.currentSemester === 10) ||
      (profile.academicLevel === "tecnico-superior" &&
        profile.currentSemester === 6)
    ) {
      score += 30;
      matching.push("Semestre requerido para Beca Honor");
    } else {
      missing.push(
        "Debe estar en décimo semestre (Licenciatura) o sexto (Técnico Superior)"
      );
      return 0;
    }

    // Promedio alto requerido
    if (profile.currentGPA >= 9.5) {
      score += 40;
      matching.push("Excelente promedio académico");
    } else if (profile.currentGPA >= 9.0) {
      score += 30;
      matching.push("Muy buen promedio académico");
    } else {
      missing.push(
        "Necesita tener el promedio más alto de su unidad académica"
      );
    }

    // Requisitos disciplinarios y académicos
    if (!profile.hasFailedSubjects) {
      score += 15;
      matching.push("No ha reprobado materias");
    } else {
      missing.push("No debe haber reprobado materias en segunda instancia");
    }

    if (!profile.hasUsedOptionalExam) {
      score += 10;
      matching.push("No ha usado examen optativo");
    } else {
      missing.push("No debe haberse acogido al examen optativo");
    }

    if (profile.disciplinaryPoints <= 15) {
      score += 5;
      matching.push("Buena conducta disciplinaria");
    } else {
      missing.push("No debe haber perdido más de 15 puntos en disciplina");
    }

    return score;
  }

  private evaluateBecaExcelencia(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    // Aplicable a varios niveles
    if (
      ["preuniversitario", "psa", "ciencias-basicas", "carrera"].includes(
        profile.academicLevel
      )
    ) {
      score += 20;
      matching.push("Nivel académico elegible");
    } else {
      missing.push("Nivel académico no elegible para esta beca");
      return 0;
    }

    // Evaluación por promedio
    if (profile.currentGPA >= 9.51) {
      score += 45;
      matching.push("Promedio excelente (75% de beca)");
    } else if (profile.currentGPA >= 9.01) {
      score += 35;
      matching.push("Muy buen promedio (60% de beca)");
    } else if (profile.currentGPA >= 8.51) {
      score += 25;
      matching.push("Buen promedio (45% de beca)");
    } else if (profile.currentGPA >= 8.0) {
      score += 15;
      matching.push("Promedio aceptable (30% de beca)");
    } else {
      missing.push("Necesita promedio mínimo de 8.00");
    }

    // Para preuniversitario y PSA
    if (
      ["preuniversitario", "psa"].includes(profile.academicLevel) &&
      profile.currentGPA >= 8.0
    ) {
      score += 20;
      matching.push("Elegible para 50% de beca en preuniversitario/PSA");
    }

    // Requisitos comunes
    this.evaluateCommonRequirements(profile, missing, matching, score);

    return score;
  }

  private evaluateBecaInvitacion(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.wasInvitedDirectly && profile.isHighSchoolGraduate) {
      score += 80;
      matching.push("Invitado directo como mejor bachiller");
    } else {
      missing.push(
        "Debe ser invitado directo como mejor bachiller de colegio seleccionado"
      );
      return 0;
    }

    // Evaluación de mantenimiento si ya tiene la beca
    if (profile.currentGPA >= 8.5) {
      score += 20;
      matching.push("Mantiene promedio requerido (≥8.50)");
    } else {
      missing.push("Debe mantener promedio ≥8.50 para conservar la beca");
    }

    return score;
  }

  private evaluateBecaInstitucional(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (
      ["oficial", "suboficial", "sargento"].includes(profile.militaryStatus) &&
      profile.isInStudyCommission
    ) {
      score += 90;
      matching.push("Personal militar en comisión de estudios");
    } else {
      missing.push(
        "Debe ser Oficial, Suboficial o Sargento en Comisión de Estudios"
      );
      return 0;
    }

    // Evaluación disciplinaria
    if (profile.disciplinaryPoints <= 15) {
      score += 10;
      matching.push("Cumple requisitos disciplinarios");
    } else {
      missing.push("No debe perder más de 15 puntos en disciplina");
    }

    return score;
  }

  private evaluateBecaConvocatoria(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.isHighSchoolGraduate) {
      score += 30;
      matching.push("Bachiller de la última gestión");
    } else {
      missing.push("Debe ser bachiller de la última gestión");
      return 0;
    }

    // Simulación de examen (basado en promedio)
    if (profile.currentGPA >= 9.5) {
      score += 50;
      matching.push("Probable 100% de beca (mejor promedio)");
    } else if (profile.currentGPA >= 9.0) {
      score += 40;
      matching.push("Probable 90% de beca (segundo lugar)");
    } else if (profile.currentGPA >= 8.5) {
      score += 30;
      matching.push("Probable 80% de beca (tercer lugar)");
    } else if (profile.currentGPA >= 8.0) {
      score += 15;
      matching.push("Posible aprobación de examen");
    } else {
      missing.push("Necesita aprobar examen con calificación ≥8.00");
    }

    // Mantenimiento
    if (profile.currentGPA >= 8.5) {
      score += 20;
      matching.push("Mantiene promedio para conservar la beca");
    }

    return score;
  }

  private evaluateBecaInvestigacion(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    // Para estudiantes civiles de la EMI
    if (
      profile.militaryStatus === "civil" &&
      profile.currentSemester >= 2 &&
      profile.currentSemester <= 9
    ) {
      score += 30;
      matching.push("Semestre elegible para investigación");

      if (profile.researchExperience) {
        score += 40;
        matching.push("Tiene experiencia en investigación");
      } else {
        missing.push("Necesita propuesta de proyecto de investigación");
      }
    }
    // Para estudiantes con proyectos concluidos
    else if (profile.hasCompletedResearchProject) {
      score += 70;
      matching.push("Tiene proyecto de investigación concluido");
    } else {
      missing.push(
        "Debe tener proyecto de investigación o estar en semestre elegible"
      );
      return 0;
    }

    this.evaluateCommonRequirements(profile, missing, matching, score);

    return score;
  }

  private evaluateBecaSocial(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.hasEconomicNeed || profile.hasDisability) {
      score += 60;
      if (profile.hasEconomicNeed)
        matching.push("Tiene necesidades económicas");
      if (profile.hasDisability) matching.push("Tiene discapacidad");
    } else {
      missing.push("Debe tener necesidades económicas o discapacidad");
      return 0;
    }

    if (profile.currentGPA >= 6.5) {
      score += 30;
      matching.push("Cumple promedio mínimo requerido");
    } else {
      missing.push("Necesita promedio ≥6.50");
    }

    // Escalas de beca según promedio y necesidad
    if (profile.currentGPA >= 8.0) {
      score += 10;
      matching.push("Elegible para 70% de beca");
    } else if (profile.currentGPA >= 7.0) {
      score += 8;
      matching.push("Elegible para 55% de beca");
    } else {
      matching.push("Elegible para 40% de beca");
    }

    return score;
  }

  private evaluateBecaSolidaridad(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.parentMilitaryDeceased) {
      score += 90;
      matching.push("Hijo de personal militar fallecido en la EMI");
    } else if (profile.isOrphan) {
      score += 80;
      matching.push("Estudiante huérfano sin recursos");
    } else if (profile.isAccidentVictim) {
      score += 85;
      matching.push("Accidentado en actos del servicio");
    } else {
      missing.push("Debe cumplir criterios específicos de solidaridad");
      return 0;
    }

    this.evaluateCommonRequirements(profile, missing, matching, score);

    return score;
  }

  private evaluateBecaDeportiva(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.militaryStatus !== "civil") {
      missing.push("Solo para estudiantes civiles");
      return 0;
    }

    switch (profile.sportsParticipation) {
      case "international":
        score += 70;
        matching.push("Participación internacional (40-60% de beca)");
        break;
      case "national":
        score += 60;
        matching.push("Participación nacional (50-70% de beca)");
        break;
      case "departmental":
        score += 40;
        matching.push("Participación departamental (30-50% de beca)");
        break;
      case "local":
        score += 20;
        matching.push("Participación local (15-20% de beca)");
        break;
      default:
        missing.push("Debe participar en deportes representando a la EMI");
        return 0;
    }

    // Requisitos académicos y disciplinarios más flexibles para deportes
    if (profile.disciplinaryPoints <= 25) {
      score += 20;
      matching.push("Cumple requisitos disciplinarios para deportes");
    } else {
      missing.push("No debe perder más de 25 puntos en disciplina");
    }

    if (!profile.hasFailedSubjects) {
      score += 10;
      matching.push("Aprobó todas las materias");
    }

    return score;
  }

  private evaluateBecaCultural(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.militaryStatus !== "civil") {
      missing.push("Solo para estudiantes civiles");
      return 0;
    }

    switch (profile.culturalParticipation) {
      case "band":
        score += 50;
        matching.push("Banda de Música (20-40% de beca)");
        break;
      case "choir":
      case "dance":
        score += 30;
        matching.push("Coro o Danza (hasta 15% de beca)");
        break;
      case "other":
        score += 25;
        matching.push("Otras actividades culturales");
        break;
      default:
        missing.push("Debe participar en actividades culturales de la EMI");
        return 0;
    }

    this.evaluateCommonRequirements(profile, missing, matching, score);

    return score;
  }

  private evaluateBecaServicioMilitar(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (["soldado", "marinero"].includes(profile.militaryStatus)) {
      if (profile.isAccidentVictim) {
        score += 90;
        matching.push("Soldado/Marinero accidentado en actos del servicio");
      } else {
        score += 70;
        matching.push("Soldado/Marinero destacado");
      }
    } else {
      missing.push("Solo para Soldados y Marineros destacados o accidentados");
      return 0;
    }

    return score;
  }

  private evaluateBecaExterior(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    // Muy selectiva, requiere excelencia académica
    if (profile.currentGPA >= 9.0) {
      score += 50;
      matching.push("Excelente rendimiento académico");
    } else {
      missing.push("Requiere rendimiento académico sobresaliente");
      return 0;
    }

    // Para militares, requisitos específicos
    if (profile.militaryStatus !== "civil") {
      if (profile.currentSemester <= 2) {
        score += 30;
        matching.push("Semestre elegible para militares");
      } else {
        missing.push("Militares deben estar en primer o segundo semestre");
      }
    } else {
      score += 20;
      matching.push("Estudiante civil elegible");
    }

    this.evaluateCommonRequirements(profile, missing, matching, score);

    return score;
  }

  private evaluateBecaOlimpiadas(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.wonOlympiad) {
      score += 80;
      matching.push("Ganador de Olimpiadas de Ciencias Exactas");

      // Evaluación por promedio para el porcentaje de beca
      if (profile.currentGPA >= 9.51) {
        score += 20;
        matching.push("75% de beca por promedio excelente");
      } else if (profile.currentGPA >= 9.01) {
        score += 15;
        matching.push("60% de beca por muy buen promedio");
      } else if (profile.currentGPA >= 8.51) {
        score += 10;
        matching.push("45% de beca por buen promedio");
      } else if (profile.currentGPA >= 8.0) {
        score += 5;
        matching.push("30% de beca por promedio aceptable");
      }
    } else {
      missing.push("Debe haber ganado las Olimpiadas de Ciencias Exactas");
      return 0;
    }

    return score;
  }

  private evaluateBecaValor(
    scholarship: Scholarship,
    profile: UserProfile,
    missing: string[],
    matching: string[]
  ): number {
    let score = 0;

    if (profile.parentDeceasedInService) {
      score += 95;
      matching.push("Hijo de militar fallecido en defensa de la Patria");
    } else {
      missing.push(
        "Debe ser hijo de militar del Ejército fallecido en actos del servicio"
      );
      return 0;
    }

    // Requisitos disciplinarios más flexibles
    if (profile.disciplinaryPoints <= 25) {
      score += 5;
      matching.push("Cumple requisitos disciplinarios");
    } else {
      missing.push("No debe perder más de 25 puntos en disciplina");
    }

    return score;
  }

  /**
   * Evalúa requisitos comunes a varias becas
   */
  private evaluateCommonRequirements(
    profile: UserProfile,
    missing: string[],
    matching: string[],
    baseScore: number
  ): number {
    console.log("Base score before additional checks:", baseScore);
    let additionalScore = 0;

    if (!profile.hasFailedSubjects) {
      additionalScore += 10;
      matching.push("No ha reprobado materias");
    } else {
      missing.push("No debe haber reprobado materias en segunda instancia");
    }

    if (!profile.hasUsedOptionalExam) {
      additionalScore += 5;
      matching.push("No ha usado examen optativo");
    } else {
      missing.push("No debe haberse acogido al examen optativo");
    }

    if (profile.disciplinaryPoints <= 15) {
      additionalScore += 5;
      matching.push("Buena conducta disciplinaria");
    } else {
      missing.push("No debe haber perdido más de 15 puntos en disciplina");
    }

    return additionalScore;
  }

  /**
   * Obtiene las top N recomendaciones eligibles
   */
  public getTopRecommendations(
    profile: UserProfile,
    limit: number = 3
  ): RecommendationResult[] {
    const allRecommendations = this.generateRecommendations(profile);
    return allRecommendations
      .filter((rec) => rec.eligibilityStatus !== "not-eligible")
      .slice(0, limit);
  }

  /**
   * Obtiene estadísticas de las recomendaciones
   */
  public getRecommendationStats(profile: UserProfile): {
    eligible: number;
    partiallyEligible: number;
    notEligible: number;
    totalScholarships: number;
  } {
    const recommendations = this.generateRecommendations(profile);

    return {
      eligible: recommendations.filter(
        (r) => r.eligibilityStatus === "eligible"
      ).length,
      partiallyEligible: recommendations.filter(
        (r) => r.eligibilityStatus === "partially-eligible"
      ).length,
      notEligible: recommendations.filter(
        (r) => r.eligibilityStatus === "not-eligible"
      ).length,
      totalScholarships: recommendations.length,
    };
  }
}
