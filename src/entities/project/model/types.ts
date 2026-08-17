export interface Project {
  id: string;
  name: string;
  endpointKey: string;
  schemaJson: Record<string, unknown>;
  delay: number;
  errorRate: number;
  defaultLimit: number;
  createdAt: string;
}
