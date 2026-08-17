"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Project } from "@/entities/project";
import { projectKeys } from "@/entities/project/model/project-keys";
import { useSession } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { fetchClient } from "@/shared/lib/fetch-client";
import { Container } from "@/shared/ui/Container";

import DashboardContent from "./DashboardContent";
import DashboardEmpty from "./DashboardEmpty";

export function Dashboard() {
  const router = useRouter();
  const { user, status } = useSession();

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: projectKeys.list(),
    queryFn: () => fetchClient.get<Project[]>("/projects"),
    enabled: status === "authenticated",
    retry: false,
  });

  if (status !== "authenticated" || !user) {
    return (
      <div className="min-h-screen bg-slate-950 p-8">
        <Skeleton className="h-8 w-64 bg-slate-800" />
      </div>
    );
  }

  const canCreate = (user.projectsCount || 0) < user.maxProjects;

  const handleNewProject = () => {
    if (!canCreate) {
      toast.error("Чтобы создавать больше проектов, нужна подписка.");
      return;
    }
    router.push("/mock-api");
  };

  return (
    <div className="min-h-screen bg-slate-950 py-24 text-white">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mock API-проекты</h1>
            <p className="mt-1 text-slate-400">
              {user.projectsCount} / {user.maxProjects} проектов
            </p>
          </div>
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700"
            onClick={handleNewProject}
          >
            <Plus className="mr-2 h-4 w-4" />
            Новый проект
          </Button>
        </div>

        {projectsLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-40 bg-slate-800" />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <DashboardContent projects={projects} />
        ) : (
          <DashboardEmpty />
        )}
      </Container>
    </div>
  );
}
