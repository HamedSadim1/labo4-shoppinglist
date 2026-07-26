import Button from './ui/Button';
import { AlertTriangleIcon } from './ui/icons';
import Card from './ui/Card';

interface ClearCompletedDialogProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Number of completed items the dialog message refers to. */
  completedCount: number;
  /** Called when the user clicks "Yes, clear all". */
  onConfirm: () => void;
  /** Called when the user clicks "Cancel" or hits Esc (via the global hook). */
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-confirm-title"
    >
      <Card variant="strong" padding="p-6 sm:p-8" animation="scale-in" className="max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 border border-red-400/30 mb-4">
            <AlertTriangleIcon className="w-7 h-7 text-red-300" />
          </div>
          <h3 id="clear-confirm-title" className="text-lg font-bold text-white mb-1">
            Clear completed items?
          </h3>
          <p className="text-white/50 text-sm">
            This will permanently remove {completedCount} completed item
            {completedCount !== 1 ? 's' : ''} from your list.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={onConfirm} variant="danger" size="sm" className="flex-1 py-2.5">
            Yes, clear all
          </Button>
          <Button onClick={onCancel} variant="secondary" size="sm" className="flex-1 py-2.5">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
