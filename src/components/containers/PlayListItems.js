import React from 'react';
import PlayListItem from '../PlayListItem';
import withLink from '../hoc/withLink';
import StyledPlaylistitems from '../styles/StyledPlaylistitems';

const PlayListItemWithLink = withLink(PlayListItem);

const PlayListItems = ({ videos, active }) => {

    return (
        <StyledPlaylistitems>
            {videos.map((video) => {
                return (
                    <PlayListItemWithLink 
                        key={ video.id }
                        video={video}
                        active={video.is === active.id ? true : false}
                        played={video.played}
                    />
                );
            })}
        </StyledPlaylistitems>
    );
} 

export default PlayListItems;