import { getProjects } from "@/features/projects/queries/getProjects";
import { ProjectsView } from "@/features/projects/components/ProjectsView/ProjectsView";

export default async function ConversationsPage() {
  const projects = await getProjects();
  return <ProjectsView projects={projects} />;
}
