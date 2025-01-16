import { Typography } from "@mui/material";
import { Task } from "../../models/task";
import { useMemo } from "react";

const styles = {
  text: {
    align: "center",
    variant: "body1",
    textAlign: "center",
    justifyContent: "center",
    color: "textSecondary",
    pt: 2,
    pb: 2,
  },
};

type TaskTableFooterProps = {
  tasks: Task[];
  filteredTasks: Task[];
};

export function TaskTableFooter({
  tasks,
  filteredTasks,
}: TaskTableFooterProps) {
  const isNoTasks = useMemo(() => tasks?.length === 0, [tasks]);
  const isAllTasksShown = useMemo(
    () =>
      filteredTasks?.length === tasks?.length && filteredTasks?.length !== 0,
    [filteredTasks, tasks]
  );
  const isNoMatchingTasks = useMemo(
    () => filteredTasks?.length === 0 && tasks?.length !== 0,
    [filteredTasks, tasks]
  );
  const isSomeTasksFiltered = useMemo(
    () =>
      filteredTasks?.length !== 0 && filteredTasks?.length !== tasks?.length,
    [filteredTasks, tasks]
  );

  return (
    <>
      {isNoTasks && (
        <Typography sx={styles.text}>No tasks ....</Typography>
      )}
      {isNoMatchingTasks && (
        <Typography sx={styles.text}>
          No tasks matching the filters ({tasks?.length} tasks filtered out)
        </Typography>
      )}
      {isAllTasksShown && (
        <Typography sx={styles.text}>
          Total of tasks: {tasks?.length}
        </Typography>
      )}
      {isSomeTasksFiltered && (
        <Typography sx={styles.text}>
          Matching tasks: {filteredTasks?.length}, Filtered out tasks:{" "}
          {tasks?.length - filteredTasks?.length}
        </Typography>
      )}
    </>
  );
    }
