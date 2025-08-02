import "./App.css";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

import GenerateQR from "./Components/GenerateQR";
import ScanByFile from "./Components/ScanByFile";
import ScanByWebCam from "./Components/ScanByWebCam";

function App() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding:"30px",
        background: "linear-gradient(135deg, #ffffff, #f3f6fa)",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "95%", maxWidth: "1200px" }}
      >
        <Card
          sx={{
            borderRadius: "24px",
            boxShadow: "0px 12px 32px rgba(0,0,0,0.12)",
            overflow: "hidden",
            p: 3,
          }}
        >
          {/* Logo & Title */}
          <Box
            sx={{
              py: 4,
              textAlign: "center",
              marginBottom:"30px",
              borderBottom: "1px solid #e5eaf0",
              background: "linear-gradient(90deg, #eef2f7, #ffffff)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "700",
                letterSpacing: "1px",
                background: "linear-gradient(90deg, #4b6cb7, #182848)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🚀 SnapQR
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mt: 1, color: "#555", fontSize: "1rem" }}
            >
              ⚡ Generate. Scan. 🌍 Connect Instantly.
            </Typography>
          </Box>

          {/* Features in Flexbox */}
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
                mb: 6, // adds breathing space before footer
              }}
            >
              <GenerateQR />
              <ScanByFile />
              <ScanByWebCam />
            </Box>
          </CardContent>

          {/* Creative Divider */}
          <Box
            component="div"
            sx={{
              position: "relative",
              height: "40px",
              background: "linear-gradient(90deg, #e8ecf5, #ffffff)",
              overflow: "hidden",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                top: "-40px",
                left: 0,
                width: "100%",
                height: "100px",
              }}
            >
              <path
                fill="#f4f7fb"
                d="M0,224L60,202.7C120,181,240,139,360,122.7C480,107,600,117,720,117.3C840,117,960,107,1080,128C1200,149,1320,203,1380,229.3L1440,256V320H0Z"
              ></path>
            </svg>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              textAlign: "center",
              py: 3,
              background: "linear-gradient(135deg, #eef2f7, #ffffff)",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            <Typography sx={{ mb: 1 }}>
              Made with ❤️ by{" "}
              <a
                href="https://www.linkedin.com/in/sakethphaneendra/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#4b6cb7",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Saketh Phaneendra
              </a>
            </Typography>
            <Typography variant="body2" sx={{ color: "#777" }}>
              © 2025 SnapQR  
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </Container>
  );
}

export default App;
