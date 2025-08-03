import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react";

interface AlertComponentProps {
    title: string;
    description: ReactNode;
    cancelButtonText?: string;
    actionButtonText?: string;
    onClickAction?: () => void;
    onClickCancel?: () => void;
    open: boolean;
    openChange?: (open: boolean) => void;
    children?: ReactNode;
}

function AlertComponent(props: AlertComponentProps) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.openChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {props.children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onClickCancel}>
            {props.cancelButtonText}
          </AlertDialogCancel>
          {props.actionButtonText && (
            <AlertDialogAction onClick={props.onClickAction}>
              {props.actionButtonText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertComponent;