import { useEffect, useState } from 'react';
import Timeline from 'react-timelines';
import 'react-timelines/lib/css/style.css';
import { buildTimebar, buildTrack } from './builders';
import { NUM_OF_TRACKS } from './constants';
import { fill } from './utils';

const now = new Date();

const timebar = buildTimebar();

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
    const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
      const track = buildTrack(i + 1);
      acc[track.id] = track;
      return acc;
    }, {});

    setState((prevState) => ({
      ...prevState,
      tracksById,
      tracks: Object.values(tracksById)
    }));
  }, []);

  useEffect(() => {
    if (data && data.start_date && data.end_date) {
      setProject(data);
      setStart(new Date(data.start_date));
      setEnd(new Date(data.end_date));
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
              start: new Date("2022"),
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
          />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProjectTimeline;
