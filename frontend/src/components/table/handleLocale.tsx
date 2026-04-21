import type { GridLocaleText } from "@mui/x-data-grid";
import { type TFunction } from "i18next";

export const getLocaleText = (t: TFunction): Partial<GridLocaleText> => ({
  noRowsLabel: t("dataTable.noRowsLabel"),
  noResultsOverlayLabel: t("dataTable.noResultsOverlayLabel"),

  toolbarDensity: t("dataTable.toolbarDensity"),
  toolbarDensityLabel: t("dataTable.toolbarDensityLabel"),
  toolbarDensityCompact: t("dataTable.toolbarDensityCompact"),
  toolbarDensityStandard: t("dataTable.toolbarDensityStandard"),
  toolbarDensityComfortable: t("dataTable.toolbarDensityComfortable"),

  toolbarColumns: t("dataTable.toolbarColumns"),
  toolbarColumnsLabel: t("dataTable.toolbarColumnsLabel"),

  toolbarFilters: t("dataTable.toolbarFilters"),
  toolbarFiltersLabel: t("dataTable.toolbarFiltersLabel"),
  toolbarFiltersTooltipHide: t("dataTable.toolbarFiltersTooltipHide"),
  toolbarFiltersTooltipShow: t("dataTable.toolbarFiltersTooltipShow"),
  toolbarFiltersTooltipActive: (count: number) =>
    t("dataTable.toolbarFiltersTooltipActive", { count }),

  toolbarQuickFilterPlaceholder: t("dataTable.toolbarQuickFilterPlaceholder"),
  toolbarQuickFilterLabel: t("dataTable.toolbarQuickFilterLabel"),
  toolbarQuickFilterDeleteIconLabel: t(
    "dataTable.toolbarQuickFilterDeleteIconLabel"
  ),

  toolbarExport: t("dataTable.toolbarExport"),
  toolbarExportLabel: t("dataTable.toolbarExportLabel"),
  toolbarExportCSV: t("dataTable.toolbarExportCSV"),
  toolbarExportPrint: t("dataTable.toolbarExportPrint"),

  columnsManagementSearchTitle: t("dataTable.columnsManagementSearchTitle"),
  columnsManagementNoColumns: t("dataTable.columnsManagementNoColumns"),
  columnsManagementShowHideAllText: t(
    "dataTable.columnsManagementShowHideAllText"
  ),
  columnsManagementReset: t("dataTable.columnsManagementReset"),

  filterPanelAddFilter: t("dataTable.filterPanelAddFilter"),
  filterPanelRemoveAll: t("dataTable.filterPanelRemoveAll"),
  filterPanelDeleteIconLabel: t("dataTable.filterPanelDeleteIconLabel"),
  filterPanelLogicOperator: t("dataTable.filterPanelLogicOperator"),
  filterPanelOperator: t("dataTable.filterPanelOperator"),
  filterPanelOperatorAnd: t("dataTable.filterPanelOperatorAnd"),
  filterPanelOperatorOr: t("dataTable.filterPanelOperatorOr"),
  filterPanelColumns: t("dataTable.filterPanelColumns"),
  filterPanelInputLabel: t("dataTable.filterPanelInputLabel"),
  filterPanelInputPlaceholder: t("dataTable.filterPanelInputPlaceholder"),

  filterOperatorContains: t("dataTable.filterOperatorContains"),
  filterOperatorDoesNotContain: t("dataTable.filterOperatorDoesNotContain"),
  filterOperatorEquals: t("dataTable.filterOperatorEquals"),
  filterOperatorDoesNotEqual: t("dataTable.filterOperatorDoesNotEqual"),
  filterOperatorStartsWith: t("dataTable.filterOperatorStartsWith"),
  filterOperatorEndsWith: t("dataTable.filterOperatorEndsWith"),
  filterOperatorIsEmpty: t("dataTable.filterOperatorIsEmpty"),
  filterOperatorIsNotEmpty: t("dataTable.filterOperatorIsNotEmpty"),
  filterOperatorIsAnyOf: t("dataTable.filterOperatorIsAnyOf"),

  columnMenuLabel: t("dataTable.columnMenuLabel"),
  columnMenuShowColumns: t("dataTable.columnMenuShowColumns"),
  columnMenuFilter: t("dataTable.columnMenuFilter"),
  columnMenuHideColumn: t("dataTable.columnMenuHideColumn"),
  columnMenuUnsort: t("dataTable.columnMenuUnsort"),
  columnMenuSortAsc: t("dataTable.columnMenuSortAsc"),
  columnMenuSortDesc: t("dataTable.columnMenuSortDesc"),

  columnHeaderSortIconLabel: t("dataTable.columnHeaderSortIconLabel"),

  footerTotalRows: t("dataTable.footerTotalRows"),
  footerRowSelected: (count: number) =>
    t("dataTable.footerRowSelected", { count }),
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
    t("dataTable.footerTotalVisibleRows", { visibleCount, totalCount }),

  checkboxSelectionHeaderName: t("dataTable.checkboxSelectionHeaderName"),
  checkboxSelectionSelectAllRows: t("dataTable.checkboxSelectionSelectAllRows"),
  checkboxSelectionUnselectAllRows: t(
    "dataTable.checkboxSelectionUnselectAllRows"
  ),
  checkboxSelectionSelectRow: t("dataTable.checkboxSelectionSelectRow"),
  checkboxSelectionUnselectRow: t("dataTable.checkboxSelectionUnselectRow"),

  booleanCellTrueLabel: t("dataTable.booleanCellTrueLabel"),
  booleanCellFalseLabel: t("dataTable.booleanCellFalseLabel"),

  actionsCellMore: t("dataTable.actionsCellMore"),
});