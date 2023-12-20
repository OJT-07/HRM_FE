export const formatStatus = (status: string) => {
    switch (status) {
      case 'done':
        return 'Done';
      case 'in progress':
        return 'In Progress';
      case 'active':
        return 'Active';
      default:
        return 'Active';
    }
  };