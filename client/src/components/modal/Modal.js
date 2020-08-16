import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
	return ReactDOM.createPortal(
		<div className='outer' onClick={() => props.handleClose()}>
			<div
				className='inner'
				style={props.dimension}
				onClick={(e) => e.stopPropagation()}
			>
				<div className='close' onClick={() => props.handleClose()}>
					<i className='fas fa-times'></i>
				</div>
				{props.children}
			</div>
		</div>,
		document.getElementById('portal')
	);
};

export default Modal;
