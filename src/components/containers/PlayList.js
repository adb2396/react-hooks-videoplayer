import React from 'react';

import PlayListHeader from '../PlayListHeader';
import PlayListItems from './PlayListItems';
import Nightmode from '../Nightmode';

import StyledPlaylist from '../styles/StyledPlaylist';

const PlayList = ({ videos, active, nightModeCallback, nightmode }) => {

    return (
        <StyledPlaylist>
            <Nightmode 
                nightModeCallback={nightModeCallback}
                nightMode={nightmode}
            />
            <PlayListHeader 
                active={active}
                total={videos.length}
            />
            <PlayListItems 
                videos={videos}
                active={active}
            />
        </StyledPlaylist>
    );
} 

export default PlayList;