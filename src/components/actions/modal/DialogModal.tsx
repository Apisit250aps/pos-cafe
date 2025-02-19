import { ReactNode } from 'react';

interface DialogModalProps {
  id: string;
  children?: ReactNode;
}

export function showModal(id: string){
  const dialog = document.getElementById(id) as HTMLDialogElement
  dialog.showModal()
}

export function closeModal(id: string){
  const dialog = document.getElementById(id) as HTMLDialogElement
  dialog.close()
}



export default function DialogModal({ id, children }: DialogModalProps) {
  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
}
