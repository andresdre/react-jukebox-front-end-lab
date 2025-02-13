import { useState, useEffect } from "react";
import TrackList from "./components/TrackList";
import TrackForm from "./components/TrackForm";
import NowPlaying from "./components/NowPlaying";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null); // New state for NowPlaying

  useEffect(() => {
    fetch("http://localhost:3000/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error("Error fetching tracks:", err));
  }, []);

  const handleTrackSaved = (track) => {
    if (editingTrack) {
      setTracks(tracks.map((t) => (t._id === track._id ? track : t)));
    } else {
      setTracks([...tracks, track]);
    }
    setShowForm(false);
    setEditingTrack(null);
  };

  const handleEdit = (track) => {
    setEditingTrack(track);
    setShowForm(true);
  };

  const handleDelete = async (trackId) => {
    try {
      const response = await fetch(`http://localhost:3000/tracks/${trackId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTracks(tracks.filter((track) => track._id !== trackId));
      } else {
        console.error("Failed to delete track");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePlay = (track) => {
    setPlayingTrack(track);
  };

  return (
    <div>
      <button onClick={() => { setShowForm(true); setEditingTrack(null); }}>
        {showForm ? "Cancel" : "Add New Track"}
      </button>

      {showForm && <TrackForm onTrackSaved={handleTrackSaved} editingTrack={editingTrack} cancelEdit={() => setShowForm(false)} />}

      <TrackList tracks={tracks} onEdit={handleEdit} onDelete={handleDelete} onPlay={handlePlay} />

      <NowPlaying track={playingTrack} />
    </div>
  );
};

export default App;
