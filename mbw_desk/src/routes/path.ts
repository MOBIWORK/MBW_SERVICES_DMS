export const BASE_URL = '/mbw_desk'

export const ROOTS = {
    AUTH: `/#login`,
    DASHBOARD: `${BASE_URL}/dashboard`,
  };
  
  export const paths = {
    // AUTH
    auth: ROOTS.AUTH,
    // DASHBOARD
    dashboard: {
      root: ROOTS.DASHBOARD,
      router_control: `${ROOTS.DASHBOARD}/router-control`,
      two: `${ROOTS.DASHBOARD}/two`,
      three: `${ROOTS.DASHBOARD}/three`,
      group: {
        root: `${ROOTS.DASHBOARD}/group`,
        five: `${ROOTS.DASHBOARD}/group/five`,
        six: `${ROOTS.DASHBOARD}/group/six`,
      },
    },
  };
  