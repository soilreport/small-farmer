interface AlertProps {
  message: string;
  type?: "success" | "error" | "info";
}

const colors = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

const Alert = ({ message, type = "info" }: AlertProps) => {
  return <div className={`p-3 rounded ${colors[type]}`}>{message}</div>;
};

export default Alert;