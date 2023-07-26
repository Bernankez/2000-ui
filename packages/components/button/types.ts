export interface ButtonProps {
  type?: "default" | "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "error" | "warning" ;
  disabled?: boolean;
  icon?: "info" | "success" | "error" | "warning" ;
  tag?: string;
  block?: boolean;
}
