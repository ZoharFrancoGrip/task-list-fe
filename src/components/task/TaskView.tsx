import React from "react";
import { Box, Typography } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import FeatureIcon from "@mui/icons-material/Star";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Task, TaskType } from "../../models/task";
import { TbClockBitcoin } from "react-icons/tb";


const styles = {
  container: {
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
  },

  type: (color: string) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    color: color,
  }),
  typeText: { fontWeight: "bold", variant: "h6" },
  description: {
    fontSize: "1.3rem",
    color: "text.secondary",
    animation: "fadeIn 1.5s ease",
  },
  time: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  timeText: {
    variant: "body2",
    color: "text.secondary",
  },
};

type TaskViewProps = {
  task?: Task;
};

export function TaskView({ task }: TaskViewProps) {
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
      sx={styles.container}
    >
      <Box
        sx={styles.type(color)}
      >
        {icon}
        <Typography variant="h6">
          {task?.type}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h3">
          {task?.title}
        </Typography>
      </Box>

      <Typography
        sx={styles.description}
      >
        {task?.description}
      </Typography>
      <Box sx={styles.time}>
        <TbClockBitcoin fontSize="large" color="action" style={{ marginRight: "10px" }}/>
        <Typography style={styles.timeText}>
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

