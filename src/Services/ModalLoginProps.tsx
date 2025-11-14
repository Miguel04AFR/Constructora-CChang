export interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  usuario?: (usuario: string) => void;
}