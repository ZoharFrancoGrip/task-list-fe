import {
  Box,
  css,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useMemo } from "react";

import { CalendarMonth, DeleteOutline, Edit } from "@mui/icons-material";
import { HiDocumentDuplicate } from "react-icons/hi";
import {
  TaskDifficultyToColor,
  TaskDifficultyToIcon,
  TaskPriorityToColor,
  TaskPriorityToIcon,
  TaskStatusToColor,
  TaskStatusToIcon,
  TaskTypeToColor,
  TaskTypeToIcon,
} from "../../config/task-properties-decoration-config";
import {
  Task,
  TaskDifficulty,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../models/task";
import useTaskStore from "../../stores/taskStore";
import SearchBar from "../shared/SearchBar";
import { TableHeadCellWithFilter } from "../shared/TableHeadCellFilter";
import { TableIconBadgeCell } from "../shared/TableIconBadgeCell";
import { TaskTableFooter } from "./TaskTableFooter";

const styles = {
  tableContainer: {
    container: css`
      borderRadius: 3,
      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
    `,
    box: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    pryiorityChip: (task: Task) => ({
      backgroundColor: TaskPriorityToColor[task.priority],
      color: "white",
    }),
    
  },
};

type TaskTableProps = {
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
};

export function TaskTable({ onEdit, onView }: TaskTableProps) {
  const {
    deleteTask,
    duplicateTask,
    tasks,
    setFilter,
    filter,
    getFilteredTasks,
  } = useTaskStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredTasks = useMemo(() => getFilteredTasks(), [tasks, filter]);

  return (
    <TableContainer component={Paper} sx={styles.tableContainer.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <SearchBar
                placeholder="Title..."
                setSearchQuery={(value) => setFilter("search", value)}
              />
            </TableCell>
            <TableHeadCellWithFilter
              enumObject={TaskPriority}
              onChange={(value: Array<TaskPriority> | null) =>
                setFilter("priority", value)
              }
              title="Priority"
              sx={styles.tableContainer.box}
            />
            <TableHeadCellWithFilter
              enumObject={TaskType}
              onChange={(value: Array<TaskType> | null) =>
                setFilter("type", value)
              }
              title="Type"
              sx={styles.tableContainer.box}
            />
            <TableHeadCellWithFilter
              enumObject={TaskDifficulty}
              onChange={(value: Array<TaskDifficulty> | null) =>
                setFilter("difficulty", value)
              }
              title="Difficulty"
              sx={styles.tableContainer.box}
            />
            <TableHeadCellWithFilter
              enumObject={TaskStatus}
              onChange={(value: Array<TaskStatus> | null) =>
                setFilter("status", value)
              }
              title="Status"
              sx={styles.tableContainer.box}
            />
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
                <TableIconBadgeCell
                  icon={TaskPriorityToIcon[task.priority]}
                  title={task.priority}
                  sx={styles.tableContainer.pryiorityChip(task)}
                  iconSx={{ color: "white" }}
                />
                <TableIconBadgeCell
                  icon={TaskTypeToIcon[task.type]}
                  title={task.type}
                  iconSx={{ color: TaskTypeToColor[task.type] }}
                />
                <TableIconBadgeCell
                  icon={TaskDifficultyToIcon[task.difficulty]}
                  title={task.difficulty}
                  iconSx={{ color: TaskDifficultyToColor[task.difficulty] }}
                />
                <TableIconBadgeCell
                  icon={TaskStatusToIcon[task.status]}
                  title={task.status}
                  iconSx={{ color: TaskStatusToColor[task.status] }}
                />
                <TableCell>
                  <Box sx={styles.tableContainer.box}>
                    <CalendarMonth fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {task.createdAt.toLocaleString()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => duplicateTask(task.id)}
                    size="small"
                  >
                    <HiDocumentDuplicate />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTask(task.id)}
                    size="small"
                    color="error"
                  >
                    <DeleteOutline />
                  </IconButton>
                  <IconButton onClick={() => onEdit(task)} size="small">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={7} sx={{ padding: 0, textAlign: 'center' }}>
              <TaskTableFooter tasks={tasks} filteredTasks={filteredTasks} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
