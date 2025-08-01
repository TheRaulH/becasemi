// types/scholarships.ts

/**
 * Representa la estructura de una beca.
 */
export type Scholarship = {
  /** Identificador único para usar en URLs y keys (ej: 'beca-honor') */
  id: string;

  /** Nombre completo de la beca (ej: 'Beca Honor') */
  name: string;

  /** Capítulo del reglamento al que pertenece */
  chapter: string;

  /** Descripción o definición de la beca */
  definition: string;

  /** Objeto que detalla el porcentaje o beneficio de la beca */
  percentage: {
    /** Texto principal del beneficio (ej: '100% de la Colegiatura') */
    value: string;
    /** Detalles adicionales o escalas de porcentajes */
    details?: string[];
  };

  /** Descripción sobre el número de becas disponibles, si aplica */
  numberOfScholarships?: string;

  /** Lista de requisitos para postular a la beca */
  requirements: {
    title?: string; // Título para grupos de requisitos (ej: Para Estudiantes Civiles)
    list: string[];
  }[];

  /** Instrucciones para la presentación de documentos */
  documentSubmission: string;

  /** Pasos del procedimiento para la solicitud y aprobación */
  procedure: {
    title?: string; // Título para grupos de procedimientos
    list: string[];
  }[];

  /** Condiciones y obligaciones para mantener o renovar la beca */
  maintenanceConditions: {
    description?: string; // Descripción general
    list: string[];
  };

  /** Notas o aclaraciones importantes */
  notes?: string[];
};
