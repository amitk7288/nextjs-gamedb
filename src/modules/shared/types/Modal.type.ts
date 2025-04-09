import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
}
