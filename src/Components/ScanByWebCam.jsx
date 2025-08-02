import React, { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
  Fade,
  Tooltip,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import StopIcon from "@mui/icons-material/Stop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ScanByWebCam = () => {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [copied, setCopied] = useState(false);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      qrScannerRef.current = new QrScanner(videoRef.current, (result) =>
        handleScanWebCam(result)
      );
    }
    return () => {
      qrScannerRef.current?.stop();
    };
  }, []);

  const handleScanWebCam = (result) => {
    if (result) setScanResultWebCam(result);
  };

  const startWebCamScan = () => qrScannerRef.current?.start();
  const stopWebCamScan = () => qrScannerRef.current?.stop();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scanResultWebCam);
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
        background: "linear-gradient(120deg, #ffeee6ff, #f2f2f2ff)", // light greenish background
      }}
    >
      <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
        
        <Typography
                  variant="h5"
                  marginBottom="25px"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "#ff962eff" }}
                >
                  🎥 Scan via WebCam
                </Typography>

        {/* Start/Stop Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
          <Button
            variant="contained"
            color="warning"
            startIcon={<VideocamIcon />}
            onClick={startWebCamScan}
            sx={{ borderRadius: "12px", textTransform: "none" }}
          >
            Start
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<StopIcon />}
            onClick={stopWebCamScan}
            sx={{ borderRadius: "12px", textTransform: "none" }}
          >
            Stop
          </Button>
        </Box>

        {/* Webcam Preview */}
        <Box
          sx={{
            border: "3px dotted orange",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "250px",
            backgroundColor: "#fff8f0",
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Scan Result */}
        {scanResultWebCam && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              position: "relative",
            }}
          >
            <Tooltip title={scanResultWebCam} arrow>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 500,
                  color: "#333",
                }}
              >
                {getTrimmedResult(scanResultWebCam)}
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
                  bgcolor: "#4caf50",
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

export default ScanByWebCam;
