/* eslint-disable import/no-unresolved */
import { Component } from 'react';
import Timeline from 'react-timelines';

import 'react-timelines/lib/css/style.css';

import { NUM_OF_TRACKS, NUM_OF_YEARS, START_YEAR } from './constants';

import { buildTimebar, buildTrack } from './builders';

import { fill } from './utils';

const now = new Date('2024-01-01');

const timebar = buildTimebar();

const MIN_ZOOM = 2;
const MAX_ZOOM = 20;

class App extends Component {
  constructor(props) {
    super(props);

    const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
      const track = buildTrack(i + 1);
      acc[track.id] = track;
      return acc;
    }, {});
    console.log('🚀 ~ file: Timeline.tsx:29 ~ App ~ tracksById ~ tracksById:', tracksById);

    this.state = {
      open: false,
      zoom: 2,
      // eslint-disable-next-line react/no-unused-state
      tracksById,
      tracks: Object.values(tracksById)
    };
  }

  handleToggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  handleZoomIn = () => {
    this.setState(({ zoom }) => ({ zoom: Math.min(zoom + 1, MAX_ZOOM) }));
  };

  handleZoomOut = () => {
    this.setState(({ zoom }) => ({ zoom: Math.max(zoom - 1, MIN_ZOOM) }));
  };

  handleToggleTrackOpen = (track) => {
    this.setState((state) => {
      const tracksById = {
        ...state.tracksById,
        [track.id]: {
          ...track,
          isOpen: !track.isOpen
        }
      };

      return {
        tracksById,
        tracks: Object.values(tracksById)
      };
    });
  };

  render() {
    const { zoom, tracks } = this.state;
    const start = new Date(`${START_YEAR}`);
    const end = new Date(`${START_YEAR + NUM_OF_YEARS}`);
    return (
      <div className='app'>
        <h1 className='title'>React Timelines</h1>
        <Timeline
          scale={{
            start,
            end,
            zoom,
            zoomMin: MIN_ZOOM,
            zoomMax: MAX_ZOOM
          }}
          toggleOpen={this.handleToggleOpen}
          zoomIn={this.handleZoomIn}
          zoomOut={this.handleZoomOut}
          timebar={timebar}
          tracks={tracks}
          now={now}
          toggleTrackOpen={this.handleToggleTrackOpen}
          enableSticky
          scrollToNow
        />
      </div>
    );
  }
}

export default App;
