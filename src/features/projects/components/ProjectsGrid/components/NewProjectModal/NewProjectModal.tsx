"use client";

import { useState, useTransition } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { cn } from "@/libs/utils/cn";
import { PROJECT_ICONS } from "@/features/projects/libs/projectIcons";
import { PROJECT_COLORS } from "@/features/projects/libs/projectColors";
import { createProject } from "@/features/projects/actions/createProject";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectModal({ open, onOpenChange }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("BarChart2");
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0]);
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    if (!name.trim()) return;
    startTransition(async () => {
      await createProject(name.trim(), selectedIcon, selectedColor);
      onOpenChange(false);
      setName("");
      setSelectedIcon("BarChart2");
      setSelectedColor(PROJECT_COLORS[0]);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-gray-800">
              New Project
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X size={16} />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Create a new project</Dialog.Description>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Project name
              </label>
              <Input
                placeholder="e.g. Market Research Q4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                autoFocus
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-gray-600">Select icon</p>
              <div className="grid grid-cols-5 gap-2">
                {PROJECT_ICONS.map(({ name: iconName, icon: Icon }) => (
                  <Button
                    key={iconName}
                    variant={selectedIcon === iconName ? "secondary" : "outline"}
                    className="h-10 w-full"
                    onClick={() => setSelectedIcon(iconName)}
                    disabled={isPending}
                  >
                    <Icon size={18} />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-gray-600">Select color</p>
              <div className="flex flex-wrap gap-2">
                {PROJECT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    disabled={isPending}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform",
                      selectedColor === color
                        ? "border-gray-500 scale-110"
                        : "border-transparent hover:scale-105",
                    )}
                  >
                    {selectedColor === color && (
                      <Check size={13} className="text-gray-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </Dialog.Close>
            <Button onClick={handleCreate} disabled={!name.trim() || isPending}>
              {isPending ? "Creating…" : "Create Project"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
