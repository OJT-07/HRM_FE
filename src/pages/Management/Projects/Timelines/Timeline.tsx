import Timeline from 'react-timelines';

import 'react-timelines/lib/css/style.css';

import { NUM_OF_TRACKS } from './constants.js';

import { buildTimebar, buildTrack } from './builders.js';

import { Component } from 'react';
import { fill } from './ultis.js';

const now = new Date(2020, 8, 1, 3, 19);

const timebar = buildTimebar();

// eslint-disable-next-line no-alert
const clickElement = (element) => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);

const MIN_ZOOM = 2;
const MAX_ZOOM = 20;

class ProjectTimeline extends Component {
  constructor(props) {
    super(props);

    const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
      const track = buildTrack(i + 1);
      acc[track.id] = track;
      return acc;
    }, {});

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
    const { open, zoom, tracks } = this.state;
    const start = new Date(2020, 3, 19, 8, 30);
    const end = new Date(2020, 9, 19, 8, 30);
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
          isOpen={open}
          toggleOpen={this.handleToggleOpen}
          zoomIn={this.handleZoomIn}
          zoomOut={this.handleZoomOut}
          clickElement={clickElement}
          clickTrackButton={(track) => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(track));
          }}
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

export default ProjectTimeline;