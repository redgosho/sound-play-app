import React from 'react'

export const AudioPlayer: React.FC = () => {
  const url = `${process.env.PUBLIC_URL}/20210702-1745_Allial_apex.wav`
  console.log('url:', url)
  const [audio] = React.useState(new Audio(url));
  const [, _forceUpdate] = React.useState(false);
  const forceUpdate = () => _forceUpdate(prevState => !prevState);

  React.useEffect(() => {
    audio.play();
    audio.addEventListener("play", forceUpdate);
    audio.addEventListener("pause", forceUpdate);
    audio.addEventListener("ended", forceUpdate);
    audio.addEventListener("timeupdate", forceUpdate);

    return () => {
      audio.removeEventListener("play", forceUpdate);
      audio.removeEventListener("pause", forceUpdate);
      audio.removeEventListener("ended", forceUpdate);
      audio.removeEventListener("timeupdate", forceUpdate);
    };
  }, [audio]);

  const play = () => audio.play();
  const pause = () => audio.pause();
  const jump = (value:number) => (audio.currentTime += value);
  const playing = !audio.paused
  const currentTime = audio.currentTime

  return (
    <>
      <p>currenttime: {currentTime}</p>
      <button onClick={playing ? pause : play}>
        {playing ? "Pause" : "Play"}
      </button>
      <button onClick={() => jump(5)}>5sec ▶︎</button>
    </>
  )
}