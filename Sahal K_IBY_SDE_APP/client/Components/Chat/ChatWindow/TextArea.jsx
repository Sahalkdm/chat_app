import React, { useState, useRef, useEffect } from 'react';

const AutoResizeTextarea = ({ maxRows, handleText, val }) => {
  const [value, setValue] = useState('');
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = 1; // reset number of rows in textarea 

    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setValue(event.target.value);
    setRows(currentRows < maxRows ? currentRows : maxRows);

    handleText(event.target.value);

  };

  return (
    <textarea
      ref={textareaRef}
      rows={rows}
      value={val}
      placeholder="Type here..."
      className="textarea w-full text-lg focus:outline-none"
      onChange={handleChange}
    />
  );
};

export default AutoResizeTextarea;
