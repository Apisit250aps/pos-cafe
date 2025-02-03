import { ReactNode } from 'react';

export function openModal(id: string): void {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  dialog.showModal();
}

export function closeModal(id: string): void {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  dialog.close();
}

export default function DialogModal({
  children,
  id
}: {
  children?: ReactNode;
  id: string;
}) {
  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <i className="bx bx-x"></i>
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
}
