import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Login from "./Login";
import TestRenderer from 'react-test-renderer';
import Navbar from "../../Components/Navbar/Navbar";
import { render, fireEvent, screen } from "@testing-library/react";
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";


it("renders without crashing", ()=>{
  const div = document.createElement("div")
  render(
      <BrowserRouter><Login></Login></BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
