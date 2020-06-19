import React, { Component } from 'react'
import { Input, AutoComplete } from 'antd';

const renderTitle = title => (
    <span>
        {title}
    </span>
);

const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
        </div>
    ),
});

const options = [
    {
        label: renderTitle('Libraries'),
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
        label: renderTitle('Solutions'),
        options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
        label: renderTitle('Articles'),
        options: [renderItem('AntDesign design language', 100000)],
    },
];

const Complete = () => (
    <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{
            width: 250,
        }}
        options={options}
    >
        <Input.Search size="large" placeholder="Поиск" />
    </AutoComplete>
);
export default class SearchBar extends Component {
    render() {
        return (
            <ex className="searchBar">
                <Complete />
                <style jsx>{`
        .certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
            color: #666;
            font-weight: bold;
        }

        .certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
            border-bottom: 1px solid #f6f6f6;
        }

        .certain-category-search-dropdown .ant-select-dropdown-menu-item {
            padding-left: 16px;
        }

        .certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
            text-align: center;
            cursor: default;
        }

        .certain-category-search-dropdown .ant-select-dropdown-menu {
            max-height: 300px;
        }
        //todo
        .anticon-search:before{
        content:none !important
        }
                `}</style>


            </ex>

        )
    }
}
