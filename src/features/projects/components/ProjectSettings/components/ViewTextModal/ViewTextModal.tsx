import { Modal } from '@/components/Modal';

interface ViewTextModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  content: string
}

export function ViewTextModal({ open, onOpenChange, title, content }: ViewTextModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title} className="max-w-2xl">
      <div className="max-h-96 overflow-y-auto rounded-lg bg-gray-50 p-4 text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
        {content}
      </div>
    </Modal>
  );
}
