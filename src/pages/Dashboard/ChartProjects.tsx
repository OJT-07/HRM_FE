import CardFour from '../../components/molecules/Card/CardFour.tsx';
import CardOne from '../../components/molecules/Card/CardOne.tsx';
import CardThree from '../../components/molecules/Card/CardThree.tsx';
import CardTwo from '../../components/molecules/Card/CardTwo.tsx';
import ChartOne from '../../components/molecules/Chart/ChartOne.tsx';
import ChartThree from '../../components/molecules/Chart/ChartThree.tsx';
import ChartTwo from '../../components/molecules/Chart/ChartTwo.tsx';
import ChatCard from '../../components/molecules/Chart/ChatCard.tsx';
import MapOne from '../../components/molecules/Chart/MapOne.tsx';
import TableOne from '../../components/molecules/Table/TableOne.tsx';

const ChartProjects = () => {
  return (
    <>
      <h1>Chart Projects</h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ChartProjects;
