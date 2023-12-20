import CardOne from '../../components/CardOne.tsx';
import CardTwo from '../../components/CardTwo.tsx';




const Dashboard = () => {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
      </div>
    </>
  );
};

export default Dashboard;
