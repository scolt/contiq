import type { Metadata } from "next";
import { getProjects } from "@/features/projects/queries/getProjects";
import { ProjectsView } from "@/features/projects/components/ProjectsView/ProjectsView";

export const metadata: Metadata = {
  title: "Conversations",
  description: "View and continue your AI conversations across all projects.",
  openGraph: {
    title: "Conversations",
    description: "View and continue your AI conversations across all projects.",
  },
};

export default async function ConversationsPage() {
  const projects = await getProjects();
  return <ProjectsView projects={projects} />;
}
