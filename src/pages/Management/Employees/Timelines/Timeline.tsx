import { useEffect, useState } from 'react';
import Timeline from 'react-timelines';
import 'react-timelines/lib/css/style.css';
import { buildTimebar, buildTrack } from './builders';
import { fill } from './utils';

let timebar = '';
const now = new Date();

const clickElement = (element: any) => {
  const notification = {
    position: element.title,
    start: element.start,
    end: element.end
  };

  alert(JSON.stringify(notification, null, 2));
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 50;

const currentDate = new Date();

const EmployeeTimeline = ({ data }: any) => {
  console.log('🚀 ~ file: Timeline.tsx:26 ~ EmployeeTimeline ~ data:', data);
  const [state, setState] = useState({
    open: false,
    zoom: 2,
    tracksById: {},
    tracks: []
  });

  const [employee, setEmployee] = useState<any>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data && data.join_date) {
      timebar = buildTimebar(new Date(data.join_date).getFullYear(), currentDate.getFullYear());

      setEmployee(data);
      setStart(new Date(data.join_date));
      setEnd(new Date());
      setFilteredEmployee(data.histories);

      const tracksById = fill(data.histories.length).reduce((acc: any, i: any) => {
        const track = buildTrack(data.histories[i], new Date(data.histories[i]?.join_date), currentDate, i + 1);

        acc[track.id] = track;
        return acc;
      }, {});

      setState((prevState) => ({
        ...prevState,
        tracksById,
        tracks: Object.values(tracksById)
      }));
    }
  }, [data]);

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();

    const searchTermsArray = trimmedSearchTerm.split(/\s+/);

    if (searchTermsArray[0].length > 0) {
      const dataToSearch = trimmedSearchTerm ? employee.histories : filteredEmployee;

      const filteredData = dataToSearch.filter((employee: any) => {
        const isMatch = searchTermsArray.every(
          (term) => employee?.project?.name.toLowerCase().includes(term.toLowerCase())
        );

        return isMatch;
      });

      setFilteredEmployee(filteredData);

      const tracksById = fill(filteredData.length).reduce((acc: any, i: any) => {
        const track = buildTrack(filteredData[i], new Date(data?.join_date), currentDate, i + 1);
        acc[track.id] = track;
        return acc;
      }, {});

      setState((prevState) => ({
        ...prevState,
        tracksById,
        tracks: Object.values(tracksById)
      }));
    } else {
      const tracksById = fill(data.histories.length).reduce((acc: any, i: any) => {
        const track = buildTrack(data.histories[i], new Date(data?.join_date), currentDate, i + 1);

        acc[track.id] = track;
        return acc;
      }, {});

      setState((prevState) => ({
        ...prevState,
        tracksById,
        tracks: Object.values(tracksById)
      }));
    }
  };

  const handleToggleOpen = () => {
    setState((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  const handleZoomIn = () => {
    setState((prevState) => ({
      ...prevState,
      zoom: Math.min(prevState.zoom + 2, MAX_ZOOM)
    }));
  };

  const handleZoomOut = () => {
    setState((prevState) => ({
      ...prevState,
      zoom: Math.max(prevState.zoom - 2, MIN_ZOOM)
    }));
  };

  const handleToggleTrackOpen = (track: any) => {
    setState((prevState) => {
      const tracksById = {
        ...prevState.tracksById,
        [track.id]: {
          ...track,
          isOpen: !track.isOpen
        }
      };

      return {
        ...prevState,
        tracksById,
        tracks: Object.values(tracksById)
      };
    });
  };

  const formatDate = (dateString: string) => {
    const formattedDate = new Date(dateString).toLocaleDateString('en-US');
    return formattedDate;
  };

  return (
    <div className='app'>
      {employee && start ? (
        <>
          <div className='flex items-center mb-5 mt-5 '>
            <input
              type='text'
              placeholder='Search by employee name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=' border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-primary ml-2'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <Timeline
            scale={{
              // start: start as Date,
              start: start as Date,
              end: end as Date,
              zoom: state.zoom,
              zoomMin: MIN_ZOOM,
              zoomMax: MAX_ZOOM
            }}
            toggleOpen={handleToggleOpen}
            zoomIn={handleZoomIn}
            zoomOut={handleZoomOut}
            timebar={timebar}
            tracks={state.tracks}
            now={now}
            toggleTrackOpen={handleToggleTrackOpen}
            enableSticky
            scrollToNow
            clickElement={clickElement}
          />
        </>
      ) : (
        <h1>This employee does not join any employee!</h1>
      )}
    </div>
  );
};

export default EmployeeTimeline;