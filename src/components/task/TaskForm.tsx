import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import {
  Task,
  TaskDifficulty,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../models/task";
import { EnumFormMenu } from "../shared/EnumFormMenu";

const styles = {
  taskForm: {
    container: {
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
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: 2,
      mt: 3,
    },
    textField: { width: "100%", marginBottom: 2 },
    selectContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: 2,
      width: "100%",
      box: {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        select: { display: "flex", alignItems: "center" },
      },
    },
  },
};

type TaskFormProps = {
  onSave: (task: Omit<Task, "id" | "createdAt">) => void;
  onClose: () => void;
  task?: Task;
};

export function TaskForm({ onSave, onClose, task }: TaskFormProps) {
  const [taskForm, setTaskForm] = useState<Task>(task || {
    id: Date.now(),
    createdAt: new Date(),
    title: "",
    description: "",
    priority: TaskPriority.High,
    status: TaskStatus.ToDo,
    type: TaskType.Feature,
    difficulty: TaskDifficulty.Hard,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(taskForm);
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={styles.taskForm.container}
    >
      <Typography variant="h6">Task Form</Typography>
      <TextField
        label="Title"
        value={taskForm.title}
        onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        required
        sx={styles.taskForm.textField}
      />
      <TextField
        label="Description"
        value={taskForm.description}
        onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
        multiline
        rows={4}
        sx={styles.taskForm.textField}
      />
      <Box sx={styles.taskForm.selectContainer}>
        <Box sx={styles.taskForm.selectContainer.box}>
          <Typography variant="subtitle2" gutterBottom>
            Type
          </Typography>
          <EnumFormMenu
            value={taskForm.type}
            setValue={(value) => setTaskForm({ ...taskForm, type: value as TaskType })}
            options={Object.values(TaskType)}
            label="Type"
            sx={styles.taskForm.selectContainer.box.select}
          />
        </Box>
        <Box sx={styles.taskForm.selectContainer.box}>
          <Typography gutterBottom>Difficulty</Typography>
          <EnumFormMenu
            value={taskForm.difficulty}
            setValue={(value) => setTaskForm({ ...taskForm, difficulty: value as TaskDifficulty })}
            options={Object.values(TaskDifficulty)}
            label="Difficulty"
            sx={styles.taskForm.selectContainer.box.select}
          />
        </Box>
      </Box>
      <Box sx={styles.taskForm.selectContainer}>
        <Box sx={styles.taskForm.selectContainer.box}>
          <Typography gutterBottom>Priority</Typography>
          <EnumFormMenu
            value={taskForm.priority}
            setValue={(value) => setTaskForm({ ...taskForm, priority: value as TaskPriority })}
            options={Object.values(TaskPriority)}
            label="Priority"
            sx={styles.taskForm.selectContainer.box.select}
          />
        </Box>
        <Box sx={styles.taskForm.selectContainer.box}>
          <Typography gutterBottom>Status</Typography>
          <EnumFormMenu
            value={taskForm.status}
            setValue={(value) => setTaskForm({ ...taskForm, status: value as TaskStatus })}
            options={Object.values(TaskStatus)}
            label="Status"
            sx={styles.taskForm.selectContainer.box.select}
          />
        </Box>
      </Box>
      <Box sx={styles.taskForm.buttonContainer}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={styles.taskForm.buttonContainer}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={styles.taskForm.buttonContainer}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default TaskForm;
