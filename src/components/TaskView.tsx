import React from "react";
import { Box, Typography } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import FeatureIcon from "@mui/icons-material/Star";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Task, TaskType } from "../models/task";
import { TbClockBitcoin } from "react-icons/tb";

interface TaskViewProps {
  task?: Task;
}

const TaskView: React.FC<TaskViewProps> = ({ task }) => {
  // Get the icon and color based on the task type
  const getTaskTypeIcon = (type: TaskType) => {
    switch (type) {
      case TaskType.Bug:
        return {
          icon: <BugReportIcon fontSize="large" />,
          color: "error.main",
        };
      case TaskType.Feature:
        return {
          icon: <FeatureIcon fontSize="large" />,
          color: "primary.main",
        };
      case TaskType.Task:
        return {
          icon: <TaskAltIcon fontSize="large" />,
          color: "success.main",
        };
      default:
        return {
          icon: <TaskAltIcon fontSize="large" />,
          color: "text.secondary",
        };
    }
  };

  const { icon, color } = getTaskTypeIcon(task?.type || TaskType.Bug);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "20px",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
        height: 400,
      }}
    >
      <Box
        sx={{
          color,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        {icon}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {task?.type}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {task?.title}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: "1.3rem",
          color: "text.secondary",
          animation: "fadeIn 1.5s ease",
        }}
      >
        {task?.description}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "auto" }}>
        <TbClockBitcoin fontSize="large" color="action" style={{ marginRight: "10px" }}/>
        <Typography variant="body2" color="textSecondary">
          Created{" "}
          {Math.floor(
            (new Date().getTime() - (task?.createdAt?.getTime() || 0)) / (1000 * 60)
          )}{" "}
          minutes ago
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskView;
