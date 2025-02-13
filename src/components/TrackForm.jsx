import { useState, useEffect } from "react";

const TrackForm = ({ onTrackSaved, editingTrack, cancelEdit }) => {
  const [formData, setFormData] = useState({ title: "", artist: "" });

  
  useEffect(() => {
    if (editingTrack) {
      setFormData({ title: editingTrack.title, artist: editingTrack.artist });
    } else {
      setFormData({ title: "", artist: "" });
    }
  }, [editingTrack]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTrack) {
        
        const response = await fetch(`http://localhost:3000/tracks/${editingTrack._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedTrack = await response.json();
          onTrackSaved(updatedTrack);
        }
      } else {
        
        const response = await fetch("http://localhost:3000/tracks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newTrack = await response.json();
          onTrackSaved(newTrack);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Track Title"
        required
      />
      <input
        type="text"
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        placeholder="Artist"
        required
      />
      <button type="submit">{editingTrack ? "Update Track" : "Add Track"}</button>
      {editingTrack && <button onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default TrackForm;
