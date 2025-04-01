const Message = ({ variant = "info", children }) => {
  const getAlertStyle = () => {
    switch (variant) {
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "success":
        return "bg-green-100 text-green-800 border-green-400";
      case "error":
        return "bg-red-100 text-red-800 border-red-400";
      default:
        return "bg-blue-100 text-blue-800 border-blue-400";
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getAlertStyle()}`}>
      {children}
    </div>
  );
};

export default Message;
