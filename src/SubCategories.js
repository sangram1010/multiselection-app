import React, { Component } from "react";
import SubProducts from "./SubProducts";
import ListItems from "./ListItems";

class SubCategories extends Component {
    constructor(props) {
        super(props);
      
    }

    render() { //ListData={SubCategoriesData}  <ListItems ></ListItems>
        return (
            <div>
                
                 <SubProducts></SubProducts>
            </div>
        );
    }
}

export default SubCategories;