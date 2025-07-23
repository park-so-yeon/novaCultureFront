import React, { useState } from 'react';

function SemesterRegister() {
  const [form, setForm] = useState({
    semesterName: '',
    semesterDuration: '',
    targetAudience: '',
    applicationPeriod: '',
    discountPeriod: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert('Semester registered!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Semester Name:</label>
        <input
          type="text"
          name="semesterName"
          value={form.semesterName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Semester Duration:</label>
        <input
          type="text"
          name="semesterDuration"
          value={form.semesterDuration}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Target Audience:</label>
        <input
          type="text"
          name="targetAudience"
          value={form.targetAudience}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Application Period:</label>
        <input
          type="text"
          name="applicationPeriod"
          value={form.applicationPeriod}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Discount Period:</label>
        <input
          type="text"
          name="discountPeriod"
          value={form.discountPeriod}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register Semester</button>
    </form>
  );
}

export default SemesterRegister;