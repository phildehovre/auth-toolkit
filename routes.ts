/**
 * An aray of routes that are accessible to the public
 * There routes do not require authentication
 * @type {string[]}
 */


export const publicRoutes = [
    "/"
]


/**
 * An array of routes that are used the authentication
 * There routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/** The prefix for API authentication routes.
 * Routes that start with this prefix 
 * are used for API authentication 
 * @type {string}
 * */

export const apiAuthRoutePrefix = "/api/auth"

/** The default redirect path after logging in 
 * @type {string}
*/

export const DEFAULT_REDIRECT_PATH = "/settings"
