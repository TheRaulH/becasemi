"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export type SurveyData = {
  originDepartment: string;
  // Sección I
  current_status?: string;
  age?: number;
  gender?: string;
  originCity?: string;
  highSchool?: string;
  selectedCareer?: string;

  // Sección II
  interestReasons?: string[];
  otherInterestReason?: string;
  expectations?: string;

  // Sección III
  finalDecision?: string;
  current_study_place?: string;
  mainReasonOtherUniversity?: string;
  otherMainReason?: string;
  decisionFactors?: string[];
  otherDecisionFactor?: string;

  // Sección IV
  improvementSuggestions?: string;
  experience_rating?: number;
  finalComments?: string;
};

export function useSurvey() {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    originDepartment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateSurveyData = (newData: Partial<SurveyData>) => {
    setSurveyData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const submitSurvey = async (userId: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.from("survey_responses").insert([
        {
          user_id: userId,
          current_status: surveyData.current_status,
          age: surveyData.age,
          gender: surveyData.gender,
          origin_city: surveyData.originCity,
          high_school: surveyData.highSchool,
          selected_career: surveyData.selectedCareer,

          interest_reasons: surveyData.interestReasons,
          other_interest_reason: surveyData.otherInterestReason,
          expectations: surveyData.expectations,

          final_decision: surveyData.finalDecision,
          current_study_place: surveyData.current_study_place,
          main_reason_other_university: surveyData.mainReasonOtherUniversity,
          other_main_reason: surveyData.otherMainReason,
          decision_factors: surveyData.decisionFactors,
          other_decision_factor: surveyData.otherDecisionFactor,

          improvement_suggestions: surveyData.improvementSuggestions,
          experience_rating: surveyData.experience_rating,
          final_comments: surveyData.finalComments,
        },
      ]);


      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      console.error("Error submitting survey:", err);
      setError("Failed to submit survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    surveyData,
    updateSurveyData,
    nextStep,
    prevStep,
    submitSurvey,
    isSubmitting,
    error,
    success,
  };
}
