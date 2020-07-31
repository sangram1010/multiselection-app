import React, { Component } from "react";
import ListItems from "./ListItems"
import CategoriesData from "./Data"
import "./App.css";

const CategoriesContext = React.createContext();


class App extends Component {
    
    constructor(props) {
        super(props);
        console.log(CategoriesData)
    }



    render() {
        return (
            <div>
                <ListItems ListData={CategoriesData}></ListItems>
            </div>
        );
    }
}

export default App;