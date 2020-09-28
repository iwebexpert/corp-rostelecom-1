import React from "react"
import ReactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import Layout from "components/Layout/Layout"

import { store } from "./store"

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
