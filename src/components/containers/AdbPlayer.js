import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Video from '../Video';
import PlayList from './PlayList';
import StyeledAdbPlayer from '../styles/StyledAdbPlayer';

const theme = {
    bgcolor: "#353535",
    bgcolorItem: "#414141",
    bgcolorItemActive: "#455c63",
    bgcolorPlayed: "#526d4e",
    border: "none",
    borderPlayer: "none",
    color: "#fff"
}

const themeLight = {
    bgcolor: "#fff",
    bgcolorItem: "#fff",
    bgcolorItemActive: "#8017b1",
    bgcolorPlayed: "#7d9979",
    border: "1px solid #353535",
    borderPlayer: "none",
    color: "#353535"
}

const AdbPlayer = ({ match, history, location }) => {

    const videos = JSON.parse(document.querySelector('[name="videos"]').value);
    const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`));
    
    const [state, setState] = useState({
        videos: savedState ? savedState.videos : videos.playlist,
        activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
        nightMode: savedState ? savedState.nightMode : true,
        playlistId: savedState ? savedState.playlistId : videos.playlistId,
        autoplay: false
    });

    useEffect(
        () => {
            localStorage.setItem(`${state.playlistId}`, JSON.stringify({...state}));
        },
        [state]
    );

    useEffect(() => {
        const videoId = match.params.activeVideo;
        if( videoId !== undefined) {
            const newActiveVideo = state.videos.findIndex(
                video => video.id === videoId
            );
            setState(prevState => ({
                ...prevState,
                activeVideo: prevState.videos[newActiveVideo],
                autoplay: location.autoplay
            }));
        } else {
            history.push({
                pathname: `/${state.activeVideo.id}`,
                autoplay: false
            })
        }
    }, [history, 
        location.autoplay, 
        match.params.activeVideo, 
        state.activeVideo.id,
        state.videos
    ])

    const nightModeCallback = () => {
        setState({ ...state, nightMode: !state.nightMode });
    }

    const endCallback = () => {
        const videoId = match.params.activeVideo;
        const currentVideoIndex = state.videos.findIndex(
            video => video.id === videoId
        );

        const nextVideo = currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex+1 ;

        history.push({
            pathname: `${state.videos[nextVideo].id}`,
            autoplay: false
        })
    }

    const progressCallback = (e) => {
        if(e.playedSeconds > 10 && e.playedSeconds < 11) {
            setState({
                ...state,
                videos: state.videos.map(video => {
                    return video.id === state.activeVideo.id
                    ? { ...video, played: true } : video
                })
            })
        }
    }

    return (
        <ThemeProvider theme={state.nightMode ? theme : themeLight}>
            { StaticRange.videos !== null ? (
                <StyeledAdbPlayer>
                    <Video 
                        active={state.activeVideo}
                        autoplay={state.autoplay}
                        endcallback={endCallback}
                        progresscallback={progressCallback}
                    />
                    <PlayList 
                        videos={state.videos}
                        active={state.activeVideo}
                        nightModeCallback={nightModeCallback}
                        nightmode={state.nightMode}
                    />
                </StyeledAdbPlayer>
            ): null}
        </ThemeProvider>
    );
}



export default AdbPlayer;