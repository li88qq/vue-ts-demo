import {ref, reactive, onMounted, toRaw, unref, computed,} from 'vue'

interface TableProps {
    opt: Object,
    query?: Function,
    params?: {},
    methods?: Object,
}

export const useTable = ({opt, query, params, methods,}: TableProps) => {
    const defaultOptions = {
        columns: [],
        dataSource: [],
        size: 'middle',
        bordered: true,
        loading: false,
        rowKey: undefined,
        rowSelection: null,
        scroll: undefined,
        pagination: {},
        onChange: () => {
        },
        onExpandedRowsChange: () => {
        }
    }
    const tableRt = reactive(Object.assign(defaultOptions, opt))

    //查询数据
    const queryAc = async () => {
        if (!query) {
            return
        }
        try {
            tableRt.loading = true
            const data = await query(toRaw(params))
            tableRt.dataSource = data;
        } catch (err) {
            console.log(err)
        } finally {
            tableRt.loading = false
        }
    }

    onMounted(async () => {
        await queryAc()
    })
    return {
        tableRt,
        queryAc,
    }
}