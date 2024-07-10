import { useState } from "react"
import { AppBar, Box, Button, Drawer, Toolbar } from "@mui/material"
import { ThemeProvider, useTheme } from "@mui/material/styles"
import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import { appTheme } from "../constants/theme.constant"
import {
  ADD_MOVIES_ENDPOINT,
  HOME_ENDPOINT,
  LOGIN_ENDPOINT,
  PROFILE_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "../constants/strings"
import { useAuthPage } from "../hooks/useAuthPage"
import LinearProgressIndicator from "./LinearProgressIndicator"
import useLogin from "../hooks/useLogin"
import useMediaQuery from "@mui/material/useMediaQuery"

export function NavBar() {
  const { isUserLoggedIn, logout } = useLogin()
  const isAuthPage = useAuthPage()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const renderButtons = () => (
    <>
      {!isAuthPage && !isUserLoggedIn() && (
        <>
          <Link to={SIGNUP_ENDPOINT}>
            <Button
              variant="text"
              style={{
                marginRight: "20px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              SIGNUP
            </Button>
          </Link>
          <Link to={LOGIN_ENDPOINT}>
            <Button variant="contained" sx={{ borderRadius: 2 }}>
              LOGIN
            </Button>
          </Link>
        </>
      )}
      {!isAuthPage && isUserLoggedIn() && (
        <>
          <Link to={HOME_ENDPOINT}>
            <Button
              variant="text"
              style={{
                marginRight: "20px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              SAVED MOVIES
            </Button>
          </Link>
          <Link to={ADD_MOVIES_ENDPOINT}>
            <Button
              variant="text"
              style={{
                marginRight: "20px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              ADD MOVIES
            </Button>
          </Link>
          <Link to={PROFILE_ENDPOINT}>
            <Button
              variant="text"
              style={{
                marginRight: "20px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              PROFILE
            </Button>
          </Link>
          <Link to={LOGIN_ENDPOINT} replace>
            <Button
              onClick={logout}
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              LOGOUT
            </Button>
          </Link>
        </>
      )}
    </>
  )

  return (
    <ThemeProvider theme={appTheme}>
      <AppBar
        position="fixed"
        style={{
          background: "white",
        }}
      >
        <LinearProgressIndicator />
        <Toolbar variant="dense" style={{ padding: "20px", justifyContent: 'space-between' }}>
          <img
            src={logo}
            alt="App Icon"
            style={{
              width: "90px",
              height: "40px",
              marginRight: "10px",
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {isMobile ? (
            <>
              <Button onClick={handleDrawerToggle}>Menu</Button>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{
                    width: 250,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {renderButtons()}
                </Box>
              </Drawer>
            </>
          ) : (
            renderButtons()
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
