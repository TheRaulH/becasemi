export interface Question {
  id: string;
  text: string;
  type: "multiple" | "single" | "text";
  options?: string[];
  section: string;
  order: number;
}
