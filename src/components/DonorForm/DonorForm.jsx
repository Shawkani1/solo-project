import { useState } from "react";

function DonorForm({ isopen, onClose, FormMode, OnSubmit }) {
    const handleClose = () => {
        // Close the modal using the onClose callback from the parent
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        OnSubmit(); // Call the OnSubmit function passed from the parent
        handleClose(); // Closes the modal after submit
    };

    const [Name, setName] = useState('');
    const [Amount, setAmount] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [status, setStatus] = useState(false);

    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Paid');
    }

    

    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={isopen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">
                        {FormMode === 'edit' ? 'Edit Donor' : 'Donor Details'}</h3>
                    <div className="modal-action">
                        <form method="dialog" onSubmit={handleSubmit}>

                            <label className="input input-bordered mr-3 my-3 flex items-center gap-1">
                                Name
                                <input type="text" className="grow" value={Name} onChange={(e) => setName(e.target.value)}/>
                            </label>

                            <label className="input input-bordered mr-4 my-3 flex items-center gap-1 ">
                                Email 
                                <input type="text" className="grow" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </label>

                            <label className="input  mr-3 my-3 flex items-center gap-2">
                                Address
                                <input type="text" className="grow" value={Address} onChange={(e) => setAddress(e.target.value)}/>
                            </label>

                            <div className="flex mb-4 justify-between">
                                 <label className="input input-bordered mr-4 my-4 flex items-center gap-1">
                                Amount
                                <input type="number" className="grow"  value={Amount} onChange={(e) => setAmount(e.target.value)}/>
                            </label>
                            <select value={status ? 'Paid' : 'Not Paid'} className="select select-boarded w-full mr-4 my-4 max-w-xs" onChange={handleStatusChange}>
                                <option>Paid</option>
                                <option>Not Paid</option>
                            </select>

                            </div>

                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-success" onClick={handleClose}>
                                {FormMode === 'edit' ? 'Save Changes': ' Add a donor'}
                            </button>
                            {/* <button className="btn" onClick={handleClose}>Save Changes</button> */}
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )

}


export default DonorForm;