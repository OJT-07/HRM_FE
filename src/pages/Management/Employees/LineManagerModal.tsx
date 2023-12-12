import { cloneDeep, debounce } from 'lodash';
import { projectMemberOption } from '../../../enum';
import React, { useMemo, useState } from 'react';
import { Box, BoxProps, Button, InputLabel, Modal, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

interface Props {
  visible: boolean;
  onClose: () => void;
  onFinish: (value: any) => void;
  defaultLineManagerList: any;
  viewOnly?: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  zIndex: 21
};

function Item(props: BoxProps & { isExisted: boolean }) {
  const { sx, isExisted, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        bgcolor: isExisted ? 'rgb(25, 118, 210)' : 'grey.100',
        // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        color: isExisted ? 'white' : 'grey.800',
        border: '1px solid',
        // borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderColor: 'rgb(25, 118, 210)',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        cursor: 'pointer',
        ...sx
      }}
      {...other}
    />
  );
}

function LineManagerModal({ visible, onClose, onFinish, defaultLineManagerList, viewOnly }: Props) {
  const [filterLineManager, setFilterLineManager] = useState<any>(projectMemberOption);
  const [selectedLineManagerList, setSelectedLineManagerList] = useState<any>(defaultLineManagerList);

  const allLineManager = useMemo(() => {
    return projectMemberOption;
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleFilterListLineManager = debounce((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const lowwercaseLineManager = e.target.value?.toLowerCase();

    if (!lowwercaseLineManager) {
      setFilterLineManager(allLineManager);
    } else {
      const newFilterLineManager = cloneDeep(allLineManager).filter((manager: any) => {
        return manager.label.toLowerCase().includes(lowwercaseLineManager);
      });
      setFilterLineManager(newFilterLineManager);
    }
  }, 800);

  const checkExistInSelectedList = (LineManagerValue: any) => {
    return selectedLineManagerList.some((LineManager: any) => LineManager.value === LineManagerValue);
  };

  const handleToogleLineManager = (LineManager: any) => {
    const isExist = checkExistInSelectedList(LineManager?.value || '');

    if (!isExist) {
      const newSelectedLineManagerList = cloneDeep(selectedLineManagerList);
      newSelectedLineManagerList.push(LineManager);
      setSelectedLineManagerList(newSelectedLineManagerList);
    } else {
      const indexLineManager = selectedLineManagerList.findIndex((manager: any) => manager.value === LineManager.value);
      const newSelectedLineManagerList = cloneDeep(selectedLineManagerList).toSpliced(indexLineManager, 1);
      setSelectedLineManagerList(newSelectedLineManagerList);
    }
  };

  const handleApplyLineManager = () => {
    onFinish(selectedLineManagerList);
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <Box sx={{ ...style }}>
        {!viewOnly ? (
          <Box sx={{ width: '100%' }}>
            <Box>
              <InputLabel>Search</InputLabel>
              <OutlinedInput fullWidth onChange={handleFilterListLineManager} placeholder='Search....' />
            </Box>

            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', margin: '1rem 0' }}>
              {filterLineManager.map((LineManager: any) => (
                <Item
                  isExisted={checkExistInSelectedList(LineManager.value)}
                  onClick={() => handleToogleLineManager(LineManager)}
                >
                  {LineManager.label}
                </Item>
              ))}
            </Box>

            <Button
              size='medium'
              type='button'
              style={{ margin: '1rem auto', display: 'flex', justifyContent: 'center' }}
              variant='contained'
              color='primary'
              onClick={handleApplyLineManager}
            >
              Apply
            </Button>
          </Box>
        ) : (
          <>
            <Typography
              id='modal-modal-title'
              variant='h5'
              component='h2'
              sx={{ textAlign: 'center', fontWeight: 'bold' }}
            >
              Line manager Info
            </Typography>
            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', margin: '1rem 0' }}>
              {selectedLineManagerList.map((LineManager: any) => (
                <Item isExisted={checkExistInSelectedList(LineManager.value)}>{LineManager.label}</Item>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default LineManagerModal;
