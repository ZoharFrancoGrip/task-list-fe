import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  Task,
  TaskDifficulty,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../models/task";

interface TaskFormProps {
  onSave: (task: Omit<Task, "id" | "createdAt">) => void;
  onClose: () => void;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, onClose, task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [type, setType] = useState<Task["type"]>(task?.type || TaskType.Bug);
  const [difficulty, setDifficulty] = useState<Task["difficulty"]>(
    task?.difficulty || TaskDifficulty.Hard
  );
  const [priority, setPriority] = useState<Task["priority"]>(
    task?.priority || TaskPriority.High
  );
  const [status, setStatus] = useState<Task["status"]>(
    task?.status || TaskStatus.InProgress
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      priority,
      status,
      type,
      difficulty,
    });
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "10px",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
      }}
    >
      <Typography variant="h6">Task Form</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ width: "100%" , marginBottom: 2}}
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
       
        rows={4}
        sx={{ width: "100%" , marginBottom: 2}}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, width: "100%"  }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
          <Typography variant="subtitle2" gutterBottom>
            Type
          </Typography>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as Task["type"])}
            fullWidth
            label="Type"
            size="small"
            variant="outlined"
          labelId="type-label"
          sx={{
            "& .MuiSelect-select": { display: "flex", alignItems: "center" },
          }}
          displayEmpty
        >
          <MenuItem value={TaskType.Bug}>{TaskType.Bug}</MenuItem>
          <MenuItem value={TaskType.Feature}>{TaskType.Feature}</MenuItem>
          <MenuItem value={TaskType.Task}>{TaskType.Task}</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
          <Typography variant="subtitle2" gutterBottom>
            Difficulty
          </Typography>
          <Select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as Task["difficulty"])
            }
            fullWidth
            label="Difficulty"
            size="small"
            variant="outlined"
            labelId="difficulty-label"
            sx={{
              "& .MuiSelect-select": { display: "flex", alignItems: "center" },
            }}
            displayEmpty
          >
            <MenuItem value={TaskDifficulty.Easy}>
              {TaskDifficulty.Easy}
            </MenuItem>
            <MenuItem value={TaskDifficulty.Medium}>
              {TaskDifficulty.Medium}
            </MenuItem>
            <MenuItem value={TaskDifficulty.Hard}>
              {TaskDifficulty.Hard}
            </MenuItem>
          </Select>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
          <Typography variant="subtitle2" gutterBottom>
            Priority
          </Typography>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
            fullWidth
            label="Priority"
            size="small"
            variant="outlined"
            labelId="priority-label"
            sx={{
              "& .MuiSelect-select": { display: "flex", alignItems: "center" },
            }}
            displayEmpty
          >
            <MenuItem value={TaskPriority.Low}>{TaskPriority.Low}</MenuItem>
            <MenuItem value={TaskPriority.Medium}>
              {TaskPriority.Medium}
            </MenuItem>
            <MenuItem value={TaskPriority.High}>{TaskPriority.High}</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
          <Typography variant="subtitle2" gutterBottom>
            Status
          </Typography>
          <Select
            value={status || ""}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            fullWidth
            label="Status"
            size="small"
            variant="outlined"
            labelId="status-label"
            sx={{
              "& .MuiSelect-select": { display: "flex", alignItems: "center" },
            }}
            displayEmpty
          >
            <MenuItem value={TaskStatus.ToDo}>{TaskStatus.ToDo}</MenuItem>
            <MenuItem value={TaskStatus.InProgress}>
              {TaskStatus.InProgress}
            </MenuItem>
            <MenuItem value={TaskStatus.Blocked}>{TaskStatus.Blocked}</MenuItem>
            <MenuItem value={TaskStatus.Done}>{TaskStatus.Done}</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
