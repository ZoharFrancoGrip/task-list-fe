import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Task } from "../../models/task";
import { css } from "@emotion/react";

const styles = {
  container: css`
    borderRadius: 3,
    align: "center",
    justifyContent: "center",
    alignItems: "center",
    pt: 2,
    pb: 2,
  `,
  text: css`
    align: "center",
    variant: "body1",
    color: "textSecondary",
    pt: 2,
    pb: 2,
  `,
};

type TaskTableFooterProps = {
  tasks: Task[];
  filteredTasks: Task[];
}

export function TaskTableFooter({ tasks, filteredTasks }: TaskTableFooterProps) {
  const isNoTasks = () => tasks?.length === 0;
  const isAllTasksShown = () =>
    filteredTasks?.length === tasks?.length && filteredTasks?.length !== 0;
  const isNoMatchingTasks = () =>
    filteredTasks?.length === 0 && tasks?.length !== 0;
  const isSomeTasksFiltered = () =>
    filteredTasks?.length !== 0 && filteredTasks?.length !== tasks?.length;

  return (
    <Box>
      {isNoTasks() && (
        <TableRow>
          <TableCell sx={styles.container}>
            <Typography sx={styles.text}>No tasks....</Typography>
          </TableCell>
        </TableRow>
      )}
      {isNoMatchingTasks() && (
        <TableRow>
          <TableCell sx={styles.container}>
            <Typography sx={styles.text}>
              No tasks matching the filters ({tasks?.length} tasks filtered out)
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {isAllTasksShown() && (
        <TableRow>
          <TableCell sx={styles.container}>
            <Typography sx={styles.text}>
              Total of tasks: {tasks?.length}
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {isSomeTasksFiltered() && (
        <TableRow>
          <TableCell sx={styles.container}>
            <Typography sx={styles.text}>
              Matching tasks: {filteredTasks?.length}, Filtered out tasks:{" "}
              {tasks?.length - filteredTasks?.length}
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </Box>
  );
};

