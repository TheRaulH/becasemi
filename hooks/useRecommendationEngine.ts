// hooks/useRecommendationEngine.ts
import { useState, useMemo } from "react";
import { UserProfile } from "../types/questionnaire";
import { ScholarshipRecommendationEngine } from "../utils/recommendationAlgorithm";
import { ALL_SCHOLARSHIPS } from "../constants/scholarships";

export function useRecommendationEngine(
  initialProfile: Partial<UserProfile> = {}
) {
  const [userProfile, setUserProfile] =
    useState<Partial<UserProfile>>(initialProfile);

  const engine = useMemo(
    () => new ScholarshipRecommendationEngine(ALL_SCHOLARSHIPS),
    []
  );

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const getRecommendations = (profile: UserProfile) => {
    return engine.generateRecommendations(profile);
  };

  const getTopRecommendations = (profile: UserProfile, limit?: number) => {
    return engine.getTopRecommendations(profile, limit);
  };

  const getStats = (profile: UserProfile) => {
    return engine.getRecommendationStats(profile);
  };

  return {
    userProfile,
    updateProfile,
    setUserProfile,
    getRecommendations,
    getTopRecommendations,
    getStats,
    engine,
  };
}
