import React, { Component } from "react";
import "./ListItems.css";

class ListItems extends Component {
  constructor(props) {
    super(props);

    props.ListData.forEach((cat) => {
      cat["show"] = false;
      if (cat.sublist && cat.sublist.length > 0) {
        cat.sublist.forEach((subcat) => {
          subcat["show"] = false;
          subcat.sublist.forEach((subprod) => {
            subprod["show"] = false;
          });
        });
      }
    });
    this.state = { ...props, showDoneBtn: false, showSelected: false };
    this.initialState = this.state;
    this.showDoneBtn = false;
    this.setState(this.state);
    console.log(this.state.ListData[2].sublist[1].sublist[0]);
  }

  toggleSubList(id) {
    let index;
    let clonedState = JSON.parse(JSON.stringify(this.state));
    index = clonedState.ListData.findIndex((p) => p.id === id);

    if (index === -1) {
      clonedState.ListData.forEach((cat) => {
        index = cat.sublist.findIndex((p) => p.id === id);
        if (index === -1) {
          cat.sublist.forEach((subcat) => {
            index = subcat.sublist.findIndex((p) => p.id === id);
            if (index === -1) {
              console.log("No such Id");
            } else {
              console.log("sub prod selected");
              subcat.sublist[index].show = !subcat.sublist[index].show;
              this.setState(clonedState);
              this.toggleShowButton(clonedState);
              this.initialState = clonedState;
              return;
            }
          });
        } else {
          cat.sublist[index].show = !cat.sublist[index].show;
          this.setState(clonedState);
          this.initialState = clonedState;
          return;
        }
      });
    } else {
      clonedState.ListData[index].show = !clonedState.ListData[index].show;
      this.setState(clonedState);
      this.initialState = clonedState;
      return;
    }
  }

  toggleShowButton(clonedState) {
    clonedState.showDoneBtn = false;
    clonedState.ListData.forEach((cat) => {
      cat.sublist.forEach((subcat) => {
        let i = subcat.sublist.findIndex((p) => p.show === true);
        if (i !== -1) {
          clonedState.showDoneBtn = true;
          return;
        }
      });
    });
    this.setState(clonedState);
  }

  onChangeSubCategoryHandler(subcategory, e) {
    if (e.target.value !== "") {
      let clonedState = JSON.parse(JSON.stringify(this.state));
      let result = subcategory.sublist.filter((d) => {
        return d.name.toUpperCase().includes(e.target.value.toUpperCase());
      });
      if (result && result.length > 0) {
        let index = clonedState.ListData.findIndex(
          (p) => p.id === subcategory.id
        );
        if (index !== -1) {
          clonedState.ListData[index].sublist = result;
        }
      }
      this.setState(clonedState);
    } else {
      this.setState(this.initialState);
    }
  }

  onChangeSubProductHandler(subproduct, e) {
    if (e.target.value !== "") {
      let clonedState = JSON.parse(JSON.stringify(this.state));
      let result = subproduct.sublist.filter((d) => {
        return d.name.toUpperCase().includes(e.target.value.toUpperCase());
      });
      if (result && result.length > 0) {
        clonedState.ListData.forEach((cat) => {
          let index = cat.sublist.findIndex((p) => p.id === subproduct.id);
          if (index !== -1) {
            cat.sublist[index].sublist = result;
          }
        });
      }
      this.setState(clonedState);
    } else {
      this.setState(this.initialState);
    }
  }

  addProduct() {}

  addSubCategory() {}

  addSubProduct() {}

  showSelected() {}

  render() {
    return (
      <div>
        <div className="mainContainer">
          <label>Products</label>
          {this.state.showDoneBtn ? (
            <button
              className="doneBtn"
              onClick={() => {
                this.showSelected.bind(this);
              }}
            >
              Done
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="container">
          {this.state.ListData.map((category, index) => (
            <div key={index}>
              <div
                className="listitem"
                key={category.id}
                onClick={() => {
                  this.toggleSubList(category.id);
                }}
              >
                <label>
                  {category.name}
                  {category.show &&
                  this.state.ListData[index].id === category.id ? (
                    <i className="fa fa-check iconSelected"></i>
                  ) : (
                    ""
                  )}
                </label>
              </div>

              {category.show &&
                category.sublist.map((subcategory, index) => (
                  <div key={index}>
                    {index === 0 ? (
                      <div>
                        <label className="listTitle">
                          Subcategories
                          <i className="fa fa-caret-down iconCaret"></i>
                        </label>
                        <input
                          className="inputFilter"
                          placeholder="Search"
                          onChange={this.onChangeSubCategoryHandler.bind(
                            this,
                            category
                          )}
                        ></input>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className="listitem listItemSubCat"
                      key={subcategory.id}
                      onClick={() => {
                        this.toggleSubList(subcategory.id);
                      }}
                    >
                      <label>
                        {subcategory.name}
                        {subcategory.show &&
                        category.sublist[index].id === subcategory.id ? (
                          <i className="fa fa-check iconSelected"></i>
                        ) : (
                          ""
                        )}
                      </label>
                    </div>
                    {subcategory.show &&
                      subcategory.sublist.map((subproduct, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <div>
                              <label className="listTitle">
                                Subproducts{" "}
                                <i className="fa fa-caret-down iconCaret"></i>{" "}
                              </label>
                              <input
                                className="inputFilter"
                                placeholder="Search"
                                onChange={this.onChangeSubProductHandler.bind(
                                  this,
                                  subcategory
                                )}
                              ></input>
                            </div>
                          ) : (
                            ""
                          )}
                          <div
                            className="listitem listItemSubProd"
                            key={subproduct.id}
                            onClick={() => {
                              this.toggleSubList(subproduct.id);
                            }}
                          >
                            <label>
                              {subproduct.name}
                              {subproduct.show &&
                              subcategory.sublist[index].id ===
                                subproduct.id ? (
                                <i className="fa fa-check iconSelected"></i>
                              ) : (
                                ""
                              )}
                            </label>
                          </div>
                          {index === subcategory.sublist.length - 1 ? (
                            <div className="buttonContainer">
                              <button
                                className="productBtn"
                                onClick={() => {
                                  this.addSubProduct();
                                }}
                              >
                                + Add Subproducts
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    {index === category.sublist.length - 1 ? (
                      <div className="buttonContainer">
                        <button
                          className="productBtn"
                          onClick={() => {
                            this.addSubProduct();
                          }}
                        >
                          + Add Subcategories
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </div>
          ))}
          <div className="buttonContainer">
            <button
              className="productBtn"
              onClick={() => {
                this.addProduct();
              }}
            >
              + Add Product
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItems;
