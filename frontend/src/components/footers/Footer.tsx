import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ mt: 5, py: 4, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid
            size={{ xs: 12, md: 8 }}
            textAlign={{ xs: "center", md: "left" }}
          >
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 8 }}
            textAlign={{ xs: "center", md: "right" }}
          >
            <Stack
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <Link href="#" underline="hover" variant="body2">
                Privacy Policy
              </Link>
              <Link href="#" underline="hover" variant="body2">
                Terms and Conditions
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
