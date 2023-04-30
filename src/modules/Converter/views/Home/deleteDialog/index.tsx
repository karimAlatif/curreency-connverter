import React from 'react';
import Dialog from 'shared/components/Dialog';

interface Props {
  isOpen: boolean;
  setModalState: (state: boolean) => void;
  CompanyName: string;
  isIndividual: boolean;
  onConfirm: () => void;
}

function DeleteDialog(props: Props) {
  const {isOpen, setModalState, CompanyName, isIndividual, onConfirm} = props;

  return (
    <Dialog
      open={isOpen}
      disableBackdropClick={true}
      title={`Deleting Compan${isIndividual ? 'y' : 'ies'}`}
      content={
        <div style={{wordBreak: 'normal'}}>
          {`Are you sure to delete ${`${
            isIndividual
              ? (CompanyName && `"${CompanyName}"`) || 'selected company'
              : 'selected companies'
          }`} from your project permanently? You won't be able to retore it.`}
        </div>
      }
      actions={[
        {
          text: 'CANCEL',
          onClick: () => {
            setModalState(false);
          },
          variant: 'secondary',
        },
        {
          text: 'Delete',
          onClick: onConfirm,
          variant: 'danger',
        },
      ]}
      onClose={() => setModalState(false)}
    />
  );
}

export default DeleteDialog;
