import Breadcrumb from '../components/molecules/Breadcrumb/Breadcrumb';
import TableOne from '../components/molecules/Table/TableOne';
import TableThree from '../components/molecules/Table/TableThree';
import TableTwo from '../components/molecules/Table/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName='Tables' />

      <div className='flex flex-col gap-10'>
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
