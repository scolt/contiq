import { getProjects } from "@/features/projects/queries/getProjects";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid/ProjectsGrid";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsGrid projects={projects} />;
}
