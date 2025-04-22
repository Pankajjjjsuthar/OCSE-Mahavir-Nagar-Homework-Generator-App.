import React from 'react';
import { useState } from "react";

export default function App() {
  const [classes, setClasses] = useState([{ class: "", subject: "", points: [""] }]);
  const [finalMessage, setFinalMessage] = useState("");

  const updateClass = (index, field, value) => {
    const newClasses = [...classes];
    newClasses[index][field] = value;
    setClasses(newClasses);
  };

  const updatePoint = (classIndex, pointIndex, value) => {
    const newClasses = [...classes];
    newClasses[classIndex].points[pointIndex] = value;
    setClasses(newClasses);
  };

  const addPoint = (classIndex) => {
    const newClasses = [...classes];
    newClasses[classIndex].points.push("");
    setClasses(newClasses);
  };

  const addClass = () => {
    setClasses([...classes, { class: "", subject: "", points: [""] }]);
  };

  const generateMessage = () => {
    let message = "";
    classes.forEach((cls) => {
      message += `\nClass ${cls.class} ${cls.subject} : Answer the following questions in your notebook as your homework.\n\n`;
      cls.points.forEach((pt, j) => {
        message += `${j + 1}. ${pt}\n`;
      });
      message += `\n`;
    });
    setFinalMessage(message.trim());
  };

  return (
    <div className="min-h-screen bg-violet-100 p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-violet-800">OCSE MN, Jaipur Homework Message Generator</h1>

      {classes.map((cls, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4 space-y-2">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Class (e.g. 10th)"
            value={cls.class}
            onChange={(e) => updateClass(i, "class", e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Subject (e.g. Physics)"
            value={cls.subject}
            onChange={(e) => updateClass(i, "subject", e.target.value)}
          />

          {cls.points.map((pt, j) => (
            <textarea
              key={j}
              className="w-full p-2 border rounded"
              placeholder={`Point ${j + 1}`}
              value={pt}
              onChange={(e) => updatePoint(i, j, e.target.value)}
            />
          ))}

          <button
            className="text-sm text-violet-700 underline"
            onClick={() => addPoint(i)}
          >
            + Add More Points
          </button>
        </div>
      ))}

      <div className="flex justify-between gap-2">
        <button className="bg-violet-700 text-white px-4 py-2 rounded" onClick={addClass}>
          + Add Class
        </button>
        <button className="bg-violet-600 text-white px-4 py-2 rounded" onClick={generateMessage}>
          Generate Message
        </button>
      </div>

      {finalMessage && (
        <div className="bg-white p-4 rounded-xl shadow space-y-2">
          <h2 className="text-violet-800 font-semibold">Final Message</h2>
          <textarea
            readOnly
            className="w-full p-2 border rounded bg-violet-50"
            rows={10}
            value={finalMessage}
          />
          <button
            className="bg-violet-700 text-white px-4 py-2 rounded"
            onClick={() => {
              navigator.clipboard.writeText(finalMessage);
              alert("Message copied to clipboard!");
            }}
          >
            Copy Message
          </button>
        </div>
      )}
    </div>
  );
}
