import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillLock } from "react-icons/ai";
import { TextField, InputAdornment, Box } from "@mui/material";

const PasswordWithToggle = ({
  name,
  value,
  placeholder,
  onType,
  error,
  helperText,
}) => {
  const [seePassword, setSeePassword] = React.useState(false);

  const toggleSeeUnseen = () => {
    setSeePassword(!seePassword);
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "380px",
        width: "100%",
        marginTop: "20px",
      }}
    >
      {/* Password Input Field */}
      <TextField
        fullWidth
        required
        type={seePassword ? "text" : "password"}
        id="outlined-required"
        label={placeholder || "Password"}
        variant="outlined"
        value={value}
        onChange={onType}
        name={name || "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiFillLock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={toggleSeeUnseen}
              >
                {!seePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </Box>
            </InputAdornment>
          ),
        }}
        error={error}
        helperText={helperText}
      />
    </Box>
  );
};

export default PasswordWithToggle;