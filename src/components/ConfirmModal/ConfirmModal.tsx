import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';

export interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  variant = 'default',
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title}>
      <p className="mb-6 text-sm text-gray-500">{description}</p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button variant={variant} size="sm" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
