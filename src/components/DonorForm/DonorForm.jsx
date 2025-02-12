function DonorForm( {isopen, onClose, FormMode, OnSubmit }) {
    const handleClose = () => {
        // Close the modal using the onClose callback from the parent
        onClose();
      };
    
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        OnSubmit(); // Call the OnSubmit function passed from the parent
        handleClose(); // Close the modal after submit
      };
    
    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={isopen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">{FormMode === 'edit' ? 'Edit Donor': 'Donor Details'}</h3>
                    <div className="modal-action">
                        <form method="dialog" onSubmit={handleSubmit}>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-success">{FormMode === 'edit' ? 'Save Changes': 'Add Donor'}</button>
                            <button className="btn" onClick={handleClose}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )

}


export default DonorForm;