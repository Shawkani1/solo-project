import { useState } from 'react';
import useStore from '../../zustand/store';
import DonorList from '../DonorList/DonorList';
import Navbar from '../Navbar/NavBar';
import DonorForm from '../DonorForm/DonorForm';
import './HomePage.css';

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
    <div className="home-container">
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
        className="logout-button" 
        onClick={logOut}
      >
        Log Out
      </button>
    </div>
  );
}

export default HomePage;
