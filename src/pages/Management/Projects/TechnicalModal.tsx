import { cloneDeep, debounce } from 'lodash';
import { projectTechnicalOption } from '../../../enum';
import React, { useMemo, useState } from 'react';
import { Box, BoxProps, Button, InputLabel, Modal, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

interface Props {
  visible: boolean;
  onClose: () => void;
  onFinish: (value: any) => void;
  defaultTechnicalList: any;
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

function TechnicalModal({ visible, onClose, onFinish, defaultTechnicalList, viewOnly }: Props) {
  const [filterTechnical, setFilterTechnical] = useState<any>(projectTechnicalOption);
  const [selectedTechnicalList, setSelectedTechnicalList] = useState<any>(defaultTechnicalList);

  const allTechnical = useMemo(() => {
    return projectTechnicalOption;
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleFilterListTechnical = debounce((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const lowwercaseTechnical = e.target.value?.toLowerCase();

    if (!lowwercaseTechnical) {
      setFilterTechnical(allTechnical);
    } else {
      const newFilterTechnical = cloneDeep(allTechnical).filter((tech: any) => {
        return tech.label.toLowerCase().includes(lowwercaseTechnical);
      });
      setFilterTechnical(newFilterTechnical);
    }
  }, 800);

  const checkExistInSelectedList = (technicalValue: any) => {
    return selectedTechnicalList.some((technical: any) => technical.value === technicalValue);
  };

  const handleToogleTechnical = (technical: any) => {
    const isExist = checkExistInSelectedList(technical?.value || '');

    if (!isExist) {
      const newSelectedTechnicalList = cloneDeep(selectedTechnicalList);
      newSelectedTechnicalList.push(technical);
      setSelectedTechnicalList(newSelectedTechnicalList);
    } else {
      const indexTechnical = selectedTechnicalList.findIndex((tech: any) => tech.value === technical.value);
      const newSelectedTechnicalList = cloneDeep(selectedTechnicalList).toSpliced(indexTechnical, 1);
      setSelectedTechnicalList(newSelectedTechnicalList);
    }
  };

  const handleApplyTechnical = () => {
    onFinish(selectedTechnicalList);
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <Box sx={{ ...style }}>
        {!viewOnly ? (
          <Box sx={{ width: '100%' }}>
            <Box>
              <InputLabel>Search</InputLabel>
              <OutlinedInput fullWidth onChange={handleFilterListTechnical} placeholder='Search....' />
            </Box>

            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', margin: '1rem 0' }}>
              {filterTechnical.map((technical: any) => (
                <Item
                  isExisted={checkExistInSelectedList(technical.value)}
                  onClick={() => handleToogleTechnical(technical)}
                >
                  {technical.label}
                </Item>
              ))}
            </Box>

            <Button
              size='medium'
              type='button'
              style={{ margin: '1rem auto', display: 'flex', justifyContent: 'center' }}
              variant='contained'
              color='primary'
              onClick={handleApplyTechnical}
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
              Technical Info
            </Typography>
            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', margin: '1rem 0' }}>
              {selectedTechnicalList.map((technical: any) => (
                <Item isExisted={checkExistInSelectedList(technical.value)}>{technical.label}</Item>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default TechnicalModal;
