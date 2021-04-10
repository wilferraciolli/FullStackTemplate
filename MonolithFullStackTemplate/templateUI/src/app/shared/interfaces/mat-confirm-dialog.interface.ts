export interface IMatConfirmDialog {
  cancelButtonLabel: string;
  confirmButtonLabel: string;
  dialogHeader: string;
  dialogContent: string;
  callbackMethod: () => void;
}
