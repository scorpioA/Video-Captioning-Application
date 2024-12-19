import React, { useState } from "react";

const CaptionEditor = ({ captions, onCaptionsChange }) => {
  const [newCaption, setNewCaption] = useState({
    startTime: "",
    endTime: "",
    text: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCaption((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCaption = () => {
    const start = parseFloat(newCaption.startTime);
    const end = parseFloat(newCaption.endTime);

    if (isNaN(start) || isNaN(end) || start >= end) {
      alert("Please provide valid start and end times.");
      return;
    }

    if (!newCaption.text.trim()) {
      alert("Caption text cannot be empty.");
      return;
    }

    const updatedCaptions = [
      ...captions,
      {
        startTime: start,
        endTime: end,
        text: newCaption.text.trim(),
      },
    ];

    onCaptionsChange(updatedCaptions);
    setNewCaption({ startTime: "", endTime: "", text: "" });
  };

  const handleDeleteCaption = (index) => {
    const updatedCaptions = captions.filter((_, i) => i !== index);
    onCaptionsChange(updatedCaptions);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl text-black font-bold mb-4">Caption Editor</h2>

      {/*--------------------- Caption Input ----------------------*/}
      <div className="mb-6">
        <div className="flex gap-4 mb-2">
          <input
            type="number"
            name="startTime"
            placeholder="Start Time (sec)"
            value={newCaption.startTime}
            onChange={handleInputChange}
            className="w-1/3 p-2 text-black border rounded-lg shadow-sm"
          />
          <input
            type="number"
            name="endTime"
            placeholder="End Time (sec)"
            value={newCaption.endTime}
            onChange={handleInputChange}
            className="w-1/3 p-2 text-black border rounded-lg shadow-sm"
          />
          <input
            type="text"
            name="text"
            placeholder="Caption Text"
            value={newCaption.text}
            onChange={handleInputChange}
            className="w-full p-2 text-black border rounded-lg shadow-sm"
          />
        </div>
        <button
          onClick={handleAddCaption}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Caption
        </button>
      </div>

      {/*------------------------ Caption List ---------------------------*/}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-black mb-3">Current Captions</h3>
        {captions.length > 0 ? (
          <ul>
            {captions.map((caption, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b last:border-b-0"
              >
                <div>
                  <span className="text-sm text-gray-600">{caption.startTime}s - {caption.endTime}s:</span>
                  <span className="ml-2 text-gray-600">{caption.text}</span>
                </div>
                <button
                  onClick={() => handleDeleteCaption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No captions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default CaptionEditor;