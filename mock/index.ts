import {MockMethod} from 'vite-plugin-mock'

const Mock = require('mockjs')
const dataList = [{
    text: '有没有猫砂推荐',
    match: 'EQ',
    id: '1'
},
    {
        text: '有没有',
        match: 'EQ',
        id: '2'
    }, {
        text: 'hello',
        match: 'IN',
        id: '3'
    }, {
        text: '在吗',
        match: 'IN',
        id: '4'
    }];
export default [
    {
        "url": '/api/detail/:id',
        "method": 'get',
        "response": ({query: {id}}) => {
            return {
                "status": "ok",
                "data": dataList.find(function (item) {
                    if (item.id === id) {
                        return item;
                    }
                })
            }
        },
    },
    {
        url: '/api/list',
        method: 'get',
        response: () => {
            return {
                status: "ok",
                data: dataList,
            }
        },
    },
] as MockMethod[]