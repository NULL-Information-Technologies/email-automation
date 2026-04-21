import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";

interface Campaign {
  id: number;
  name: string;
  type: string;
  subject: string;
  date: string;
  status: "sent" | "draft" | "scheduled";
  opens: string;
  clicks: string;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Bootstrap 4 forms",
    type: "Regular",
    subject: "Simple is Better Than Complex",
    date: "Aug 13, 2018, 11:30 p.m.",
    status: "sent",
    opens: "36.7%",
    clicks: "8.5%",
  },
  {
    id: 2,
    name: "First campaign",
    type: "Regular",
    subject: "Simple is Better Than Complex",
    date: "Aug 13, 2018, 12:24 a.m.",
    status: "sent",
    opens: "100.0%",
    clicks: "100.0%",
  },
];

const sidebarItems = [
  "recent",
  "sent",
  "scheduled",
  "draft",
  "queued",
  "delivering",
  "paused",
] as const;

const CampaignsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("campaigns.title")}
              </Typography>
              <List>
                {sidebarItems.map((item) => (
                  <ListItemButton key={item}>
                    <ListItemText primary={t(`campaigns.sidebar.${item}`)} />
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <CardContent>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <TextField
                  size="small"
                  placeholder={t("campaigns.searchPlaceholder")}
                />
                <Button variant="contained">
                  {t("campaigns.createCampaign")}
                </Button>
              </Box>

              {/* Table */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("campaigns.table.campaign")}</TableCell>
                    <TableCell>{t("campaigns.table.status")}</TableCell>
                    <TableCell>{t("campaigns.table.opens")}</TableCell>
                    <TableCell>{t("campaigns.table.clicks")}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaigns.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600 }}>
                          {c.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {c.type} • {c.subject}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t("campaigns.sentOn", { date: c.date })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t(`campaigns.status.${c.status}`)}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{c.opens}</TableCell>
                      <TableCell>{c.clicks}</TableCell>
                      <TableCell>
                        <Button size="small">
                          {t("campaigns.viewReport")}
                        </Button>
                        <IconButton size="small">
                          <ArrowDropDownIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignsPage;
