import React from "react";

const ListTabs = props => {
  const { data, onItemSelect, selectedItem } = props;
  return (
    <div
      className="nav flex-column nav-pills"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      {data.map(option => (
        <a
          key={option.id}
          href={"#" + option.name}
          aria-controls={option.name}
          onClick={() => onItemSelect(option.id)}
          className={
            option.id === selectedItem ? "nav-link active" : "nav-link"
          }
          id="v-pills-profile"
          data-toggle="pill"
          aria-selected="true"
          role="tab"
        >
          {option.name}
        </a>
      ))}
    </div>
  );
};

export default ListTabs;
