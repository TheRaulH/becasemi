/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurvey } from "@/hooks/useSurvey";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
 

const departments = [
  "La Paz",
  "Santa Cruz",
  "Cochabamba",
  "Beni",
  "Pando",
  "Tarija",
  "Oruro",
  "Potosí",
  "Chuquisaca",
];

const careers = [
  {
    name: "Ingeniería Civil",
    locations: ["La Paz", "Santa Cruz", "Cochabamba", "Trópico"],
  },
  {
    name: "Ingeniería en Sistemas Electrónicos",
    locations: ["La Paz", "Santa Cruz", "Cochabamba"],
  },
  { name: "Ingeniería Industrial", locations: ["La Paz", "Santa Cruz"] },
  { name: "Ingeniería Agronómica", locations: ["Santa Cruz"] },
  {
    name: "Ingeniería Comercial",
    locations: ["La Paz", "Santa Cruz", "Cochabamba", "Riberalta", "Trópico"],
  },
  {
    name: "Ingeniería de Sistemas",
    locations: ["La Paz", "Santa Cruz", "Cochabamba", "Riberalta", "Trópico"],
  },
  { name: "Ingeniería Agroindustrial", locations: ["Cochabamba", "Trópico"] },
  { name: "Ingeniería Ambiental", locations: ["La Paz", "Santa Cruz"] },
  { name: "Ingeniería Mecatrónica", locations: ["La Paz", "Santa Cruz"] },
  { name: "Ingeniería Financiera", locations: ["La Paz"] },
  { name: "Derecho", locations: ["La Paz"] },
];

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSurvey, setShowSurvey] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const {
    currentStep,
    surveyData,
    updateSurveyData,
    nextStep,
    prevStep,
    submitSurvey,
    isSubmitting,
    error: surveyError,
    success: surveySuccess,
  } = useSurvey();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUserId(data.user.id);
        setSuccessMessage("¡Registro exitoso! Ahora completa la encuesta.");
        setShowSurvey(true);
      } else {
        setError("Ocurrió un problema durante el registro.");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleSurveySubmit = async () => {
    if (!userId) return;
    await submitSurvey(userId);
    setTimeout(() => router.push("/login"), 2000);
  };

  const toggleInterestReason = (reason: string) => {
    const current = surveyData.interestReasons || [];
    if (current.includes(reason)) {
      updateSurveyData({
        interestReasons: current.filter((r) => r !== reason),
      });
    } else if (current.length < 2) {
      updateSurveyData({
        interestReasons: [...current, reason],
      });
    }
  };

  const toggleDecisionFactor = (factor: string) => {
    const current = surveyData.decisionFactors || [];
    if (current.includes(factor)) {
      updateSurveyData({
        decisionFactors: current.filter((f) => f !== factor),
      });
    } else if (current.length < 3) {
      updateSurveyData({
        decisionFactors: [...current, factor],
      });
    }
  };  


  const renderSurveyStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  ¿Cuál es tu situación en la EMI actualmente?
                </Label>
                <RadioGroup
                  value={surveyData.current_status || ""}
                  onValueChange={(value) =>
                    updateSurveyData({ current_status: value })
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label
                      htmlFor="regular"
                      className="cursor-pointer flex-1 text-sm"
                    >
                      Soy estudiante regular (ya cursé al menos una gestión)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="first_time" id="first_time" />
                    <Label
                      htmlFor="first_time"
                      className="cursor-pointer flex-1 text-sm"
                    >
                      Me preinscribí por primera vez, pero no llegué a
                      inscribirme oficialmente
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="registered" id="registered" />
                    <Label
                      htmlFor="registered"
                      className="cursor-pointer flex-1 text-sm"
                    >
                      Me preinscribí y me inscribí en la EMI este año
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Edad</Label>
                  <Input
                    type="number"
                    min="16"
                    max="50"
                    value={surveyData.age || ""}
                    onChange={(e) =>
                      updateSurveyData({
                        age: parseInt(e.target.value) || undefined,
                      })
                    }
                    className="text-center"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Género</Label>
                  <Select
                    value={surveyData.gender || ""}
                    onValueChange={(value) =>
                      updateSurveyData({ gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="other">
                        Otro / Prefiero no responder
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Departamento de procedencia</Label>
                <Select
                  value={surveyData.originDepartment || ""}
                  onValueChange={(value) =>
                    updateSurveyData({ originDepartment: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ciudad de procedencia</Label>
                <Input
                  value={surveyData.originCity || ""}
                  onChange={(e) =>
                    updateSurveyData({ originCity: e.target.value })
                  }
                  placeholder="Ej: La Paz, Santa Cruz, etc."
                />
              </div>

              <div className="space-y-2">
                <Label>Unidad educativa o colegio</Label>
                <Input
                  value={surveyData.highSchool || ""}
                  onChange={(e) =>
                    updateSurveyData({ highSchool: e.target.value })
                  }
                  placeholder="Nombre de tu colegio"
                />
              </div>

              <div className="space-y-2">
                <Label>Carrera seleccionada en la EMI</Label>
                <Select
                  value={surveyData.selectedCareer || ""}
                  onValueChange={(value) =>
                    updateSurveyData({ selectedCareer: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    {careers.map((career) => (
                      <SelectItem key={career.name} value={career.name}>
                        {career.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">
                  ¿Por qué motivo te interesaste inicialmente en la EMI?
                  <span className="text-sm text-muted-foreground ml-2">
                    (Máximo 2 opciones)
                  </span>
                </Label>

                <div className="space-y-3">
                  {[
                    "Me interesaba una carrera específica que ofrece la EMI",
                    "Por la imagen institucional de la EMI (prestigio, disciplina, valores)",
                    "Recomendación de familiares, amigos o docentes",
                    "Costos accesibles o posibilidad de beca",
                    "Por cercanía geográfica (vive cerca del campus)",
                  ].map((option) => (
                    <div
                      key={option}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        surveyData.interestReasons?.includes(option)
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => toggleInterestReason(option)}
                    >
                      <Checkbox
                        checked={
                          surveyData.interestReasons?.includes(option) || false
                        }
                        disabled={
                          (surveyData.interestReasons?.length ?? 0) >= 2 &&
                          !surveyData.interestReasons?.includes(option)
                        }
                      />
                      <Label className="cursor-pointer flex-1 text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Otra razón (opcional)</Label>
                  <Input
                    value={surveyData.otherInterestReason || ""}
                    onChange={(e) =>
                      updateSurveyData({ otherInterestReason: e.target.value })
                    }
                    placeholder="Especifica otra razón..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  ¿Qué esperabas obtener de estudiar en la EMI?
                </Label>
                <Textarea
                  value={surveyData.expectations || ""}
                  onChange={(e) =>
                    updateSurveyData({ expectations: e.target.value })
                  }
                  placeholder="Ejemplo: formación práctica, inserción laboral, prestigio militar, desarrollo profesional..."
                  className="min-h-[200px] resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    ¿Te inscribiste finalmente en la EMI?
                  </Label>
                  <RadioGroup
                    value={surveyData.finalDecision || ""}
                    onValueChange={(value) =>
                      updateSurveyData({ finalDecision: value })
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="current" id="current" />
                      <Label
                        htmlFor="current"
                        className="cursor-pointer flex-1"
                      >
                        Sí, actualmente soy estudiante
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem
                        value="not_registered"
                        id="not_registered"
                      />
                      <Label
                        htmlFor="not_registered"
                        className="cursor-pointer flex-1"
                      >
                        No, decidí no inscribirme
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="withdrawn" id="withdrawn" />
                      <Label
                        htmlFor="withdrawn"
                        className="cursor-pointer flex-1"
                      >
                        Me inscribí pero me retiré antes de comenzar clases
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {surveyData.finalDecision &&
                surveyData.finalDecision !== "current" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>¿Dónde estás estudiando actualmente?</Label>
                      <Input
                        value={surveyData.current_study_place || ""}
                        onChange={(e) =>
                          updateSurveyData({
                            current_study_place: e.target.value,
                          })
                        }
                        placeholder="Universidad o institución actual"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Principal motivo por elegir otra universidad
                      </Label>
                      <Select
                        value={surveyData.mainReasonOtherUniversity || ""}
                        onValueChange={(value) =>
                          updateSurveyData({ mainReasonOtherUniversity: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el motivo principal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career_unavailable">
                            La carrera que quería no estaba disponible o era
                            poco atractiva
                          </SelectItem>
                          <SelectItem value="expectations">
                            La EMI no cumplió mis expectativas académicas
                          </SelectItem>
                          <SelectItem value="admission_process">
                            El proceso de admisión fue confuso o burocrático
                          </SelectItem>
                          <SelectItem value="better_option">
                            Encontré una mejor opción académica en otra
                            universidad
                          </SelectItem>
                          <SelectItem value="economic">
                            Por razones económicas (costos, beca en otra
                            universidad)
                          </SelectItem>
                          <SelectItem value="family">
                            Preferencia familiar o social
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Otra razón (opcional)</Label>
                      <Input
                        value={surveyData.otherMainReason || ""}
                        onChange={(e) =>
                          updateSurveyData({ otherMainReason: e.target.value })
                        }
                        placeholder="Especifica otra razón..."
                      />
                    </div>
                  </div>
                )}
            </div>

            {surveyData.finalDecision &&
              surveyData.finalDecision !== "current" && (
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    ¿Qué factores influyeron más en tu decisión?
                    <span className="text-sm text-muted-foreground ml-2">
                      (Máximo 3)
                    </span>
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Calidad percibida de enseñanza",
                      "Prestigio institucional",
                      "Infraestructura y tecnología",
                      "Oferta de becas o ayuda económica",
                      "Ubicación de la universidad",
                      "Vida universitaria (clubs, deportes, ambiente)",
                      "Horarios y modalidad de clases",
                      "Recomendaciones de conocidos",
                      "Publicidad o redes sociales",
                    ].map((factor) => (
                      <div
                        key={factor}
                        className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          surveyData.decisionFactors?.includes(factor)
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => toggleDecisionFactor(factor)}
                      >
                        <Checkbox
                          checked={
                            surveyData.decisionFactors?.includes(factor) ||
                            false
                          }
                          disabled={
                            (surveyData.decisionFactors?.length ?? 0) >= 3 &&
                            !surveyData.decisionFactors?.includes(factor)
                          }
                        />
                        <Label className="cursor-pointer flex-1 text-sm">
                          {factor}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Otro factor (opcional)</Label>
                    <Input
                      value={surveyData.otherDecisionFactor || ""}
                      onChange={(e) =>
                        updateSurveyData({
                          otherDecisionFactor: e.target.value,
                        })
                      }
                      placeholder="Especifica otro factor..."
                    />
                  </div>
                </div>
              )}
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  ¿Qué aspectos de la EMI crees que deberían mejorar?
                </Label>
                <Textarea
                  value={surveyData.improvementSuggestions || ""}
                  onChange={(e) =>
                    updateSurveyData({ improvementSuggestions: e.target.value })
                  }
                  placeholder="Ejemplo: procesos de inscripción, comunicación, carreras nuevas, apoyo económico, infraestructura..."
                  className="min-h-[150px] resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Califica tu experiencia con la EMI durante la preinscripción
                </Label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Muy mala
                  </span>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          updateSurveyData({ experience_rating: rating })
                        }
                        className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-all ${
                          surveyData.experience_rating === rating
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:border-primary hover:text-primary"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Excelente
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  ¿Quieres dejar algún comentario o recomendación final?
                </Label>
                <Textarea
                  value={surveyData.finalComments || ""}
                  onChange={(e) =>
                    updateSurveyData({ finalComments: e.target.value })
                  }
                  placeholder="Comparte cualquier comentario adicional, sugerencia o experiencia que consideres importante..."
                  className="min-h-[200px] resize-none"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!showSurvey ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
              <p className="text-muted-foreground">
                Ingresa tus datos para comenzar
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-auto p-0 text-primary hover:text-primary/80"
                    >
                      {showPassword ? (
                        <span className="flex items-center gap-1 text-xs">
                          <EyeOff className="h-3 w-3" /> Ocultar
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs">
                          <Eye className="h-3 w-3" /> Mostrar
                        </span>
                      )}
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo 6 caracteres
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !!successMessage}
                >
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Inicia sesión
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            <Card className="shadow-xl border-0 bg-background/80 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-foreground">
                  Encuesta de Inscripción Universitaria
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Tu opinión es importante para mejorar nuestros servicios
                </p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex justify-center items-center space-x-4 mb-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                            currentStep === step
                              ? "bg-primary text-primary-foreground scale-110"
                              : step < currentStep
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {step < currentStep ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            step
                          )}
                        </div>
                        {step < 4 && (
                          <div
                            className={`w-16 h-1 mx-2 transition-all ${
                              step < currentStep
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-primary">
                      Paso {currentStep} de 4
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {currentStep === 1 && "Datos básicos del estudiante"}
                      {currentStep === 2 && "Interés y expectativas"}
                      {currentStep === 3 && "Decisión final"}
                      {currentStep === 4 && "Percepción y sugerencias"}
                    </div>
                  </div>
                </div>

                {surveyError && (
                  <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                    {surveyError}
                  </div>
                )}

                {surveySuccess && (
                  <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
                    ¡Gracias por completar la encuesta! Serás redirigido al
                    login.
                  </div>
                )}

                {/* Survey content */}
                <div className="min-h-[500px] mb-8">{renderSurveyStep()}</div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-6 border-t">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Anterior
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={isSubmitting}
                      className="flex items-center gap-2"
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSurveySubmit}
                      disabled={isSubmitting || surveySuccess}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Encuesta"}
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
