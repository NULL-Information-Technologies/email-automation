import CampaignsDashboard from "../pages/Campaigns/CampaignsDashboard";
import Dashboard from "../pages/Dashboard/Dashboard";
import MailListDashboard from "../pages/MailList/MailListDashboard";
import TemplatesDashboard from "../pages/Templates/TemplatesDashboard";

export const userRoutes = [
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "campaigns",
    component: CampaignsDashboard,
  },
  {
    path: "mail-list",
    component: MailListDashboard,
  },
  {
    path: "templates",
    component: TemplatesDashboard,
  },
];
