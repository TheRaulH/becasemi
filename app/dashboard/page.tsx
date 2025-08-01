// app/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ScholarshipRecommendationApp } from "@/components/ScholarshipRecommendationApp";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  MenuIcon,
  MoonIcon,
  SunIcon,
  LogOutIcon,
  UserIcon,
  HomeIcon,
  InfoIcon, 
  ContactIcon,
  ShieldCheckIcon,
  FileTextIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navigationItems = [
    { href: "#", label: "Cuestionario", icon: HomeIcon },
    {
      href: "/privacy",
      label: "Política de Privacidad",
      icon: ShieldCheckIcon,
    },
    { href: "/terms", label: "Términos y Condiciones", icon: FileTextIcon },
  ];

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-lg px-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <Skeleton className="h-[400px] sm:h-[500px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col">
      {/* Improved Responsive Header */}
      <header className="sticky top-0 z-50   bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="  flex h-10 sm:h-12   items-center justify-between px-4 sm:px-6 lg:px-8 w-full  ">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-9 w-9 sm:h-10 sm:w-10"
                >
                  <MenuIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[280px] sm:w-[320px] p-0 border-0"
              >
                <SheetHeader className="px-6 py-4  ">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-12 flex-shrink-0">
                      <Image
                        src="/images/emi_logo.png"
                        alt="EMI Logo"
                        width={409}
                        height={270}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <SheetTitle className="text-lg font-semibold">
                      BECAS EMI
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <div className="px-4 py-6">
                  <div className="space-y-2">
                    <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Navegación
                    </p>
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsSheetOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/emi_logo.png"
                alt="EMI Logo"
                width={409}
                height={270}
                className="h-6 sm:h-7 w-auto object-contain"
              />
              <span className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">
                BECAS EMI
              </span>
            </Link>
          </div>

          {/* Center: Navegación en desktop */}
          <nav className="hidden lg:flex gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors relative group"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right: Theme toggle + usuario */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-accent"
            >
              {theme === "dark" ? (
                <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
              <span className="sr-only">Cambiar tema</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full"
                >
                  <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                    <AvatarImage
                      src={session.user?.user_metadata?.avatar_url}
                    />
                    <AvatarFallback className="text-xs sm:text-sm">
                      {session.user?.email?.charAt(0).toUpperCase() || (
                        <UserIcon className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Mi cuenta
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 h-max w-full overflow-hidden relative">
        <motion.div
          id="cuestionario"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto   px-2 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-4"
        >
          <div className="max-w-6xl">
            {/* Mobile Title */}
            <div className="sm:hidden mb-4">
              <h1 className="text-2xl font-bold text-center">Dashboard</h1>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Encuentra las mejores becas para ti
              </p>
            </div>

            <ScholarshipRecommendationApp />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
