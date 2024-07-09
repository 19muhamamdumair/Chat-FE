import React, { useState, useRef } from "react";
import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Avatar,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Camera,
  File,
  Image as ImageIcon,
  Sticker,
  User,
} from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <ImageIcon size={24} />,
    y: 102,
    title: "Photo/Video",
    action: "upload",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const ChatInput = ({ setOpenPicker, onSendMessage }) => {
  const [openAction, setOpenAction] = useState(false);
  const [message, setMessage] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() !== "" || mediaPreview !== null) {
      const formData = new FormData();
      if (mediaPreview) {
        formData.append("file", mediaPreview.file); // Append the file to FormData
      }
      formData.append("message", message.trim());

      onSendMessage(formData); // Send the FormData
      setMessage("");
      setMediaPreview(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setMediaPreview({ url: fileURL, type: file.type, file: file }); // Store the file object
    }
  };

  return (
    <Box>
      <StyledInput
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Stack sx={{ width: "max-content" }}>
              <Stack
                sx={{
                  position: "relative",
                  display: openAction ? "inline-block" : "none",
                }}
              >
                {Actions.map((action) => (
                  <Tooltip
                    key={action.title}
                    placement="right"
                    title={action.title}
                  >
                    <Fab
                      sx={{
                        position: "absolute",
                        top: -action.y,
                        backgroundColor: action.color,
                      }}
                      onClick={() => {
                        if (action.action === "upload") {
                          fileInputRef.current.click();
                        }
                      }}
                    >
                      {action.icon}
                    </Fab>
                  </Tooltip>
                ))}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/,video/"
                  onChange={handleFileChange}
                />
              </Stack>
              <InputAdornment>
                <IconButton onClick={() => setOpenAction((prev) => !prev)}>
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
                <Smiley />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {mediaPreview && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          {mediaPreview.type.startsWith("image") ? (
            <Avatar
              src={mediaPreview.url}
              alt="Image preview"
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            <video
              controls
              src={mediaPreview.url}
              style={{ width: "100%", maxHeight: "200px" }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

const Footer = ({ onSendMessage }) => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack direction="row" alignItems={"center"} spacing={3}>
        <Stack sx={{ width: "100%" }}>
          <ChatInput
            setOpenPicker={setOpenPicker}
            onSendMessage={onSendMessage}
          />
        </Stack>
        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <IconButton
            onClick={() => onSendMessage("")} // Modify this part to correctly send messages
            sx={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PaperPlaneTilt color="#fff" size={24} />
          </IconButton>
        </Box>
      </Stack>
      {openPicker && (
        <Box
          sx={{
            display: "inline",
            zIndex: 10,
            position: "fixed",
            bottom: 81,
            right: 100,
          }}
        >
          <Picker
            theme={theme.palette.mode}
            data={data}
            onEmojiSelect={(emoji) => console.log(emoji)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Footer;