// constants/scholarships.ts

import { Scholarship } from "@/types/scholarships"; // Asegúrate que la ruta sea correcta

export const ALL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "beca-honor",
    name: "Beca Honor",
    chapter: "CAPÍTULO II",
    definition:
      "Beneficio concedido al estudiante del décimo semestre a Nivel Licenciatura y sexto semestre a Nivel Técnico Universitario Superior, con el promedio acumulado más alto en cada Unidad Académica.",
    percentage: {
      value: "100% de la Colegiatura.",
    },
    requirements: [
      {
        list: [
          "Pago de formularios.",
          "Cursar y aprobar en primera instancia la totalidad de las Asignaturas del Semestre Académico anterior.",
          "No haberse acogido al beneficio de Examen Optativo.",
          "No haber perdido más de 15 puntos en Disciplina.",
          "Certificado de Calificaciones que demuestren haber aprobado todas las Asignaturas en primera instancia, incluyendo Asignatura Militar con un promedio mayor o igual a 8.00 en cada Semestre.",
          "Haber obtenido el promedio acumulado más alto en los 9 semestres (Licenciatura) o 5 semestres (Técnico Superior) de permanencia continua.",
          "Haber cumplido con la Instrucción Militar en la EMI.",
        ],
      },
    ],
    documentSubmission:
      "Los documentos deberán ser presentados en folder amarillo siguiendo el orden de los requisitos.",
    procedure: [
      {
        list: [
          "El Vicerrectorado de Grado convocará a los postulantes a la conclusión del Segundo Examen Parcial.",
          "El postulante presentará los requisitos a la Jefatura de Carrera 5 días hábiles después de la conclusión del semestre.",
          "La Jefatura de Carrera evaluará y elevará un informe a la Dirección de Grado.",
          "La Dirección de Grado convocará al Consejo Académico para emitir una Resolución y elevarla al Vicerrectorado de Grado.",
          "La Resolución se considerará en el Consejo Superior Académico para su aprobación final.",
        ],
      },
    ],
    maintenanceConditions: {
      list: [
        "Certificado de haber cumplido con 100 horas semestrales de apoyo a la investigación o apoyo académico e Instrucción Militar.",
      ],
    },
  },
  {
    id: "beca-excelencia-academica",
    name: "Beca Excelencia Académica",
    chapter: "CAPÍTULO III",
    definition:
      "Beneficio otorgado a los estudiantes del Curso Preuniversitario, Prueba de Suficiencia Académica (PSA), Ciencias Básicas y Carreras que cumplan requisitos académicos y disciplinarios.",
    percentage: {
      value: "Desde 30% hasta 75% de la Colegiatura.",
      details: [
        "Cursos Preuniversitarios y PSA: 50% de beca con promedio >= 8.00.",
        "Ciencias Básicas y Carreras (escala):",
        "De 8.00 a 8.50: 30% de beca.",
        "De 8.51 a 9.00: 45% de beca.",
        "De 9.01 a 9.50: 60% de beca.",
        "De 9.51 a 10.00: 75% de beca.",
      ],
    },
    numberOfScholarships:
      "El número de becas varía según la modalidad (Preuniversitario, PSA, Ciencias Básicas, Carreras) y la cantidad de estudiantes inscritos en el semestre.",
    requirements: [
      {
        list: [
          "Pago de Formularios.",
          "Cursar y aprobar en primera instancia la totalidad de las Asignaturas del Semestre Académico anterior.",
          "No haberse acogido al beneficio de Examen Optativo.",
          "No haber perdido más de 15 puntos en Disciplina.",
          "Estudiantes con Beca que soliciten Traspaso Interno deben iniciar el trámite cinco días hábiles después de la conclusión del semestre.",
        ],
      },
    ],
    documentSubmission:
      "Los documentos deberán ser presentados en folder amarillo, siguiendo el orden de los requisitos.",
    procedure: [
      {
        list: [
          "El Vicerrectorado de Grado publicará la convocatoria.",
          "Los Jefes de Carrera socializarán la convocatoria 30 días antes de las pruebas finales.",
          "Los estudiantes presentarán su postulación a la Jefatura de Carrera.",
          "La Jefatura de Carrera evaluará y elevará un informe a la Dirección de Grado.",
          "La Dirección de Grado y el Consejo Académico emitirán una Resolución.",
          "El Consejo Superior Académico evaluará y aprobará la resolución final.",
        ],
      },
    ],
    maintenanceConditions: {
      list: [
        "Certificado de haber cumplido con 100 horas semestrales de apoyo a la investigación o apoyo académico a la docencia e Instrucción Militar.",
      ],
    },
    notes: [
      "Si los mejores promedios corresponden a militares, las becas no serán otorgadas a ellos bajo esta modalidad.",
    ],
  },
  {
    id: "beca-invitacion-directa",
    name: "Beca a Bachilleres por Invitación Directa",
    chapter: "CAPÍTULO IV",
    definition:
      "Beneficio otorgado al bachiller de la última gestión con el mejor promedio acumulado de la promoción de colegios seleccionados, para cursar el Primer Semestre.",
    percentage: {
      value:
        "100% de la colegiatura y Extensión Universitaria durante los diez semestres de estudio.",
    },
    requirements: [
      {
        list: [
          "Certificación del colegio que acredite tener el mejor promedio acumulado de la promoción.",
          "Pago de Formularios.",
        ],
      },
    ],
    documentSubmission:
      "Los documentos deberán ser presentados en folder amarillo a la Unidad de Extensión y Bienestar Universitario.",
    procedure: [
      {
        list: [
          "La Unidad de Extensión invitará a tres establecimientos educativos a nominar a su mejor bachiller.",
          "El Consejo Académico analizará y seleccionará los colegios.",
          "Los Directores de Grado comunicarán al beneficiario la otorgación de la beca.",
          "Jefes de Ciencias Básicas y de Carrera realizarán el seguimiento.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "Pago de Formularios.",
        "Aprobar en primera instancia todas las asignaturas del semestre anterior.",
        "No haberse acogido al beneficio de Examen Optativo.",
        "No haber perdido más de 15 puntos de Disciplina.",
        "Mantener en cada semestre un promedio mayor o igual a 8.50.",
        "Cumplir 100 horas semestrales de apoyo a la investigación o académico.",
      ],
    },
  },
  {
    id: "beca-institucional",
    name: "Beca Institucional",
    chapter: "CAPÍTULO V",
    definition:
      "Beca concedida a Oficiales, Suboficiales y Sargentos de las Fuerzas Armadas del Estado (y países con convenio) declarados en Comisión de Estudios.",
    percentage: {
      value:
        "100% del curso Vestibular, Registro Académico, Colegiatura, Servicio de Atención Médica y Extensión Universitaria.",
    },
    numberOfScholarships:
      "La cantidad de becas estará determinada en la directiva de postulación a la EMI de cada comando de fuerza.",
    requirements: [
      {
        list: [
          "Autorización de los Comandos de cada Fuerza para realizar el curso Vestibular.",
          "Aprobar el Curso Vestibular.",
        ],
      },
    ],
    documentSubmission:
      "No especificado, se rige por el procedimiento interno.",
    procedure: [
      {
        list: [
          "La Jefatura de Ciencias Básicas eleva a Rectorado la lista de Militares con el Orden de Mérito.",
          "Rectorado eleva la lista al Comando General del Ejército para su aprobación.",
          "Una vez declarados en Comisión de Estudios, el Consejo Superior Académico elabora la Resolución.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "Si el Militar aprueba con examen de segunda instancia, el porcentaje de la beca disminuye (30% de pago con 1 materia, 60% con 2). Puede recuperar el 100% si aprueba el siguiente semestre sin segundas instancias.",
      list: [
        "Aprobar el Semestre Académico.",
        "Pago de Formularios.",
        "No haber perdido más de 15 puntos en Disciplina.",
        "Cumplir con 100 horas semestrales de apoyo a la investigación o promoción institucional.",
      ],
    },
  },
  {
    id: "beca-convocatoria-publica",
    name: "Beca a Bachilleres por Convocatoria Pública",
    chapter: "CAPÍTULO VI",
    definition:
      "Beneficio otorgado a bachilleres de la última gestión que obtengan los tres mejores promedios en la prueba académica tomada por la EMI.",
    percentage: {
      value: "Hasta 100% de la Colegiatura durante diez semestres.",
      details: [
        "100% de la Colegiatura al mejor promedio.",
        "90% de la Colegiatura al segundo mejor promedio.",
        "80% de la Colegiatura al tercer mejor promedio.",
      ],
    },
    numberOfScholarships: "Se asignan 3 becas por Unidad Académica.",
    requirements: [
      {
        list: [
          "Certificación del Colegio que acredite ser estudiante de la última gestión.",
          "Aprobar el examen de conocimientos con una calificación mayor o igual a 8.00.",
        ],
      },
    ],
    documentSubmission: "No especificado, se rige por el procedimiento.",
    procedure: [
      {
        list: [
          "La Unidad de Extensión y Bienestar Universitario socializará la convocatoria en colegios.",
          "La Jefatura de Ciencias Básicas elaborará y evaluará el examen de conocimientos.",
          "Los Jefes de Ciencias Básicas y de Carrera realizarán el seguimiento a los beneficiados.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "Pago de Formularios.",
        "Aprobar en primera instancia todas las asignaturas del semestre anterior.",
        "No haberse acogido al beneficio de Examen Optativo.",
        "No haber perdido más de 15 puntos en Disciplina.",
        "Mantener en cada semestre un promedio mayor o igual a 8.50.",
        "Cumplir con 100 horas semestrales de actividades de promoción e imagen corporativa.",
      ],
    },
  },
  {
    id: "beca-investigacion",
    name: "Beca Investigación",
    chapter: "CAPÍTULO VII",
    definition:
      "Beneficio concedido a estudiantes de la EMI que realicen proyectos de investigación, o a jóvenes talento con proyectos concluidos que deseen estudiar en la EMI.",
    percentage: {
      value: "Desde 50% al 100% de la Colegiatura.",
      details: [
        "Si el proyecto es en equipo, el porcentaje se dividirá en proporciones iguales entre los integrantes.",
      ],
    },
    numberOfScholarships:
      "Estudiantes Civiles de la EMI: Máximo dos proyectos por Carrera. Estudiantes con proyectos concluidos: Depende del informe de la Dirección Nacional de Investigación.",
    requirements: [
      {
        title: "Para Estudiantes Civiles de la EMI:",
        list: [
          "Pago de Formularios.",
          "Aprobar en primera instancia todas las asignaturas del semestre anterior.",
          "No haberse acogido al beneficio de Examen Optativo.",
          "No haber perdido más de 15 puntos en Disciplina.",
          "Estar cursando del Segundo al Noveno Semestre.",
          "Presentar propuesta de Proyecto de Investigación.",
          "Equipos de máximo 3 estudiantes.",
        ],
      },
      {
        title: "Para Estudiantes con Proyectos Concluidos:",
        list: [
          "Presentar o hacer aprobar el Proyecto de Investigación concluido en la Dirección Nacional de Investigación.",
        ],
      },
    ],
    documentSubmission:
      "La postulación se realiza a través de las Jefaturas de Carrera y la Unidad de Investigación.",
    procedure: [
      {
        title: "Para Estudiantes Civiles de la EMI:",
        list: [
          "Jefaturas de Carrera presentan proyectos a la Unidad de Investigación.",
          "La Dirección Nacional de Investigación, Ciencia y Tecnología (DNICYT) evalúa y aprueba los proyectos.",
          "El Consejo Superior Académico aprueba la lista de becados y Secretaría General elabora la Resolución.",
        ],
      },
      {
        title: "Para Estudiantes con Proyectos Concluidos:",
        list: [
          "El estudiante presenta la solicitud a la Dirección de Grado.",
          "La Unidad de Investigación evalúa y eleva informes a la Unidad Académica y luego a la DNICYT.",
          "La DNICYT eleva al Consejo Superior Académico para su aprobación final.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "Pago de Formularios.",
        "Aprobar en primera instancia todas las asignaturas del semestre anterior.",
        "No haberse acogido al beneficio de Examen Optativo.",
        "No haber perdido más de 15 puntos en Disciplina.",
        "Cumplir con 100 horas semestrales de actividades de promoción o desarrollo.",
        "Presentar informe final del proyecto (para becados por investigación interna).",
      ],
    },
  },
  {
    id: "beca-social",
    name: "Beca Social",
    chapter: "CAPÍTULO VIII",
    definition:
      "Beca que se otorga a los estudiantes de escasos recursos económicos y estudiantes con discapacidad que cursan el nivel Grado.",
    percentage: {
      value: "Desde 40% al 70% de la Colegiatura.",
      details: ["Requiere un promedio igual o mayor a 6.50."],
    },
    numberOfScholarships:
      "No sobrepasará el 0.5% del efectivo total de la Unidad Académica.",
    requirements: [
      {
        list: [
          "Pago de Formularios.",
          "Cursar y aprobar en primera instancia la totalidad de las Asignaturas del Semestre Académico anterior.",
          "No haber perdido más de 15 puntos en Disciplina.",
        ],
      },
    ],
    documentSubmission:
      "El proceso se basa en informes internos y no en la presentación de documentos por parte del estudiante.",
    procedure: [
      {
        list: [
          "Informe socioeconómico y/o de discapacidad elaborado por la Unidad de Extensión y Bienestar Universitario.",
          "Informe de rendimiento académico y disciplinario elaborado por el Jefe de Carrera.",
          "Los informes se elevan a la Dirección de Grado y se aprueban en Consejo Académico.",
          "Finalmente, se eleva al Vicerrectorado de Grado y se aprueba en Consejo Superior Académico.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "Pago de Formularios.",
        "Aprobar en primera instancia todas las asignaturas del semestre anterior.",
        "No haber perdido más de 15 puntos en Disciplina.",
        "Cumplir con 100 horas semestrales de actividades de promoción e imagen corporativa.",
      ],
    },
  },
  {
    id: "beca-solidaridad",
    name: "Beca Solidaridad",
    chapter: "CAPÍTULO IX",
    definition:
      "Beneficio concedido a hijos de personal fallecido en funciones en la EMI, a cadetes/alumnos accidentados en actos de servicio, o a estudiantes regulares que pierden a sus padres y no cuentan con recursos.",
    percentage: {
      value:
        "100% del Registro Académico, Colegiatura, Extensión Universitaria y Servicio de Atención Médica.",
      details: ["Cubre los 10 semestres académicos de estudio."],
    },
    requirements: [
      {
        title: "Para hijos de personal fallecido en la EMI:",
        list: [
          "Pago de Formularios.",
          "Aprobar en primera instancia todas las asignaturas.",
          "No haber perdido más de 15 puntos en Disciplina.",
          "Fotocopia legalizada del Carnet de COSSMIL (si aplica).",
          "Certificado de defunción del padre o madre.",
          "Informe socioeconómico.",
        ],
      },
      {
        title: "Para Cadetes y Alumnos accidentados:",
        list: [
          "Resolución del Consejo Superior Académico del Ejército.",
          "Instructiva del Comando General del Ejército.",
        ],
      },
      {
        title: "Para estudiantes que pierden a sus padres:",
        list: [
          "Pago de Formularios.",
          "Aprobar en primera instancia todas las asignaturas.",
          "No haber perdido más de 15 puntos en Disciplina.",
          "Acta de defunción de los padres.",
          "Informe socioeconómico detallado.",
        ],
      },
    ],
    documentSubmission:
      "La postulación se realiza internamente según cada caso.",
    procedure: [
      {
        list: [
          "El procedimiento varía según el caso, pero todos involucran una evaluación por parte de la Jefatura de Carrera, el Consejo Académico y una aprobación final por el Consejo Superior Académico.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "Pago de Formularios.",
        "Cursar y aprobar en primera instancia la totalidad de las Asignaturas del Semestre Académico anterior.",
        "No haber perdido más de 15 puntos en Disciplina.",
      ],
    },
  },
  // ... (continúa después del objeto 'Beca Solidaridad')

  {
    id: "beca-deportiva",
    name: "Beca Deportiva",
    chapter: "CAPÍTULO X",
    definition:
      "Beneficio concedido a Estudiantes Civiles que integren selecciones representativas de la EMI a nivel Nacional, Departamental o Internacional, o que obtengan logros destacados en disciplinas deportivas.",
    percentage: {
      value: "Desde 15% hasta 70% de la colegiatura.",
      details: [
        'Nacional en Primera "A": 50% por participación, 70% por logro obtenido.',
        "Internacional: 40% por participación, 50% por 2do lugar, 60% por 1er lugar.",
        "Departamental en Primera de Honor: 30% por participación, 50% por logro obtenido.",
        "Asociación (Tercera y Segunda de Ascenso): 15% por participación, 20% por logro obtenido.",
        "El número de becados por disciplina y categoría es limitado (ej: Fútbol hasta 18, Básquet hasta 10, etc.).",
      ],
    },
    numberOfScholarships:
      "El número de becas está detallado en los porcentajes y varía según la disciplina y categoría deportiva.",
    requirements: [
      {
        list: [
          "Pago de Formularios.",
          "Cursar y aprobar en primera instancia la totalidad de las Asignaturas del Semestre anterior.",
          "Informe de asistencia mínima de 80% a los entrenamientos.",
          "Certificado de no haber perdido más de 25 puntos en disciplina y no tener procesos disciplinarios.",
        ],
      },
    ],
    documentSubmission:
      "Los documentos deberán ser presentados en folder amarillo, siguiendo el orden de los requisitos.",
    procedure: [
      {
        list: [
          "Los profesores de Deportes presentan la lista de estudiantes, informes y porcentajes de beca sugeridos.",
          "Los informes se elevan a la Dirección de Grado para su consideración en Consejo Académico.",
          "El Consejo Académico eleva la propuesta al Consejo Superior Académico para su aprobación y la elaboración de la Resolución final.",
        ],
      },
    ],
    maintenanceConditions: {
      list: [
        "Certificado de asistencia regular a los entrenamientos y a las actividades en representación de la EMI.",
      ],
    },
    notes: [
      "El estudiante debe exhibir el logotipo de la EMI en su indumentaria deportiva.",
    ],
  },
  {
    id: "beca-cultural",
    name: "Beca Cultural",
    chapter: "CAPÍTULO XI",
    definition:
      "Beneficio concedido a Estudiantes Civiles que integran el Coro, Danza, Banda de Música u otras actividades de extensión cultural de la EMI.",
    percentage: {
      value: "Hasta 40% de la colegiatura.",
      details: [
        "Danza y Coro: Hasta el 15% de la colegiatura mensual.",
        "Banda de Música: Del 20% al 40% de la colegiatura mensual.",
      ],
    },
    numberOfScholarships:
      "No sobrepasará los 20 integrantes por Unidad Académica, otorgado según orden de méritos.",
    requirements: [
      {
        list: [
          "Pago de Formularios.",
          "Cursar y aprobar en primera instancia la totalidad de las Asignaturas del Semestre anterior.",
          "No haber perdido más de 15 puntos en Disciplina.",
        ],
      },
    ],
    documentSubmission:
      "La postulación se realiza a través del informe del profesor del área cultural.",
    procedure: [
      {
        list: [
          "Los profesores de las áreas culturales elaboran una lista de postulantes según rendimiento.",
          "La Unidad de Extensión y Bienestar Universitario elabora el informe final.",
          "El informe se eleva a Dirección de Grado, luego a Consejo Académico y finalmente a Consejo Superior Académico para su aprobación.",
        ],
      },
    ],
    maintenanceConditions: {
      list: [
        "Certificado mensual de asistencia a los ensayos y las presentaciones en nombre de la EMI.",
      ],
    },
  },
  {
    id: "beca-servicio-militar-obligatorio",
    name: "Beca Servicio Militar Obligatorio",
    chapter: "CAPÍTULO XII",
    definition:
      "Beneficio que se otorga a Soldados y/o Marineros destacados o accidentados en Actos del Servicio, propuestos por el Comando General del Ejército.",
    percentage: {
      value: "100% en todos los conceptos durante la carrera.",
      details: [
        "100% del costo del curso Preuniversitario.",
        "100% del Registro Académico, Colegiatura, Extensión Universitaria y Servicio de Atención Médica durante cinco años (Licenciatura) o tres años (Técnico Superior).",
      ],
    },
    requirements: [
      {
        title: "Para Soldados y Marineros Destacados:",
        list: [
          "Estar contemplado en las listas del Comando General del Ejército.",
        ],
      },
      {
        title: "Para Soldados y Marineros Accidentados:",
        list: [
          "Resolución del Comando General del Ejército que otorga la Beca por accidente en actos del Servicio o Instrucción.",
        ],
      },
    ],
    documentSubmission:
      "La postulación es gestionada directamente por el Comando General del Ejército.",
    procedure: [
      {
        title: "Para Soldados y/o Marineros Destacados:",
        list: [
          "El Comando General del Ejército remite las listas a la EMI.",
          "Ciencias Básicas informa el rendimiento académico post-preuniversitario.",
          "Rectorado eleva el orden de mérito al Comando General del Ejército.",
          "Jefaturas de Carrera realizan el seguimiento.",
        ],
      },
      {
        title: "Para Soldados y/o Marineros Accidentados:",
        list: [
          "Rectorado recibe la Resolución del Comando General y el Consejo Superior Académico emite la resolución de la beca.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "Pago de Formularios.",
        "Aprobar la totalidad de las Asignaturas del semestre anterior, incluida Materia Militar.",
        "No haber perdido más de 15 puntos en disciplina ni tener procesos disciplinarios.",
        "Cumplir con 100 horas semestrales de actividades de promoción e imagen corporativa.",
        "Elaborar su Trabajo de Grado orientado a solucionar aspectos de interés de las FF.AA.",
      ],
    },
  },
  {
    id: "beca-al-exterior",
    name: "Beca al Exterior",
    chapter: "CAPÍTULO XIII",
    definition:
      "Beneficio concedido al estudiante que, por su rendimiento académico, se destaque para realizar estudios de Grado en una Universidad o Instituto de Educación Superior en el exterior.",
    percentage: {
      value: "Variable y sujeto a presupuesto.",
      details: [
        "El beneficio se otorga para satisfacer necesidades institucionales y depende de un presupuesto aprobado anualmente.",
      ],
    },
    numberOfScholarships:
      "Está en función a las necesidades de la Institución y al presupuesto dispuesto.",
    requirements: [
      {
        title: "Requisitos Generales (Civiles):",
        list: [
          "Pago de Formulario.",
          "No haberse acogido al beneficio de Examen Optativo.",
          "Elaborar Trabajo de Grado orientado a solucionar aspectos de interés de las FF.AA.",
          "Haber aprobado en primera instancia todas las asignaturas del semestre anterior.",
          "No haber perdido más de 15 puntos en disciplina.",
          "Cumplir con 100 horas semestrales de actividades de promoción.",
        ],
      },
      {
        title: "Requisitos para Militares Estudiantes del Ejército:",
        list: [
          "Requisitos académicos y disciplinarios estándar.",
          "Tener el promedio acumulado más alto del Primer y Segundo Semestre entre militares.",
          "Cumplir con los requisitos de la universidad de destino.",
          "Firmar Acta de Compromiso de Prestación de Servicios a la Institución post-beca.",
        ],
      },
    ],
    documentSubmission:
      "Gestionado internamente por la Dirección Nacional de Relaciones Internacionales.",
    procedure: [
      {
        list: [
          "La Dirección Nacional de Relaciones Internacionales eleva la propuesta al Consejo Superior Académico para su aprobación.",
          "Para Estudiantes Militares, Rectorado debe solicitar autorización al Comando General del Ejército antes de otorgar la beca.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "Evaluación semestral favorable de rendimiento académico y disciplina emitida por la universidad del exterior.",
        "Evaluación anual favorable de la disponibilidad presupuestaria institucional.",
        "Para Civiles: Cancelación de valores por Registro Académico y Formulario de Solicitud de Beca semestralmente.",
      ],
    },
  },
  {
    id: "beca-olimpiadas-ciencias-exactas",
    name: "Beca Olimpiadas de Ciencias Exactas",
    chapter: "CAPÍTULO XIV",
    definition:
      "Beneficio concedido a los miembros del equipo que obtuvo el primer puesto en las Olimpiadas de Ciencias Exactas de la EMI.",
    percentage: {
      value: "Desde 30% hasta 75% de la colegiatura.",
      details: [
        "De 8.00 a 8.50 de calificación: 30% de beca.",
        "De 8.51 a 9.00 de calificación: 45% de beca.",
        "De 9.01 a 9.50 de calificación: 60% de beca.",
        "De 9.51 a 10.00 de calificación: 75% de beca.",
      ],
    },
    numberOfScholarships:
      "Se otorga a cada uno de los participantes del equipo ganador.",
    requirements: [
      {
        list: [
          "Pago de Formularios.",
          "No haberse acogido al beneficio de Examen Optativo.",
          "No haber perdido más de 15 puntos en Disciplina.",
          "Haber aprobado la totalidad de las Asignaturas en primera instancia en el semestre de la convocatoria.",
        ],
      },
    ],
    documentSubmission:
      "La postulación es automática basada en los resultados de la olimpiada.",
    procedure: [
      {
        list: [
          "El Jefe de Ciencias Básicas eleva un informe a la Dirección de Grado.",
          "La Dirección de Grado convoca al Consejo Académico para emitir una Resolución.",
          "La Resolución se eleva al Consejo Superior Académico para su aprobación final.",
        ],
      },
    ],
    maintenanceConditions: {
      list: [], // El reglamento no especifica condiciones de mantenimiento para esta beca.
    },
    notes: [
      "La beca se efectivizará en la Gestión posterior a la realización de la Olimpiada.",
    ],
  },
  {
    id: "beca-al-valor-boliviano",
    name: "Beca al Valor Boliviano",
    chapter: "CAPÍTULO XV",
    definition:
      "Beneficio concedido a hijos (as) del personal militar del Ejército que ofrendaron su vida en actos del servicio en defensa de la Patria.",
    percentage: {
      value: "100% de registro, colegiatura y extensión.",
      details: ["El beneficio cubre los 10 Semestres Académicos de Estudio."],
    },
    requirements: [
      {
        list: [
          "Pago de Formularios.",
          "Cursar y aprobar el semestre académico.",
          "No haber perdido más de 15 puntos en Disciplina.",
          "Solicitud de Beca al Comando General del Ejército.",
          "Resolución del Comando General del Ejército instruyendo a la EMI que otorgue la beca.",
        ],
      },
    ],
    documentSubmission:
      "La postulación se gestiona a través del Comando General del Ejército.",
    procedure: [
      {
        list: [
          "La Resolución del Comando General del Ejército es refrendada por el Consejo Superior Académico de la EMI.",
        ],
      },
    ],
    maintenanceConditions: {
      description:
        "El estudiante que no cumpla con las condiciones perderá la beca sin opción a recuperarla.",
      list: [
        "No sobrepasar los 25 puntos perdidos en Disciplina en cada Semestre.",
        "Aprobar el Semestre Académico, incluida Materia Militar.",
        "Cumplir con 100 horas semestrales de actividades de promoción e imagen corporativa.",
      ],
    },
  },
];
