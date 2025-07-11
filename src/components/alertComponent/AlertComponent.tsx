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

interface AlertComponentProps {
    title: string;
    description: string;
    cancelButtonText?: string;
    actionButtonText?: string;
    onClickAction?: () => void;
    onClickCancel?: () => void;
    open: boolean;
    openChange?: (open: boolean) => void;
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
        <AlertDialogFooter>
        <AlertDialogCancel onClick={props.onClickCancel}>{props.cancelButtonText}</AlertDialogCancel>
        <AlertDialogAction onClick={props.onClickAction}>{props.actionButtonText}</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertComponent;