import { useEffect, useRef, useState, type JSX } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import CustomToolbar from "./CustomToolbar";
import { getLocaleText } from "./handleLocale";
import { useTranslation } from "react-i18next";

interface District {
  id: number | string;
}

interface Region {
  id: number | string;
}

interface MasterDataTableProps<T> {
  data: T[];
  columns: GridColDef[];
  tableTitle?: string;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  secondaryButton?: () => void;
  primaryButton?: () => void;
  loading?: boolean;
  primaryButtonIcon?: JSX.Element;
}

function MasterDataTable<T>({
  data,
  columns,
  tableTitle,
  secondaryButtonText,
  primaryButtonText,
  secondaryButton,
  primaryButton,
  loading = false,
  primaryButtonIcon,
}: MasterDataTableProps<T>) {
  const [pageSize, setPageSize] = useState<number>(20);
  const [page, setPage] = useState<number>(0);
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<District[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setIsReady(true);
          observer.disconnect();
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      {/* Table Header Bar */}
      {(tableTitle || primaryButton || secondaryButton) && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            px: 2.5,
            py: 1.75,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {tableTitle ? (
            <Typography variant="subtitle1" fontWeight={600}>
              {tableTitle}
            </Typography>
          ) : (
            <Box />
          )}

          <Stack direction="row" gap={1}>
            {secondaryButton && (
              <Button
                variant="outlined"
                color="success"
                onClick={secondaryButton}
                size="small"
                sx={{ whiteSpace: "nowrap", borderRadius: 2 }}
              >
                {secondaryButtonText}
              </Button>
            )}
            {primaryButton && (
              <Button
                variant="contained"
                onClick={primaryButton}
                startIcon={primaryButtonIcon}
                size="small"
                sx={{ whiteSpace: "nowrap", borderRadius: 2 }}
              >
                {primaryButtonText}
              </Button>
            )}
          </Stack>
        </Stack>
      )}

      <Box ref={containerRef} sx={{ width: "100%" }}>
        {isReady ? (
          <DataGrid
            rows={data}
            columns={columns}
            pageSizeOptions={[20, 50, 100]}
            paginationModel={{ pageSize, page }}
            onPaginationModelChange={(model) => {
              setPageSize(model.pageSize);
              setPage(model.page);
            }}
            autoHeight
            loading={loading}
            localeText={getLocaleText(t)}
            slots={{
              toolbar: () => (
                <CustomToolbar
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  selectedDistricts={selectedDistricts}
                  setSelectedDistricts={setSelectedDistricts}
                  selectedRegions={selectedRegions}
                  setSelectedRegions={setSelectedRegions}
                  selectedDateRange={selectedDateRange}
                  setSelectedDateRange={setSelectedDateRange}
                  columns={columns}
                />
              ),
            }}
            getRowClassName={(params) =>
              `super-app-theme--${params.row.status}`
            }
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "action.hover",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: "text.secondary",
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "action.hover",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "divider",
              },
              "& .MuiDataGrid-footerContainer": {
                borderColor: "divider",
              },
            }}
          />
        ) : (
          <Box sx={{ display: "grid", placeItems: "center", height: 200 }}>
            <CircularProgress size={32} />
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default MasterDataTable;
