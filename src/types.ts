/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StepInfo {
  id: number;
  title: string;
  subTitle: string;
  duration: string;
  objectives: string[];
  description: string;
  metrics: string;
  sopText?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  category: "demand" | "develop" | "marketing" | "compliance" | "other";
  description: string;
  inputs: {
    key: string;
    label: string;
    type: "text" | "textarea" | "select";
    placeholder?: string;
    options?: string[];
    defaultValue?: string;
  }[];
}

export interface ASOAuditResult {
  score: number;
  warnings: string[];
  suggestions: string[];
}
