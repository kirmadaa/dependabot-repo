import { ModuleDataFrame } from '../moduleDataFrame'
import { memo, useEffect, useState } from "react"
import SelectChildModule from "./selectChild"
import SelectParentModule from "./parentModule"
import { useDispatch } from "react-redux"
import { GET_LOOKUP_OF_MODULE } from "../../../../Redux/actions/reports"
import { list } from "../../../../Components/module";
import CreateReportApp from './CreateReportButton'
import { Plus, Trash2 } from 'react-feather'
import MultiSelectChildModule from './selectChildMultiSelect'

const ReportCreationBoard = () => {
    const [loopdata, setLoopData] = useState([])
    const [parentModuleItem, setParentModuleItem] = useState(null)
    const [valueByIndex, setValueByIndex] = useState([])
    const [isMultiSelect, setIsMultipleSelect] = useState(false)
    const dispatch = useDispatch()

    const handleMainModuleSelect = async (value) => {
        if (ModuleDataFrame[value]) {
            setLoopData([{ [value]: ModuleDataFrame[value], select: false }])
        } else {
            let res = await dispatch(GET_LOOKUP_OF_MODULE(value))
            if (res?.length > 0) {
                let items = []
                for (let item of res) {
                    items.push(item?.formTitle)
                }
                setLoopData([{ [value]: items }])
            } else {
                setLoopData([])
            }
        }
    }

    const handleChildModuleSelect = async (value, i) => {
        if (isMultiSelect) {
            let items = valueByIndex
            if(valueByIndex.includes(value)){
                items = valueByIndex?.filter(item => item !== value)
                setValueByIndex(items)
            }else{
                items?.push(value)
                const uniqueArray = [...new Set(items)];
                setValueByIndex(uniqueArray)
            }
           
        } else {
            if (valueByIndex?.length - 1 > i) {
                let itemsis = valueByIndex?.splice(0, i)
                setValueByIndex(itemsis?.length === 0 ? [value] : itemsis)
            } else if (valueByIndex?.length > 0) {
                setValueByIndex([...valueByIndex, value])
            } else {
                setValueByIndex([value])
            }

            if (ModuleDataFrame[value]) {
                setLoopData([...loopdata, { [value]: ModuleDataFrame[value], select: false }])
            } else {
                let res = await dispatch(GET_LOOKUP_OF_MODULE(value))
                if (res?.length > 0 && loopdata?.length > 0) {
                    let lastItem = loopdata[loopdata?.length - 1]
                    if (!lastItem[value]) {
                        let items = []
                        for (let item of res) {
                            items.push(item?.formTitle)
                        }
                        setLoopData([...loopdata, { [value]: items, select: false }])
                    } else {
                        setLoopData([...loopdata, { [value]: [], select: false }])
                    }
                } else {
                    if (loopdata?.length - 1 > i) {
                        let items = []
                        let index = 0
                        for (let item of loopdata) {
                            if (index <= i) {
                                items.push({ ...item, select: false })
                            }
                            index = index + 1
                        }
                        items.push({ [value]: [] })
                        setLoopData(items)
                        return
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (parentModuleItem) {
            handleMainModuleSelect(parentModuleItem)
        }
        // eslint-disable-next-line
    }, [parentModuleItem])

    const handleDelete = (i) => {
        let itemsis = valueByIndex?.splice(0, i)
        setValueByIndex(itemsis)
        let loopdataValue = loopdata?.splice(0, i)
        setLoopData(loopdataValue)
    }

    const handleAdd = (index) => {
        let items = loopdata.map((item, i) => {
            if (i === index) {
                item['select'] = true
            }
            return item
        })
        setLoopData(items)
    }
    console.log(loopdata, "loppeData")
    // console.log(loopdata)
    return (
        <div className="w-full h-[80dvh] overflow-scroll relative px-3 py-1">
            <div className="  flex justify-between items-center ">
                <h1 className="font-[500] text-lg">Select Related Modules</h1>
                <div className='flex justify-start items-center space-x-4'>
                    <div className='flex justify-start items-center space-x-2'>
                        <p className='text-gray-800 text-sm'>Allow Multi Select</p>
                        <input type='checkbox' checked={isMultiSelect}
                            onChange={(e) => {
                                setValueByIndex([])
                                setIsMultipleSelect(e.target.checked)
                            }} />
                    </div>
                    <CreateReportApp
                        isMultiSelect={isMultiSelect}
                        parentModuleItem={parentModuleItem}
                        valueByIndex={valueByIndex}
                    />
                </div>
            </div>
            <br />
            <div>
                <SelectParentModule valuehooks={{ parentModuleItem, setParentModuleItem, list }} />
                {
                    loopdata?.map((item, i) => {
                        return <div className="ml-60" key={Object.keys(item)[0] + i}>
                            {Object.values(item)[0]?.length > 0 && <div style={{ marginLeft: i * 120 }}>
                                <div className="ml-12">
                                    <div className="h-20 w-0.5 bg-gray-400 " />
                                    {!item?.select ? <button onClick={() => handleAdd(i)} className='bg-primary -ml-[14px] rounded-full text-white flex justify-center items-center w-8 h-8'>
                                        <Plus size={14} />
                                    </button> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="-ml-[11px] -mt-[13px] w-6 h-6 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>}
                                </div>
                                {item?.select && <div className='flex justify-start items-start space-x-2'>
                                    <>
                                        {isMultiSelect ? <MultiSelectChildModule
                                            value={valueByIndex}
                                            index={i}
                                            options={Object.values(item)[0]}
                                            valuehooks={{ handleChildModuleSelect, loopdata }} /> :
                                            <SelectChildModule
                                                value={valueByIndex[i]}
                                                index={i}
                                                options={Object.values(item)[0]}
                                                valuehooks={{ handleChildModuleSelect, loopdata }} />
                                        }
                                        <button onClick={() => handleDelete(i)} className='w-8 bg-primary text-white h-8 rounded-full flex justify-center items-center'>
                                            <Trash2 size={15} />
                                        </button>
                                    </>
                                </div>}
                            </div>}
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default memo(ReportCreationBoard);

