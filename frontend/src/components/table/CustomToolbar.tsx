import { Toolbar, QuickFilter } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";

interface District {
  id: string | number;
}

interface Region {
  id: string | number;
}

interface CustomToolbarProps {
  selectedStatus: string | null;
  setSelectedStatus: Dispatch<SetStateAction<string | null>>;

  selectedDistricts: District[];
  setSelectedDistricts: Dispatch<SetStateAction<District[]>>;

  selectedRegions: Region[];
  setSelectedRegions: Dispatch<SetStateAction<Region[]>>;

  selectedDateRange: [Dayjs | null, Dayjs | null];
  setSelectedDateRange: Dispatch<SetStateAction<[Dayjs | null, Dayjs | null]>>;

  columns: GridColDef[];
}

const CustomToolbar: React.FC<CustomToolbarProps> = () => {
  return (
    <Toolbar>
      <Box sx={{ flexGrow: 1 }} />
      <QuickFilter debounceMs={500} />
    </Toolbar>
  );
};

export default CustomToolbar;