import React from "react";

const Categories = (props) => {
    return (
        <div className={"container mt-4"}>
            <div className={"row mb-4 text-center"}>
                <div className={"col-12"}>
                    <h4>All book categories</h4>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-12"}>
                    <table className={"table table-sm table-hover"}>
                        <thead className={"thead-dark"}>
                            <tr>
                                    <th scope={"col"}>Category name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.categories.map((category) => {
                            return (
                              <tr>
                                  <td>{category}</td>
                              </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Categories;