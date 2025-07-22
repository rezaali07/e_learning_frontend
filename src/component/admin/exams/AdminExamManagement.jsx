import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";
import "./AdminExamManagement.css";

const AdminExamManagement = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [levels, setLevels] = useState([]);
  const [sources, setSources] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [exams, setExams] = useState([]);
  const [routines, setRoutines] = useState([]);

  const [newLevel, setNewLevel] = useState("");
  const [editLevelId, setEditLevelId] = useState(null);
  const [editLevelName, setEditLevelName] = useState("");

  const [newSource, setNewSource] = useState("");
  const [editSourceId, setEditSourceId] = useState(null);
  const [editSourceName, setEditSourceName] = useState("");

  const [newProgram, setNewProgram] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [editProgramId, setEditProgramId] = useState(null);
  const [editProgramName, setEditProgramName] = useState("");
  const [editProgramLevel, setEditProgramLevel] = useState("");
  const [editProgramSource, setEditProgramSource] = useState("");

  const [newSemesterProgram, setNewSemesterProgram] = useState("");
  const [newSemesterNumber, setNewSemesterNumber] = useState("");
  const [newSemesterName, setNewSemesterName] = useState("");
  const [editSemesterId, setEditSemesterId] = useState(null);
  const [editSemesterProgram, setEditSemesterProgram] = useState("");
  const [editSemesterNumber, setEditSemesterNumber] = useState("");
  const [editSemesterName, setEditSemesterName] = useState("");

  const [newExamTitle, setNewExamTitle] = useState("");
  const [newExamType, setNewExamType] = useState("");
  const [newExamLevel, setNewExamLevel] = useState("");
  const [newExamSource, setNewExamSource] = useState("");
  const [newExamProgram, setNewExamProgram] = useState("");
  const [newExamSemester, setNewExamSemester] = useState("");
  const [newExamDate, setNewExamDate] = useState("");
  const [newExamRoutinePdfUrl, setNewExamRoutinePdfUrl] = useState("");
  const [newExamNoticePdfUrl, setNewExamNoticePdfUrl] = useState("");
  const [newExamStatus, setNewExamStatus] = useState("upcoming");
  const [editExamId, setEditExamId] = useState(null);
  const [editExamTitle, setEditExamTitle] = useState("");
  const [editExamType, setEditExamType] = useState("");
  const [editExamLevel, setEditExamLevel] = useState("");
  const [editExamSource, setEditExamSource] = useState("");
  const [editExamProgram, setEditExamProgram] = useState("");
  const [editExamSemester, setEditExamSemester] = useState("");
  const [editExamDate, setEditExamDate] = useState("");
  const [editExamStatus, setEditExamStatus] = useState("");

  const [newExamOfficialImage, setNewExamOfficialImage] = useState(null);
  const [newExamNoticeImage, setNewExamNoticeImage] = useState(null);
  const [editExamOfficialImage, setEditExamOfficialImage] = useState(null);
  const [editExamNoticeImage, setEditExamNoticeImage] = useState(null);

  const [newRoutineExam, setNewRoutineExam] = useState("");
  const [newRoutineSubject, setNewRoutineSubject] = useState("");
  const [newRoutineDate, setNewRoutineDate] = useState("");
  const [newRoutineTime, setNewRoutineTime] = useState("");
  const [newRoutineVenue, setNewRoutineVenue] = useState("");
  const [editRoutineId, setEditRoutineId] = useState(null);
  const [editRoutineExam, setEditRoutineExam] = useState("");
  const [editRoutineSubject, setEditRoutineSubject] = useState("");
  const [editRoutineDate, setEditRoutineDate] = useState("");
  const [editRoutineTime, setEditRoutineTime] = useState("");
  const [editRoutineVenue, setEditRoutineVenue] = useState("");



  const [newRoutineOfficialImage, setNewRoutineOfficialImage] = useState(null);
  const [newRoutineExamNoticeImage, setNewRoutineExamNoticeImage] = useState(null);
  const [editRoutineOfficialImage, setEditRoutineOfficialImage] = useState(null);
  const [editRoutineExamNoticeImage, setEditRoutineExamNoticeImage] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [lvl, src, prog, sem, ex, rou] = await Promise.all([
        axios.get("/api/admin/exams/levels"),
        axios.get("/api/admin/exams/universities"),
        axios.get("/api/admin/exams/programs"),
        axios.get("/api/admin/exams/semesters"),
        axios.get("/api/admin/exams/exams"),
        axios.get("/api/admin/exams/exam-routines"),
      ]);
      setLevels(lvl.data.levels || lvl.data);
      setSources(src.data.sources || src.data);
      setPrograms(prog.data.programs || prog.data);
      setSemesters(sem.data.semesters || sem.data);
      setExams(ex.data.exams || ex.data);
      setRoutines(rou.data.routines || rou.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddLevel = async () => {
    if (!newLevel.trim()) return;
    try {
      await axios.post("/api/admin/exams/levels", { name: newLevel });
      setNewLevel("");
      fetchAll();
    } catch (error) {
      console.error("Failed to add level:", error);
    }
  };

  const handleDeleteLevel = async (id) => {
    try {
      await axios.delete(`/api/admin/exams/levels/${id}`);
      fetchAll();
    } catch (error) {
      console.error("Failed to delete level:", error);
    }
  };

  const handleEditLevel = async () => {
    try {
      await axios.put(`/api/admin/exams/levels/${editLevelId}`, { name: editLevelName });
      setEditLevelId(null);
      setEditLevelName("");
      fetchAll();
    } catch (error) {
      console.error("Failed to edit level:", error);
    }
  };

  const handleAddSource = async () => {
    if (!newSource.trim()) return;
    try {
      await axios.post("/api/admin/exams/universities", { name: newSource });
      setNewSource("");
      fetchAll();
    } catch (error) {
      console.error("Failed to add source:", error);
    }
  };

  const handleDeleteSource = async (id) => {
    try {
      await axios.delete(`/api/admin/exams/universities/${id}`);
      fetchAll();
    } catch (error) {
      console.error("Failed to delete source:", error);
    }
  };

  const handleEditSource = async () => {
    try {
      await axios.put(`/api/admin/exams/universities/${editSourceId}`, { name: editSourceName });
      setEditSourceId(null);
      setEditSourceName("");
      fetchAll();
    } catch (error) {
      console.error("Failed to edit source:", error);
    }
  };

  const handleAddProgram = async () => {
    if (!newProgram.trim() || !selectedLevel || !selectedSource) return;
    try {
      await axios.post("/api/admin/exams/programs", {
        name: newProgram,
        level: selectedLevel,
        source: selectedSource,
      });
      setNewProgram("");
      setSelectedLevel("");
      setSelectedSource("");
      fetchAll();
    } catch (error) {
      console.error("Failed to add program:", error);
    }
  };

  const handleDeleteProgram = async (id) => {
    try {
      await axios.delete(`/api/admin/exams/programs/${id}`);
      fetchAll();
    } catch (error) {
      console.error("Failed to delete program:", error);
    }
  };

  const handleEditProgram = async () => {
    try {
      await axios.put(`/api/admin/exams/programs/${editProgramId}`, {
        name: editProgramName,
        level: editProgramLevel,
        source: editProgramSource,
      });
      setEditProgramId(null);
      setEditProgramName("");
      setEditProgramLevel("");
      setEditProgramSource("");
      fetchAll();
    } catch (error) {
      console.error("Failed to edit program:", error);
    }
  };

  const handleAddSemester = async () => {
    if (!newSemesterProgram || !newSemesterNumber || !newSemesterName) return;
    try {
      await axios.post("/api/admin/exams/semesters", {
        program: newSemesterProgram,
        number: newSemesterNumber,
        name: newSemesterName,
      });
      setNewSemesterProgram("");
      setNewSemesterNumber("");
      setNewSemesterName("");
      fetchAll();
    } catch (error) {
      console.error("Failed to add semester:", error);
    }
  };

  const handleDeleteSemester = async (id) => {
    try {
      await axios.delete(`/api/admin/exams/semesters/${id}`);
      fetchAll();
    } catch (error) {
      console.error("Failed to delete semester:", error);
    }
  };

  const handleEditSemester = async () => {
    try {
      await axios.put(`/api/admin/exams/semesters/${editSemesterId}`, {
        program: editSemesterProgram,
        number: editSemesterNumber,
        name: editSemesterName,
      });
      setEditSemesterId(null);
      setEditSemesterProgram("");
      setEditSemesterNumber("");
      setEditSemesterName("");
      fetchAll();
    } catch (error) {
      console.error("Failed to edit semester:", error);
    }
  };

  const handleAddExam = async () => {
    if (!newExamTitle || !newExamType || !newExamLevel || !newExamSource || !newExamDate) return;
    try {
      const formData = new FormData();
      formData.append("title", newExamTitle);
      formData.append("type", newExamType);
      formData.append("level", newExamLevel);
      formData.append("source", newExamSource);
      formData.append("program", newExamProgram);
      formData.append("semester", newExamSemester);
      formData.append("examDate", newExamDate);
      formData.append("status", newExamStatus);
      if (newExamOfficialImage) {
        formData.append("officialRoutineImage", newExamOfficialImage);
      }
      if (newExamNoticeImage) {
        formData.append("examNoticeImage", newExamNoticeImage);
      }
      const response = await axios.post("/api/admin/exams/exams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        // Image uploaded successfully, proceed with the rest of the form submission
        setNewExamTitle("");
        setNewExamType("");
        setNewExamLevel("");
        setNewExamSource("");
        setNewExamProgram("");
        setNewExamSemester("");
        setNewExamDate("");
        setNewExamOfficialImage(null);
        setNewExamNoticeImage(null);
        setNewExamStatus("upcoming");
        fetchAll();
      } else {
        // Handle error
        console.error("Error uploading image");
      }
    } catch (error) {
      console.error("Failed to add exam:", error);
    }
  };
  const handleDeleteExam = async (id) => {
    try {
      await axios.delete(`/api/admin/exams/exams/${id}`);
      fetchAll();
    } catch (error) {
      console.error("Failed to delete exam:", error);
    }
  };

  const handleEditExam = async () => {
    try {
      await axios.put(`/api/admin/exams/exams/${editExamId}`, {
        title: editExamTitle,
        type: editExamType,
        level: editExamLevel,
        source: editExamSource,
        program: editExamProgram,
        semester: editExamSemester,
        examDate: editExamDate,
        status: editExamStatus,
      });
      setEditExamId(null);
      setEditExamTitle("");
      setEditExamType("");
      setEditExamLevel("");
      setEditExamSource("");
      setEditExamProgram("");
      setEditExamSemester("");
      setEditExamDate("");
      setEditExamStatus("");
      fetchAll();
    } catch (error) {
      console.error("Failed to edit exam:", error);
    }
  };


  const handleAddRoutine = async () => {
    if (!newRoutineExam || !newRoutineSubject || !newRoutineDate || !newRoutineTime) return;
    try {
      const formData = new FormData();
      formData.append("exam", newRoutineExam);
      formData.append("subject", newRoutineSubject);
      formData.append("date", new Date(newRoutineDate).toISOString());
      formData.append("time", newRoutineTime);
      formData.append("venue", newRoutineVenue);
      if (newRoutineOfficialImage) {
        formData.append("officialRoutineImage", newRoutineOfficialImage);
      }
      if (newRoutineExamNoticeImage) {
        formData.append("examNoticeImage", newRoutineExamNoticeImage);
      }
      await axios.post("/api/admin/exams/exam-routines", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewRoutineExam("");
      setNewRoutineSubject("");
      setNewRoutineDate("");
      setNewRoutineTime("");
      setNewRoutineVenue("");
      setNewRoutineOfficialImage(null);
      setNewRoutineExamNoticeImage(null);
      fetchAll();
    } catch (error) {
      console.error("Failed to add routine:", error);
    }
  };

  const handleDeleteRoutine = async (id) => {
    try {
      await axios.delete(`/api/admin/exams/exam-routines/${id}`);
      fetchAll();
    } catch (error) {
      console.error("Failed to delete routine:", error);
    }
  };


  const handleEditRoutine = async () => {
    if (!editRoutineId) return;

    try {
      const formData = new FormData();
      formData.append("exam", editRoutineExam);
      formData.append("subject", editRoutineSubject);
      formData.append("date", new Date(editRoutineDate).toISOString());
      formData.append("time", editRoutineTime);
      formData.append("venue", editRoutineVenue);

      // Only append files if user selected new ones
      if (editRoutineOfficialImage) {
        formData.append("officialRoutineImage", editRoutineOfficialImage);
      }
      if (editRoutineExamNoticeImage) {
        formData.append("examNoticeImage", editRoutineExamNoticeImage);
      }

      await axios.put(`/api/admin/exams/exam-routines/${editRoutineId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEditRoutineId(null);
      setEditRoutineExam("");
      setEditRoutineSubject("");
      setEditRoutineDate("");
      setEditRoutineTime("");
      setEditRoutineVenue("");
      setEditRoutineOfficialImage(null);
      setEditRoutineExamNoticeImage(null);
      fetchAll();
    } catch (error) {
      console.error("Failed to edit routine:", error);
    }
  };

  return (
    <div className="admin-exam-container">
      <Sidebar />
      <div className="admin-exam-content">
        <h2 className="admin-exam-title">Exam Management</h2>

        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
          <Tab label="Levels" />
          <Tab label="Sources" />
          <Tab label="Programs" />
          <Tab label="Semesters" />
          <Tab label="Exams" />
          <Tab label="Routines" />
        </Tabs>

        {tabIndex === 0 && (
          <div className="tab-section">
            <h3 className="section-title">Levels</h3>
            <div className="form-inline">
              <input
                type="text"
                placeholder="Add new level"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
              />
              <button onClick={handleAddLevel}>Add</button>
            </div>
            <ul className="item-list">
              {levels.map((lvl) => (
                <li key={lvl._id} className="item-row">
                  {editLevelId === lvl._id ? (
                    <>
                      <input
                        type="text"
                        value={editLevelName}
                        onChange={(e) => setEditLevelName(e.target.value)}
                      />
                      <button onClick={handleEditLevel}>Save</button>
                      <button onClick={() => setEditLevelId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {lvl.name}
                      <div>
                        <button onClick={() => {
                          setEditLevelId(lvl._id);
                          setEditLevelName(lvl.name);
                        }}>Edit</button>
                        <button onClick={() => handleDeleteLevel(lvl._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tabIndex === 1 && (
          <div className="tab-section">
            <h3 className="section-title">Universities / Boards</h3>
            <div className="form-inline">
              <input
                type="text"
                placeholder="Add new source"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
              />
              <button onClick={handleAddSource}>Add</button>
            </div>
            <ul className="item-list">
              {sources.map((src) => (
                <li key={src._id} className="item-row">
                  {editSourceId === src._id ? (
                    <>
                      <input
                        type="text"
                        value={editSourceName}
                        onChange={(e) => setEditSourceName(e.target.value)}
                      />
                      <button onClick={handleEditSource}>Save</button>
                      <button onClick={() => setEditSourceId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {src.name}
                      <div>
                        <button onClick={() => {
                          setEditSourceId(src._id);
                          setEditSourceName(src.name);
                        }}>Edit</button>
                        <button onClick={() => handleDeleteSource(src._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tabIndex === 2 && (
          <div className="tab-section">
            <h3 className="section-title">Programs</h3>
            <div className="form-inline">
              <input
                type="text"
                placeholder="Add new program"
                value={newProgram}
                onChange={(e) => setNewProgram(e.target.value)}
              />
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value="">Select Level</option>
                {levels.map((level) => (
                  <option key={level._id} value={level._id}>{level.name}</option>
                ))}
              </select>
              <select value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)}>
                <option value="">Select Source</option>
                {sources.map((source) => (
                  <option key={source._id} value={source._id}>{source.name}</option>
                ))}
              </select>
              <button onClick={handleAddProgram}>Add</button>
            </div>
            <ul className="item-list">
              {programs.map((prog) => (
                <li key={prog._id} className="item-row">
                  {editProgramId === prog._id ? (
                    <>
                      <input
                        type="text"
                        value={editProgramName}
                        onChange={(e) => setEditProgramName(e.target.value)}
                      />
                      <select value={editProgramLevel} onChange={(e) => setEditProgramLevel(e.target.value)}>
                        <option value="">Select Level</option>
                        {levels.map((level) => (
                          <option key={level._id} value={level._id}>{level.name}</option>
                        ))}
                      </select>
                      <select value={editProgramSource} onChange={(e) => setEditProgramSource(e.target.value)}>
                        <option value="">Select Source</option>
                        {sources.map((source) => (
                          <option key={source._id} value={source._id}>{source.name}</option>
                        ))}
                      </select>
                      <button onClick={handleEditProgram}>Save</button>
                      <button onClick={() => setEditProgramId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {prog.name}
                      <div>
                        <button onClick={() => {
                          setEditProgramId(prog._id);
                          setEditProgramName(prog.name);
                          setEditProgramLevel(prog.level?._id || "");
                          setEditProgramSource(prog.source?._id || "");
                        }}>Edit</button>
                        <button onClick={() => handleDeleteProgram(prog._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tabIndex === 3 && (
          <div className="tab-section">
            <h3 className="section-title">Semesters</h3>
            <div className="form-inline">
              <select value={newSemesterProgram} onChange={(e) => setNewSemesterProgram(e.target.value)}>
                <option value="">Select Program</option>
                {programs.map((program) => (
                  <option key={program._id} value={program._id}>{program.name}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Semester Number"
                value={newSemesterNumber}
                onChange={(e) => setNewSemesterNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Semester Name"
                value={newSemesterName}
                onChange={(e) => setNewSemesterName(e.target.value)}
              />
              <button onClick={handleAddSemester}>Add</button>
            </div>
            <ul className="item-list">
              {semesters.map((sem) => (
                <li key={sem._id} className="item-row">
                  {editSemesterId === sem._id ? (
                    <>
                      <select value={editSemesterProgram} onChange={(e) => setEditSemesterProgram(e.target.value)}>
                        <option value="">Select Program</option>
                        {programs.map((program) => (
                          <option key={program._id}
                            value={program._id}>{program.name}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={editSemesterNumber}
                        onChange={(e) => setEditSemesterNumber(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editSemesterName}
                        onChange={(e) => setEditSemesterName(e.target.value)}
                      />
                      <button onClick={handleEditSemester}>Save</button>
                      <button onClick={() => setEditSemesterId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {sem.name} ({sem.program?.name} - Semester {sem.number})
                      <div>
                        <button onClick={() => {
                          setEditSemesterId(sem._id);
                          setEditSemesterProgram(sem.program?._id || "");
                          setEditSemesterNumber(sem.number);
                          setEditSemesterName(sem.name);
                        }}>Edit</button>
                        <button onClick={() => handleDeleteSemester(sem._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tabIndex === 4 && (
          <div className="tab-section">
            <h3 className="section-title">Exams</h3>
            <div className="form-inline">
              <input
                type="text"
                placeholder="Exam Title"
                value={newExamTitle}
                onChange={(e) => setNewExamTitle(e.target.value)}
              />
              <select value={newExamType} onChange={(e) => setNewExamType(e.target.value)}>
                <option value="">Select Exam Type</option>
                <option value="semester">Semester</option>
                <option value="general">General</option>
              </select>
              <select value={newExamLevel} onChange={(e) => setNewExamLevel(e.target.value)}>
                <option value="">Select Level</option>
                {levels.map((level) => (
                  <option key={level._id} value={level._id}>{level.name}</option>
                ))}
              </select>
              <select value={newExamSource} onChange={(e) => setNewExamSource(e.target.value)}>
                <option value="">Select Source</option>
                {sources.map((source) => (
                  <option key={source._id} value={source._id}>{source.name}</option>
                ))}
              </select>
              <select value={newExamProgram} onChange={(e) => setNewExamProgram(e.target.value)}>
                <option value="">Select Program</option>
                {programs.map((program) => (
                  <option key={program._id} value={program._id}>{program.name}</option>
                ))}
              </select>
              <select value={newExamSemester} onChange={(e) => setNewExamSemester(e.target.value)}>
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester._id} value={semester._id}>{semester.name}</option>
                ))}
              </select>
              <input
                type="date"
                value={newExamDate}
                onChange={(e) => setNewExamDate(e.target.value)}
              />

              <input
                type="file"
                onChange={(e) => setNewExamOfficialImage(e.target.files[0])}
              />
              <input
                type="file"
                onChange={(e) => setNewExamNoticeImage(e.target.files[0])}
              />
              <button onClick={handleAddExam}>Add</button>
            </div>
            <ul className="item-list">
              {exams.map((exam) => (
                <li key={exam._id} className="item-row">
                  {editExamId === exam._id ? (
                    // Edit form
                    <>
                      <input
                        type="text"
                        value={editExamTitle}
                        onChange={(e) => setEditExamTitle(e.target.value)}
                      />
                      <select value={editExamType} onChange={(e) => setEditExamType(e.target.value)}>
                        <option value="">Select Exam Type</option>
                        <option value="semester">Semester</option>
                        <option value="general">General</option>
                      </select>
                      <select value={editExamLevel} onChange={(e) => setEditExamLevel(e.target.value)}>
                        <option value="">Select Level</option>
                        {levels.map((level) => (
                          <option key={level._id} value={level._id}>{level.name}</option>
                        ))}
                      </select>
                      <select value={editExamSource} onChange={(e) => setEditExamSource(e.target.value)}>
                        <option value="">Select Source</option>
                        {sources.map((source) => (
                          <option key={source._id} value={source._id}>{source.name}</option>
                        ))}
                      </select>
                      <select value={editExamProgram} onChange={(e) => setEditExamProgram(e.target.value)}>
                        <option value="">Select Program</option>
                        {programs.map((program) => (
                          <option key={program._id} value={program._id}>{program.name}</option>
                        ))}
                      </select>
                      <select value={editExamSemester} onChange={(e) => setEditExamSemester(e.target.value)}>
                        <option value="">Select Semester</option>
                        {semesters.map((semester) => (
                          <option key={semester._id} value={semester._id}>{semester.name}</option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={editExamDate}
                        onChange={(e) => setEditExamDate(e.target.value)}
                      />
                      <button onClick={handleEditExam}>Save</button>
                      <button onClick={() => setEditExamId(null)}>Cancel</button>
                    </>
                  ) : (
                    // Display exam details
                    <>
                      {exam.title} ({exam.type}) - {exam.status}
                      <div>
                        <button onClick={() => {
                          setEditExamId(exam._id);
                          setEditExamTitle(exam.title);
                          setEditExamType(exam.type);
                          setEditExamLevel(exam.level?._id || "");
                          setEditExamSource(exam.source?._id || "");
                          setEditExamProgram(exam.program?._id || "");
                          setEditExamSemester(exam.semester?._id || "");
                          setEditExamDate(new Date(exam.examDate).toISOString().split('T')[0]);
                          setEditExamOfficialImage(null);
                          setEditExamNoticeImage(null);
                        }}>Edit</button>
                        <button onClick={() => handleDeleteExam(exam._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tabIndex === 5 && (
          <div className="tab-section">
            <h3 className="section-title">Exam Routines</h3>
            <div className="form-inline">
              <select value={newRoutineExam} onChange={(e) => setNewRoutineExam(e.target.value)}>
                <option value="">Select Exam</option>
                {exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>{exam.title}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={newRoutineSubject}
                onChange={(e) => setNewRoutineSubject(e.target.value)}
              />
              <input
                type="date"
                value={newRoutineDate}
                onChange={(e) => setNewRoutineDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Time"
                value={newRoutineTime}
                onChange={(e) => setNewRoutineTime(e.target.value)}
              />
              <input
                type="text"
                placeholder="Venue"
                value={newRoutineVenue}
                onChange={(e) => setNewRoutineVenue(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => setNewRoutineOfficialImage(e.target.files[0])}
              />
              <input
                type="file"
                onChange={(e) => setNewRoutineExamNoticeImage(e.target.files[0])}
              />
              <button onClick={handleAddRoutine}>Add</button>
            </div>
            <ul className="item-list">
              {routines.map((routine) => (
                
                <li key={routine._id} className="item-row">
                  {editRoutineId === routine._id ? (
                    // Edit form
                    <>
                      <select value={editRoutineExam} onChange={(e) => setEditRoutineExam(e.target.value)}>
                        <option value="">Select Exam</option>
                        {exams.map((exam) => (
                          <option key={exam._id} value={exam._id}>{exam.title}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={editRoutineSubject}
                        onChange={(e) => setEditRoutineSubject(e.target.value)}
                      />
                      <input
                        type="date"
                        value={editRoutineDate}
                        onChange={(e) => setEditRoutineDate(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editRoutineTime}
                        onChange={(e) => setEditRoutineTime(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editRoutineVenue}
                        onChange={(e) => setEditRoutineVenue(e.target.value)}
                      />
                      <input
                        type="file"
                        onChange={(e) => setEditRoutineOfficialImage(e.target.files[0])}
                      />
                      <input
                        type="file"
                        onChange={(e) => setEditRoutineExamNoticeImage(e.target.files[0])}
                      />
                      <button onClick={handleEditRoutine}>Save</button>
                      <button onClick={() => setEditRoutineId(null)}>Cancel</button>
                    </>
                  ) : (
                    // Display routine details
                    <>
                      {routine.subject} - {new Date(routine.date).toLocaleDateString()} {routine.time} {routine.venue}
                      <div>
                        <button onClick={() => {
                          setEditRoutineId(routine._id);
                          setEditRoutineExam(routine.exam?._id || "");
                          setEditRoutineSubject(routine.subject);
                          setEditRoutineDate(new Date(routine.date).toISOString().split('T')[0]);
                          setEditRoutineTime(routine.time);
                          setEditRoutineVenue(routine.venue);
                          setEditRoutineOfficialImage(null);
                          setEditRoutineExamNoticeImage(null);

                        }}>Edit</button>
                        <button onClick={() => handleDeleteRoutine(routine._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminExamManagement;





