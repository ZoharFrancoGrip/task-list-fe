import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Paper,
  SvgIcon,
  IconButton,
  Box,
} from "@mui/material";
import useTaskStore from "../stores/taskStore";
import {
  Task,
  TaskType,
  TaskPriority,
  TaskDifficulty,
  TaskStatus,
} from "../models/task";
import { CalendarMonth, DeleteOutline, MoreVertOutlined } from "@mui/icons-material";
import {
  TaskDifficultyToColor,
  TaskDifficultyToIcon,
  TaskPriorityToColor,
  TaskPriorityToIcon,
  TaskStatusToColor,
  TaskStatusToIcon,
  TaskTypeToColor,
  TaskTypeToIcon,
} from "../config/task-properties-decoration-config";
import EnumFilter from "./shared/EnumFilter";
import SearchBar from "./shared/SearchBar";


interface TaskListProps {
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, onView }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const tasks = useTaskStore((state) => state.tasks);
  const setFilter = useTaskStore((state) => state.setFilter);
  const filter = useTaskStore((state) => state.filter);
  const getFilteredTasks = useTaskStore((state) => state.getFilteredTasks);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredTasks = useMemo(() => getFilteredTasks(), [tasks, filter]);
  

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold">
                <SearchBar
                  placeholder="Title..."
                  setSearchQuery={(value) => setFilter("search", value)}
                />
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold">Priority</Typography>
                <EnumFilter
                  enumObject={TaskPriority}
                  onChange={(value: Array<TaskPriority> | null) =>
                    setFilter("priority", value)
                  }
                />
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold">Type</Typography>
                <EnumFilter
                  enumObject={TaskType}
                  onChange={(value: Array<TaskType> | null) =>
                    setFilter("type", value)
                  }
                />
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold">Difficulty</Typography>
                <EnumFilter
                  enumObject={TaskDifficulty}
                  onChange={(value: Array<TaskDifficulty> | null) =>
                    setFilter("difficulty", value)
                  }
                />
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold">Status</Typography>
                <EnumFilter
                  enumObject={TaskStatus}
                  onChange={(value: Array<TaskStatus> | null) =>
                    setFilter("status", value)
                  }
                />
              </Box>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Created At</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold"></Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks?.length !== 0 &&
            filteredTasks?.map((task) => (
              <TableRow key={task.id} onDoubleClick={() => onView(task)}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Chip
                    label={task.priority}
                    icon={
                      <SvgIcon
                        color="inherit"
                      >
                        {TaskPriorityToIcon[task.priority]}
                      </SvgIcon>
                    }
                    size="small"
                    sx={{
                      backgroundColor: TaskPriorityToColor[task.priority],
                      color: 'white'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.type}
                    icon={
                      <SvgIcon
                        color="inherit"
                        sx={{ color: TaskTypeToColor[task.type] }}
                      >
                        {TaskTypeToIcon[task.type]}
                      </SvgIcon>
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.difficulty}
                    icon={
                      <SvgIcon
                        color="inherit"
                        sx={{ color: TaskDifficultyToColor[task.difficulty] }}
                      >
                        {TaskDifficultyToIcon[task.difficulty]}
                      </SvgIcon>
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.status}
                    icon={
                      <SvgIcon
                        color="primary"
                        sx={{ color: TaskStatusToColor[task.status] }}
                      >
                        {TaskStatusToIcon[task.status]}
                      </SvgIcon>
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CalendarMonth fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {task.createdAt.toLocaleString()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(task)} size="small">
                    <MoreVertOutlined />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTask(task.id)}
                    size="small"
                    color="error"
                  >
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {filteredTasks?.length !== 0 &&
            filteredTasks?.length !== tasks?.length && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ pt: 4 }}
                  >
                    Matching tasks: {filteredTasks?.length}, Filtered out tasks:{" "}
                    {tasks?.length - filteredTasks?.length}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          {filteredTasks?.length === tasks?.length &&
            filteredTasks?.length !== 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ pt: 4 }}
                  >
                    Total of tasks: {tasks?.length}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

          {tasks?.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ pt: 4 }}
                >
                  No tasks....
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {filteredTasks?.length === 0 && tasks?.length !== 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ pt: 4 }}
                >
                  No tasks matching the current filters ({tasks?.length} tasks
                  filtered out)
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
