import Breadcrumb from '../components/molecules/Breadcrumb/Breadcrumb.tsx';
import ChartFour from '../components/molecules/Chart/ChartFour.tsx';
import ChartOne from '../components/molecules/Chart/ChartOne.tsx';
import ChartThree from '../components/molecules/Chart/ChartThree.tsx';
import ChartTwo from '../components/molecules/Chart/ChartTwo.tsx';

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName='Chart' />

      <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5'>
        <div className='col-span-12'>
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
