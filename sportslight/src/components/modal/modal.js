import './modal.css';
import ReactModal from 'react-modal';

const ModalPop = ({ isOpen, Confirm, data }) => {
  const handleClickConfirm = () => {
    Confirm();
  };

  return (
    <ReactModal isOpen={isOpen} className='aaaa'>
      <div className='bbbb'>
        <div className='modalMessage'>{data}</div>
        <div>
          <button onClick={handleClickConfirm} id='modalCloseBtn'>
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalPop;
