const dashboard_prefix = "/dashboard";

export const urlRoutes = {
  DASHBOARD: dashboard_prefix + "/-",
  CREATE_TICKET: dashboard_prefix + "/tickets",
  PERMISSIONS: dashboard_prefix + "/user-management",
  PROFILE: dashboard_prefix + "/profile",
  TICKETS: dashboard_prefix + "/tickets?page=1",
  ADVANCE_SETTINGS: dashboard_prefix + "/advance-settings",
  BILLING: dashboard_prefix + "/billing",
  PAYMENT: "/payment",
  SELECT_PLAN: "/plan-select",
  LOGIN_IN: "/login",
  REGISTER: "/singup",
  NOTES: dashboard_prefix + "/notes",
  TASKS: dashboard_prefix + "/tasks",
  INTEGRATIONS: dashboard_prefix + "/advance-settings/integrations"
};
