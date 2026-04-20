import { create } from "zustand";

export type DialogType = "new" | "edit";
export interface DialogProps {
  open: boolean;
}

export interface OrganizationDialog<T = any> {
  type: DialogType;
  props: DialogProps;
  data: T | null;
}

export interface ConfirmDialog<T = any> {
  type: "new";
  props: DialogProps;
  data: T | null;
}



interface OrganizationDialogStore {
  organizationDialog: OrganizationDialog;
  confirmDialog: ConfirmDialog;

  openNewOrganizationDialog: (data?: any) => void;
  closeNewOrganizationDialog: () => void;

  openEditOrganizationDialog: (data: any) => void;
  closeEditOrganizationDialog: () => void;
}

export const useOrganizationDialogStore = create<OrganizationDialogStore>((set) => ({
  organizationDialog: {
    type: "new",
    props: { open: false },
    data: null,
  },

  confirmDialog: {
    type: "new",
    props: { open: false },
    data: null,
  },

  openNewOrganizationDialog: (data) =>
    set({
      organizationDialog: {
        type: "new",
        props: { open: true },
        data: data ?? null,
      },
    }),

  closeNewOrganizationDialog: () =>
    set({
      organizationDialog: {
        type: "new",
        props: { open: false },
        data: null,
      },
    }),

  openEditOrganizationDialog: (data) =>
    set({
      organizationDialog: {
        type: "edit",
        props: { open: true },
        data,
      },
    }),

  closeEditOrganizationDialog: () =>
    set({
      organizationDialog: {
        type: "edit",
        props: { open: false },
        data: null,
      },
    })
}));