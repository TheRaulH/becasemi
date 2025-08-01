"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, Shield } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useRouter } from "next/navigation";

export function Home() {
  const router = useRouter();

  function handleStartQuiz() {
    // Redirect to the login page using the Next.js router
    router.push("/dashboard");
  }

  const text =
    "Completá un cuestionario y descubre a qué becas académicas puedes acceder como estudiante de la EMI.";
  return (
    <AuroraBackground>
      <div className="h-screen w-screen overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="h-full w-full"
        >
          <div className="h-full w-full bg-transparent p-4 flex items-center justify-center">
            <div className="absolute bottom-4 right-4 z-10">
              <ModeToggle />
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
              {/* Contenido centrado verticalmente */}
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8">
                {/* Banner */}
                <Badge
                  className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 text-primary hover:from-primary/15 hover:to-secondary/15 transition-all duration-300 cursor-pointer group text-xs sm:text-sm"
                  variant="outline"
                >
                  <div className="flex items-center text-foreground/50 gap-1 sm:gap-2 px-2 py-1">
                    <Sparkles className="h-3 w-3 flex-shrink-0" />
                    <span className="font-medium whitespace-nowrap">
                      Sistema de Becas EMI - Disponible Ahora
                    </span>
                    <ChevronRight className="h-3 w-3 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Badge>

                {/* Título principal */}
                <div className="relative">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
                    BECAS EMI
                  </h1>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-3xl -z-10 opacity-30" />
                </div>

                {/* Descripción clara */}
                <div className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl leading-relaxed text-center">
                  <TextGenerateEffect words={text} />
                  <span className="text-secondary font-semibold block sm:inline mt-2 sm:mt-0">
                    {" "}
                    Rápido, fácil y personalizado.
                  </span>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleStartQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/70 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 max-w-xs sm:max-w-none"
                >
                  Comenzar cuestionario
                  <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Button>

                {/* Footer compacto */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>Plataforma confiable</span>
                  </Badge>

                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <a
                      className="inline-flex items-center gap-1 font-medium hover:text-foreground transition-colors duration-200 group"
                      href="/terms-and-conditions"
                    >
                      <span className="text-xs sm:text-sm">
                        Términos y Condiciones
                      </span>
                      <ChevronRight className="h-3 w-3 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </a>

                    <div className="hidden sm:block w-px h-3 bg-border"></div>

                    <a
                      className="inline-flex items-center gap-1 font-medium hover:text-foreground transition-colors duration-200 group"
                      href="/privacy"
                    >
                      <span className="text-xs sm:text-sm">
                        Política de Privacidad
                      </span>
                      <ChevronRight className="h-3 w-3 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Decoración absoluta */}
              <div className="hidden md:block absolute top-10 left-10 w-16 h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
              <div className="hidden md:block absolute bottom-10 right-10 w-20 h-20 lg:w-32 lg:h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}

export default Home;
