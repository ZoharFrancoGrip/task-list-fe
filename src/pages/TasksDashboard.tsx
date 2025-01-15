import React, { useState } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import useTaskStore from "../stores/taskStore";
import { Task } from "../models/task";
import { Add } from "@mui/icons-material";
import TaskView from "../components/TaskView";

const TasksDashboard: React.FC = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleSaveTask = (task: Omit<Task, "id" | "createdAt">) => {
    if (currentTask) {
      updateTask(currentTask.id, task);
    } else {
      addTask({ ...task, createdAt: new Date() });
    }
    setEditModalOpen(false);
    setCurrentTask(null);
  };

  const handleNewTask = () => {
    setCurrentTask(null);
    setEditModalOpen(true);
  };

  return (
    <Box sx={{ p: 4, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 8, mt: 3 }}>
        Task Management Dashboard
      </Typography>
      <TaskList
        onEdit={(task) => {
          setCurrentTask(task);
          setEditModalOpen(true);
        }}
        onView={(task) => {
          setCurrentTask(task);
          setViewModalOpen(true);
        }}
      />
      <IconButton sx={{ textAlign: "center" }} onClick={handleNewTask}>
        <Add sx={{ transition: "transform 0.5s" }} />
      </IconButton>
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

export default TasksDashboard;
