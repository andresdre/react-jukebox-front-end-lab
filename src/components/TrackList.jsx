const TrackList = ({ tracks, onEdit, onDelete, onPlay }) => {
    return (
      <ul>
        {tracks.map((track) => (
          <li key={track._id}>
            {track.title} - {track.artist}
            <button onClick={() => onEdit(track)}>Edit</button>
            <button onClick={() => onDelete(track._id)}>Delete</button>
            <button onClick={() => onPlay(track)}>Play</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TrackList;
  