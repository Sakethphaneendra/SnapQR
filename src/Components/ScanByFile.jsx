import React, { useState, useRef } from "react";
import QrScanner from "qr-scanner";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Fade,
  Tooltip,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion } from "framer-motion";

const ScanByFile = () => {
  const fileInputRef = useRef(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [copied, setCopied] = useState(false);

  const handleScanFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const result = await QrScanner.scanImage(file);
        setScanResultFile(result);
        const imageUrl = URL.createObjectURL(file);
        setUploadedImageUrl(imageUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scanResultFile);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getTrimmedResult = (text, maxLength = 25) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

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
        background: "linear-gradient(145deg, #e3f2fd, #ffffff)", // subtle blue gradient
      }}
    >
      <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#1565c0" }}
        >
          📁 Scan from File
        </Typography>

        {/* Upload Button */}
        <motion.div whileHover={{ y: -5 }}>
          <Box
            onClick={() => fileInputRef.current.click()}
            sx={{
              border: "2px dashed #2196f3",
              borderRadius: "12px",
              marginTop: "5%",
              p: 3,
              cursor: "pointer",
              transition: "0.3s ease",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            <UploadFileIcon sx={{ fontSize: "40px", color: "#1976d2" }} />
            <Typography sx={{ mt: 1, fontSize: "0.95rem", color: "#0d47a1" }}>
              Click or drag a file to upload
            </Typography>
          </Box>
        </motion.div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleScanFile}
        />

        {/* Helper Text */}
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "#1565c0", fontSize: "0.85rem" }}
        >
          Supports PNG, JPG, JPEG. File size limit: 5MB.
        </Typography>

        {/* QR Preview */}
        {uploadedImageUrl && (
          <Box sx={{ mt: 3 }}>
            <img
              src={uploadedImageUrl}
              alt="Uploaded QR"
              style={{
                maxWidth: "250px",
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                border: "2px solid #2196f3",
              }}
            />
          </Box>
        )}

        {/* Scan Result */}
        {scanResultFile && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              position: "relative",
            }}
          >
            <Tooltip title={scanResultFile} arrow>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#0d47a1",
                  fontWeight: 500,
                }}
              >
                {getTrimmedResult(scanResultFile)}
              </Typography>
            </Tooltip>
            <IconButton
              color="primary"
              onClick={copyToClipboard}
              aria-label="copy"
              size="small"
            >
              <ContentCopyIcon />
            </IconButton>

            {/* Copied Animation */}
            <Fade in={copied}>
              <Box
                sx={{
                  position: "absolute",
                  top: -25,
                  right: 10,
                  bgcolor: "#1976d2",
                  color: "white",
                  px: 1.2,
                  py: 0.3,
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                Copied!
              </Box>
            </Fade>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ScanByFile;
