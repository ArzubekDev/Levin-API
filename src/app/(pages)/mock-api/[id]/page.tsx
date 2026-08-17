import { ProjectDetails } from "@/entities/project";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectDetails key={id} id={id} />;
}
