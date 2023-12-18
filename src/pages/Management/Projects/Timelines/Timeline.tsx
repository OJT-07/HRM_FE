import { useEffect, useState } from 'react';
import Timeline from 'react-timelines';
import 'react-timelines/lib/css/style.css';
import { buildTimebar, buildTrack } from './builders';
import { fill } from './utils';

let timebar;
const now = new Date();

const clickElement = (element: any) => {
  const notification = {
    position: element.title,
    start: element.start,
    end: element.end
  };

  alert(JSON.stringify(notification, null, 2));
};

const MIN_ZOOM = 2;
const MAX_ZOOM = 20;

const ProjectTimeline = ({ data }: any) => {
  const [state, setState] = useState({
    open: false,
    zoom: 2,
    tracksById: {},
    tracks: []
  });

  const [project, setProject] = useState<any>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  useEffect(() => {
    if (data && data.start_date && data.end_date) {
      timebar = buildTimebar(new Date(data.start_date).getFullYear(), new Date(data.end_date).getFullYear());

      setProject(data);
      setStart(new Date(data.start_date));
      setEnd(new Date(data.end_date));

      const tracksById = fill(data.employeesInProject.length).reduce((acc, i) => {
        const track = buildTrack(data.employeesInProject[i], data.start_date, data.end_date, i + 1);

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

  const handleToggleOpen = () => {
    setState((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  const handleZoomIn = () => {
    setState((prevState) => ({
      ...prevState,
      zoom: Math.min(prevState.zoom + 1, MAX_ZOOM)
    }));
  };

  const handleZoomOut = () => {
    setState((prevState) => ({
      ...prevState,
      zoom: Math.max(prevState.zoom - 1, MIN_ZOOM)
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

  return (
    <div className='app'>
      {project && start && end ? (
        <>
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
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProjectTimeline;
