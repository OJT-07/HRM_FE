import { useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import CreateProjectModal from './Create'

const Projects = () => {
  const [visibleModalAddUpdate, setVisibleModalAddUpdate] = useState<boolean>(false)

  const handleCloseModalAddUpdate = () => {
    setVisibleModalAddUpdate(false)
  }

  const handleOpenModalAddUpdate = () => {
    setVisibleModalAddUpdate(true)
  }

  return (
    <>
      <Breadcrumb pageName='Projects' />
      <Button
        size='medium'
        type='button'
        style={{ margin: '1rem 0' }}
        variant='contained'
        startIcon={<AddIcon />}
        onClick={handleOpenModalAddUpdate}
      >
        Create new Project
      </Button>

      {visibleModalAddUpdate && <CreateProjectModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />}
    </>
  )
}

export default Projects
