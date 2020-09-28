import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"

import ChatList from "components/ChatList/ChatList"
import { HeaderContainer as Header } from "containers/HeaderContainer"

import { routes } from "../../routes"

import "./Layout.css"

export default function Layout() {
  return (
    <div className="container">
      <Header />
      <div className="main">
        <ChatList />
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Switch>
      </div>
    </div>
  )
}
