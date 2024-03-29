const DOMAIN = "trooptrack.com";
const BASE_URL = `https://${DOMAIN}`;
export default {
  BASE_URL: BASE_URL,
  RESET_PASSWORD_URL: `${BASE_URL}/password_resets/new`,
  RESET_USERNAME_URL: `${BASE_URL}/forgot_user_names/new`,
  TROOPTRACK_SELECTOR_URL: `${BASE_URL}/troop_selector`,
  JWT_ENPOINT: `${BASE_URL}/jwt`,
  DOMAIN: DOMAIN,
  ACCOUNT_SESSION: `${DOMAIN}/user_account_session`,
  SIGN_UP:`${BASE_URL}/signups/new`
};
