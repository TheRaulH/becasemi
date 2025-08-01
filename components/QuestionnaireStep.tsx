import React from "react";
import { Question } from "../types/questionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  BookOpen,
  Shield,
  DollarSign,
  User,
  HelpCircle,
  Weight,
} from "lucide-react";

export function QuestionnaireStep({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const renderInput = () => {
    switch (question.type) {
      case "boolean":
        return (
          <RadioGroup
            value={String(value)}
            onValueChange={(val) => onChange(val === "true")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="true" id={`${question.id}-true`} />
              <Label
                htmlFor={`${question.id}-true`}
                className="text-card-foreground font-medium cursor-pointer"
              >
                Sí
              </Label>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="false" id={`${question.id}-false`} />
              <Label
                htmlFor={`${question.id}-false`}
                className="text-card-foreground font-medium cursor-pointer"
              >
                No
              </Label>
            </div>
          </RadioGroup>
        );

      case "single":
        return (
          <Select
            value={
              typeof value === "string" || typeof value === "number"
                ? String(value)
                : ""
            }
            onValueChange={(val) => onChange(val)}
            required={question.required}
          >
            <SelectTrigger className="w-full border-border bg-background text-foreground">
              <SelectValue
                placeholder="Selecciona una opción"
                className="text-muted-foreground"
              />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              {question.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={String(option.value)}
                  className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <Input
            type="number"
            value={
              typeof value === "string" || typeof value === "number"
                ? value
                : ""
            }
            onChange={(e) => onChange(Number(e.target.value))}
            required={question.required}
            min="0"
            max={question.id === "current-semester" ? 12 : undefined}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring"
            placeholder="Ingresa un número"
          />
        );

      case "range":
        return (
          <div className="space-y-2">
            <div className="px-2">
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={[typeof value === "number" ? value : 0]}
                onValueChange={(vals) => onChange(vals[0])}
                className="w-full "
              />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-2xl font-bold text-primary">
                  {((value as number) || 0).toFixed(1)}
                </span>
                <span className="text-muted-foreground">/ 10.0</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <Input
            type="text"
            value={
              typeof value === "string" || typeof value === "number"
                ? value
                : ""
            }
            onChange={(e) => onChange(e.target.value)}
            required={question.required}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring"
            placeholder="Ingresa tu respuesta"
          />
        );
    }
  };

  const getCategoryConfig = () => {
    switch (question.category) {
      case "academic":
        return {
          color:
            "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
          icon: <BookOpen className="h-3 w-3" />,
        };
      case "military":
        return {
          color:
            "bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/20",
          icon: <Shield className="h-3 w-3" />,
        };
      case "economic":
        return {
          color:
            "bg-secondary/10 text-secondary-foreground border-secondary/20 hover:bg-secondary/20",
          icon: <DollarSign className="h-3 w-3" />,
        };
      case "personal":
        return {
          color:
            "bg-muted/50 text-muted-foreground border-muted hover:bg-muted",
          icon: <User className="h-3 w-3" />,
        };
      default:
        return {
          color:
            "bg-muted/50 text-muted-foreground border-muted hover:bg-muted",
          icon: <HelpCircle className="h-3 w-3" />,
        };
    }
  };

  const categoryConfig = getCategoryConfig();

  return (
    <Card className="bg-card gap-2 border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-relaxed text-card-foreground">
            {question.text}
          </h3>
          {question.required && (
            <span className="text-destructive text-lg font-bold flex-shrink-0 mt-1">
              *
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-1">{renderInput()}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-1 border-t border-border/50">
        <Badge
          className={`${categoryConfig.color} font-medium transition-colors duration-200`}
          variant="outline"
        >
          <span className="flex items-center gap-1.5">
            {categoryConfig.icon}
            {question.category}
          </span>
        </Badge>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Weight className="h-3 w-3" />
          <span className="font-medium">
            Peso: <span className="text-foreground">{question.weight}</span>/10
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
