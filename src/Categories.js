import React, { Component } from "react";
import ListItems from "./ListItems"
import CategoriesData from "./Data"
import SubCategories from "./SubCategories";

const CategoriesContext = React.createContext();


class Categories extends Component {
    
    constructor(props) {
        super(props);
        console.log(CategoriesData)
    }



    render() {

        // condition SubCatList={}
        //let subCategories = <SubCategories></SubCategories>

        return (
            <div>
                <ListItems ListData={CategoriesData}></ListItems>
            </div>
        );
    }
}

export default Categories;