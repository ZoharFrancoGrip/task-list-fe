import { useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import TaskForm from "../components/task/TaskForm";
import useTaskStore from "../stores/taskStore";
import { Task } from "../models/task";
import { Add } from "@mui/icons-material";
import { TaskView } from "../components/task/TaskView";
import { TaskTable } from "../components/task/TaskTable";



const styles = {
  dashboard:{
    title: { mb: 8, mt: 3 },
    container: { p: 4, marginTop: 10, marginLeft: 5, marginRight: 5 },
    addButton: {
      container: { textAlign: "center" , display: "flex", justifyContent: "center", alignItems: "center" },
      icon: { transition: "transform 0.5s" }
    }
  }
}

export function TasksDashboard() {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleSaveTask = (task: Omit<Task, "id" | "createdAt">) => {
    if (currentTask) {
      updateTask(currentTask.id, task);
    } else {
      addTask({ ...task, createdAt: new Date(), id: Date.now() });
    }
    setEditModalOpen(false);
    setCurrentTask(null);
  };

  const handleNewTask = () => {
    setCurrentTask(null);
    setEditModalOpen(true);
  };

  return (
    <Box sx={styles.dashboard.container}>
      <Typography variant="h3" gutterBottom sx={styles.dashboard.title}>
        Task Management Dashboard
      </Typography>
      <TaskTable
        onEdit={(task) => {
          setCurrentTask(task);
          setEditModalOpen(true);
        }}
        onView={(task) => {
          setCurrentTask(task);
          setViewModalOpen(true);
        }}
      />
      <Box sx={styles.dashboard.addButton.container}>
        <IconButton onClick={handleNewTask}>
          <Add sx={styles.dashboard.addButton.icon} />
        </IconButton>
      </Box>
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box>
          <TaskForm
            onSave={handleSaveTask}
            onClose={() => setEditModalOpen(false)}
            task={currentTask ?? undefined}
          />
        </Box>
      </Modal>
      <Modal open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        <Box>
          <TaskView task={currentTask ?? undefined} />
        </Box>
      </Modal>
    </Box>
  );
};

