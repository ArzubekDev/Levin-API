import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

import { authKeys } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { api, type Project } from "@/shared/lib/api";

const DashboardContent = ({ projects }: { projects: Project[] }) => {
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete project");
      }
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <Card key={project.id} className="border-slate-800 bg-slate-900">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white">{project.name}</CardTitle>
                <CardDescription className="mt-1 font-mono text-sm text-slate-400">
                  /api/{project.endpointKey}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Link href={`/project/${project.id}`}>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:bg-red-950 hover:text-red-300"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 text-xs text-slate-500">
              <span>Delay: {project.delay}ms</span>
              <span>•</span>
              <span>Errors: {project.errorRate}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardContent;
