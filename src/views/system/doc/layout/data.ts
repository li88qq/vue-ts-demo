export const initColumns = [
    {
        key: 'index', title: '序号', customRender: ({index = 0}) => {
            return `${index}`
        }
    },
    {dataIndex: 'id', title: 'id'},
    {dataIndex: 'name', title: 'name'},
    {dataIndex: 'age', title: 'age'},
    {dataIndex: 'score', title: 'score'},
    {key: 'action', title: 'action'},
]

export const formItems = [
    {type: 'Input', props: {label: '名称', name: 'name'}},
    {type: 'Select', props: {label: '状态', name: 'state'}},
    {type: 'Select', props: {label: '性别', name: 'age'}},
    {type: 'Input', props: {label: '手机号码', name: 'mobile'}},
    {type: 'Input', props: {label: '成绩', name: 'score'}},
]