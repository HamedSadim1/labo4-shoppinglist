import Button from './ui/Button';
import Dialog from './ui/Dialog';
import { AlertTriangleIcon } from './ui/icons';

interface ClearCompletedDialogProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Number of completed items the dialog message refers to. */
  completedCount: number;
  /** Called when the user clicks "Yes, clear all". */
  onConfirm: () => void;
  /** Called when the user clicks "Cancel" or hits Esc / backdrop / close button. */
  onCancel: () => void;
}

/**
 * Modal that asks the user to confirm deletion of all completed items.
 * Renders nothing when `open` is false or there is nothing to clear.
 */
export default function ClearCompletedDialog({
  open,
  completedCount,
  onConfirm,
  onCancel,
}: ClearCompletedDialogProps) {
  if (!open || completedCount === 0) return null;

  const itemCountLabel = `${completedCount} completed item${completedCount !== 1 ? 's' : ''}`;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      title="Clear completed items?"
      description={`This will permanently remove ${itemCountLabel} from your list.`}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 rounded-xl bg-red-500/10 border border-red-400/20">
        <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 border border-red-400/30">
          <AlertTriangleIcon className="w-6 h-6 text-red-300" />
        </div>
        <p className="text-red-100/90 text-sm text-center sm:text-left">
          You are about to delete {itemCountLabel}. This action cannot be undone.
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
        <Button onClick={onCancel} variant="secondary" size="sm" className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="danger" size="sm" className="w-full sm:w-auto">
          Yes, clear all
        </Button>
      </div>
    </Dialog>
  );
}
