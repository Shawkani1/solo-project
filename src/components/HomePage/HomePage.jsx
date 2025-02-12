import { useState } from 'react';
import useStore from '../../zustand/store'
import DonorList from '../DonorList/DonorList';
import Navbar from '../Navbar/NavBar';
import DonorForm from '../DonorForm/DonorForm';




function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  const [isopen, SetIsOpen] = useState(false);
  const [FormMode, SetFormMode] = useState('add');

  const handleopen = (mode) => {
    SetIsOpen(true);
    SetFormMode(mode);
  };

  const handleSubmit = () => {
    if (FormMode === 'add') {
      console.log('Form Mode added')
    }
    else {
      console.log('Form Mode editable')
    }
  }

  return (
    <>

      <Navbar onOpen={() => handleopen('add')} />
      <DonorList />
      <DonorForm isopen= {isopen} OnSubmit={handleSubmit}
      onClose= {() => SetIsOpen(false)}/>
      <button className="btn btn-error w-full absolute bottom-4 left-1/2 transform -translate-x-1/2" onClick={logOut}>
        Log Out
      </button>
    </>
  );
}


export default HomePage;
