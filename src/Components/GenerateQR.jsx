import React, { useState } from "react";
import QRCode from "qrcode";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";

const GenerateQR = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateQrCode = async () => {
    try {
      if (!text.trim()) return;
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: "16px",
        p: 3,
        width: "100%",
        maxWidth: "350px",
        flex: "1 1 300px",
        minHeight: "420px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(120deg, #e6fff6ff, #f2f2f2ff)", // light greenish background
      }}
    >
      <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
        <Typography
          variant="h5"
          marginBottom="25px"
          gutterBottom
          sx={{ fontWeight: 600, color: "#2e7d32" }}
        >
          🎨 Generate QR Code
        </Typography>

        {/* Modern Text Field */}
        <TextField
          label="Enter text or link"
          variant="outlined"
          fullWidth
          size="small"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#f9f9f9",
              "& fieldset": {
                borderColor: "#c8e6c9",
              },
              "&:hover fieldset": {
                borderColor: "#43a047",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2e7d32",
                borderWidth: "2px",
              },
            },
          }}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Animated Generate Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={generateQrCode}
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#2e7d32" },
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              py: 1,
              boxShadow: "0px 4px 12px rgba(76, 175, 80, 0.3)",
            }}
          >
            Generate
          </Button>
        </motion.div>

        {/* QR Preview */}
        {imageUrl && (
          <Box sx={{ mt: 3 }}>
            <a href={imageUrl} download="qrcode.png" style={{ display: "block" }}>
              <img
                src={imageUrl}
                alt="Generated QR"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  border: "2px solid #a5d6a7",
                }}
              />
            </a>
            <a href={imageUrl} download="qrcode.png" style={{ display: "block" }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  fullWidth
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 500,
                    borderColor: "#43a047",
                    color: "#2e7d32",
                    "&:hover": {
                      borderColor: "#2e7d32",
                      backgroundColor: "#e8f5e9",
                    },
                  }}
                >
                  Download QR
                </Button>
              </motion.div>
            </a>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default GenerateQR;
