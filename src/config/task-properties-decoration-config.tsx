import {
  TaskDifficulty,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../models/task";
import {
  CheckCircle,
  HourglassEmpty,
  BugReport,
  Task,
  Block,
  ArrowDownward,
  ArrowUpward,
  Remove,
  BatteryCharging50Rounded,
  BatteryCharging20Rounded,
  BatteryChargingFullRounded,
  PlayCircle,
} from "@mui/icons-material";
import FeatureIcon from "@mui/icons-material/Star";

export const TaskDifficultyToColor = {
  [TaskDifficulty.Easy]: "darkLight.green",
  [TaskDifficulty.Medium]: "darkLight.orange",
  [TaskDifficulty.Hard]: "darkLight.red",
};

export const TaskDifficultyToIcon = {
  [TaskDifficulty.Easy]: <BatteryCharging20Rounded />,
  [TaskDifficulty.Medium]: <BatteryCharging50Rounded />,
  [TaskDifficulty.Hard]: <BatteryChargingFullRounded />,
};

export const TaskPriorityToColor = {
  [TaskPriority.Low]: "darkLight.green",
  [TaskPriority.Medium]: "darkLight.blue",
  [TaskPriority.High]: "darkLight.red",
};
export const TaskPriorityToIcon = {
  [TaskPriority.Low]: <ArrowDownward />,
  [TaskPriority.Medium]: <Remove />,
  [TaskPriority.High]: <ArrowUpward />,
};

export const TaskStatusToColor = {
  [TaskStatus.ToDo]: "darkLight.orange",
  [TaskStatus.InProgress]: "darkLight.blue",
  [TaskStatus.Blocked]: "darkLight.red",
  [TaskStatus.Done]: "darkLight.green",
};
export const TaskStatusToIcon = {
  [TaskStatus.ToDo]: <PlayCircle />,
  [TaskStatus.InProgress]: <HourglassEmpty />,
  [TaskStatus.Blocked]: <Block />,
  [TaskStatus.Done]: <CheckCircle />,
};

export const TaskTypeToColor = {
  [TaskType.Bug]: "darkLight.red",
  [TaskType.Feature]: "darkLight.blue"   ,
  [TaskType.Task]: "darkLight.green",
};
export const TaskTypeToIcon = {
  [TaskType.Bug]: <BugReport />,
  [TaskType.Feature]: <FeatureIcon />,
  [TaskType.Task]: <Task />,
};
