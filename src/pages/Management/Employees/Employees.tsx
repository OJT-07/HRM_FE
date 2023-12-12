import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateEmployeeModal from './Create';

const Employees = () => {
  const [visibleModalAddUpdate, setVisibleModalAddUpdate] = useState<boolean>(false);

  const handleCloseModalAddUpdate = () => {
    setVisibleModalAddUpdate(false);
  };

  const handleOpenModalAddUpdate = () => {
    setVisibleModalAddUpdate(true);
  };

  return (
    <>
      <Breadcrumb pageName='Employees' />
      <Button
        size='medium'
        type='button'
        style={{ margin: '1rem 0' }}
        variant='contained'
        startIcon={<AddIcon />}
        onClick={handleOpenModalAddUpdate}
      >
        Create new Employee
      </Button>

      {visibleModalAddUpdate && (
        <CreateEmployeeModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} initialValue={{}} />
      )}

      
    </>
  );
};

export default Employees;
