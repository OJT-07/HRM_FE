export const formatStatus = (status: string) => {
  switch (status) {
    case 'done':
      return 'Done';
    case 'active':
      return 'Active';
    case 'pending':
      return 'Pending';
    default:
      return 'Pending';
  }
};