import { useState } from 'react';
import useStore from '../../zustand/store';
import DonorList from '../DonorList/DonorList';
import Navbar from '../Navbar/NavBar';
import DonorForm from '../DonorForm/DonorForm';

function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  const [isopen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleOpen = (mode, donor = null) => {
    setFormMode(mode);
    setSelectedDonor(donor);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedDonor(null);
  };

  const handleSubmit = async () => {
    // Trigger refresh of donor list
    setRefreshList(prev => !prev);
  };

  return (
    <div className="min-h-screen pb-16 relative">
      <Navbar onOpen={() => handleOpen('add')} />
      
      <DonorList
        handleOpen={handleOpen}
        refreshTrigger={refreshList}
      />
      
      <DonorForm
        isopen={isopen}
        onClose={handleClose}
        OnSubmit={handleSubmit}
        FormMode={formMode}
        initialData={selectedDonor}
      />

      <button 
        className="btn btn-error w-full max-w-md absolute bottom-4 left-1/2 transform -translate-x-1/2" 
        onClick={logOut}
      >
        Log Out
      </button>
    </div>
  );
}

export default HomePage;
