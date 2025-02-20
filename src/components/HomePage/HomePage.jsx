import { useState } from 'react';
import DonorList from '../DonorList/DonorList';
import Navbar from '../Navbar/NavBar';
import DonorForm from '../DonorForm/DonorForm';
import './HomePage.css';

function HomePage() {
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
      
      <div className="content-wrapper">
        <DonorList
          handleOpen={handleOpen}
          refreshTrigger={refreshList}
        />
      </div>
      
      <DonorForm
        isopen={isopen}
        onClose={handleClose}
        OnSubmit={handleSubmit}
        FormMode={formMode}
        initialData={selectedDonor}
      />
    </div>
  );
}

export default HomePage;
