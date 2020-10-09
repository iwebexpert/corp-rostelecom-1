import React from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Button, IconButton, Icon } from '@material-ui/core'

import './Header.scss'

export const Header = (props) => {
  const { children, user } = props
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Link className="router__link" to="/">
          <IconButton edge="start" color="inherit">
            <Icon>send</Icon>
          </IconButton>
        </Link>

        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {children}
        </Typography>

        <Link className="router__link" to="/profile">
          <Button
            color="inherit"
            startIcon={<Icon>person</Icon>}
          >
            {(user || {}).name}
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}


