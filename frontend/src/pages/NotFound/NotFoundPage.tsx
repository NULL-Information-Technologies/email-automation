import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "80px", md: "120px" },
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          404
        </Typography>

        <Typography variant="h4" fontWeight={600}>
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary">
          The page you are looking for does not exist or has been moved.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;