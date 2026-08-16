import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, AlertTriangle, Inbox } from "lucide-react";
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { statusTone } from "@/lib/admin/constants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2.5 text-sm",
        variant === "primary" && "bg-primary text-on-primary hover:bg-primary-container",
        variant === "secondary" &&
          "border border-outline-variant bg-surface-container-lowest text-on-background hover:bg-surface-container",
        variant === "ghost" && "text-on-surface-variant hover:bg-surface-container",
        variant === "danger" && "bg-error text-on-error hover:bg-on-error-container",
        className,
      )}
    />
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-[0_1px_2px_rgba(20,27,43,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
        {label}
      </span>
      {children}
      {hint && <span className="text-xs text-error">{hint}</span>}
    </label>
  );
}

const fieldClass =
  "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-background outline-none placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldClass, className)} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldClass, "resize-y", className)} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(fieldClass, "cursor-pointer", className)} />;
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        statusTone[status] ?? "bg-outline/10 text-on-surface-variant ring-outline/20",
      )}
    >
      {status}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-headline-md text-2xl font-bold tracking-tight text-on-background">{title}</h1>
        {description && <p className="mt-1 text-sm text-on-surface-variant">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant py-16 text-sm text-on-surface-variant">
      <Loader2 className="h-4 w-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-error/30 bg-error-container/40 py-12 text-center">
      <AlertTriangle className="h-6 w-6 text-error" />
      <div>
        <p className="font-medium text-on-error-container">Something went wrong. Please try again.</p>
        {message && <p className="mt-1 text-xs text-on-surface-variant">{message}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-outline-variant py-16 text-center">
      <Inbox className="h-6 w-6 text-on-surface-variant" />
      <div>
        <p className="font-medium text-on-background">{title}</p>
        {description && <p className="mt-1 text-sm text-on-surface-variant">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-xl">
          <Dialog.Title className="font-headline-md text-lg font-bold text-on-background">
            {title}
          </Dialog.Title>
          {description ? (
            <Dialog.Description className="mt-1 text-sm text-on-surface-variant">
              {description}
            </Dialog.Description>
          ) : (
            <Dialog.Description className="sr-only">{title}</Dialog.Description>
          )}
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  pending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  pending?: boolean;
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title} description={description}>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={pending}>
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
