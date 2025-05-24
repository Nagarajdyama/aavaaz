
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("flex w-full", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <div 
            key={step} 
            className={cn(
              "flex flex-1 items-center",
              index !== steps.length - 1 ? "after:content-[''] after:h-[2px] after:flex-1 after:mx-2" : "",
              isCompleted ? "after:bg-aavaaz-green" : "after:bg-gray-200"
            )}
          >
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  isActive ? "bg-aavaaz-navy text-white ring-4 ring-aavaaz-navy/20" : "",
                  isCompleted ? "bg-aavaaz-green text-white" : "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span 
                className={cn(
                  "mt-2 text-xs",
                  isActive ? "text-aavaaz-navy font-medium" : "",
                  isCompleted ? "text-aavaaz-green font-medium" : "text-gray-500"
                )}
              >
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
