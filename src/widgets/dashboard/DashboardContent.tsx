import { useQueryClient } from "@tanstack/react-query";
import { Copy, ExternalLink, FolderPen, Info, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Project } from "@/entities/project";
import { projectKeys } from "@/entities/project/model/project-keys";
import { authKeys } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import { fetchClient } from "@/shared/lib/fetch-client";

const DashboardContent = ({ projects }: { projects: Project[] }) => {
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      await fetchClient.delete(`/projects/${id}`);
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
      await queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Проект удалён");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Не удалось удалить проект");
      }
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
      ))}
    </div>
  );
};

function ProjectCard({ project, onDelete }: { project: Project; onDelete: (id: string) => void }) {
  const router = useRouter();

  return (
    <ContextMenu>
      <ContextMenuTrigger className="block w-full">
        <Card className="border-slate-800 bg-slate-900">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white">{project.name}</CardTitle>
                <CardDescription className="mt-1 font-mono text-sm text-slate-400">
                  /api/{project.endpointKey}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Link href={`/mock-api/${project.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer text-red-400 hover:bg-red-950 hover:text-red-300"
                  onClick={() => onDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 text-xs text-slate-500">
              <span>Задержка: {project.delay} мс</span>
              <span>•</span>
              <span>Ошибки: {project.errorRate}%</span>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/mock-api/${project.id}`)}
        >
          <ExternalLink />
          Открыть
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>
          <FolderPen />
          Переименовать
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Copy />
          Дублировать
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Send />
          Отправить
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Info />
          Свойства
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 />
          Удалить
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default DashboardContent;
