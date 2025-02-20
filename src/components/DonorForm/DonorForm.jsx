import { useState, useEffect } from "react";

function DonorForm({ isopen, onClose, FormMode, OnSubmit, initialData }) {
    const handleClose = () => {
        // Close the modal using the onClose callback from the parent
        onClose();
    };

    const [name, setName] = useState(initialData?.name || '');
    const [amount, setAmount] = useState(initialData?.amount || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [address, setAddress] = useState(initialData?.address || '');
    const [Paid, setPaid] = useState(initialData?.Paid || false);
    const [Donation_date, setDonationDate] = useState(initialData?.Donation_date || new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setAmount(initialData.amount || '');
            setEmail(initialData.email || '');
            setPhone(initialData.phone || '');
            setAddress(initialData.address || '');
            setPaid(initialData.Paid || false);
            setDonationDate(initialData.Donation_date || new Date().toISOString().split('T')[0]);
        } else {
            setName('');
            setAmount('');
            setEmail('');
            setPhone('');
            setAddress('');
            setPaid(false);
        }
    }, [initialData]);

    const handleStatusChange = (e) => {
        setPaid(e.target.value === 'Paid');
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        const donorData = {
            name,
            email,
            phone,
            address,
            amount: Number(amount),
            Paid,
            Donation_date
        };

        try {
            const url = FormMode === 'edit' 
                ? `/api/donation/donors/${initialData.donor_id}`
                : '/api/donation/';
                
            const response = await fetch(url, {
                method: FormMode === 'edit' ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donorData),
            });

            if (response.ok) {
                if (OnSubmit) OnSubmit(); // Call the OnSubmit function if provided
                handleClose(); // Closes the modal after submit
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to submit donor. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting donor:', error);
            alert('Network error occurred. Please check your connection and try again.');
        }
    };

    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={isopen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">
                        {FormMode === 'edit' ? 'Edit Donor' : 'Donor Details'}</h3>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit}>
                            <label className="input input-bordered mr-3 my-3 flex items-center gap-1">
                                Name
                                <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </label>

                            <label className="input input-bordered mr-4 my-3 flex items-center gap-1">
                                Email 
                                <input type="email" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </label>

                            <label className="input input-bordered mr-4 my-3 flex items-center gap-1">
                                Phone
                                <input type="tel" className="grow" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </label>

                            <label className="input input-bordered mr-3 my-3 flex items-center gap-2">
                                Address
                                <input type="text" className="grow" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                            </label>

                            <label className="input input-bordered mr-4 my-3 flex items-center gap-1">
                                Donation Date
                                <input 
                                    type="date" 
                                    className="grow" 
                                    value={Donation_date} 
                                    onChange={(e) => setDonationDate(e.target.value)}
                                    required
                                />
                            </label>

                            <div className="flex mb-4 justify-between">
                                <label className="input input-bordered mr-4 my-4 flex items-center gap-1">
                                    Amount
                                    <input type="number" className="grow" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                                </label>
                                <select value={Paid ? 'Paid' : 'Not Paid'} className="select select-bordered w-full mr-4 my-4 max-w-xs" onChange={handleStatusChange}>
                                    <option>Paid</option>
                                    <option>Not Paid</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-success">
                                {FormMode === 'edit' ? 'Save Changes': ' Add a donor'}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DonorForm;
