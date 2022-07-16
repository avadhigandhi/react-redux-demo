import React, { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button'
import { Column } from 'primereact/column';
import { getEmployee } from './service';
import { useDispatch ,useSelector ,shallowEqual} from 'react-redux'
import {setUserData} from '../../redux/Action/employee-action'
import { employeeInfoSelector } from '../../redux/selectors/custom-selectors';


const User = () => {
    let dispatch = useDispatch()
    const employeeData = useSelector(employeeInfoSelector ,shallowEqual)
    const [employeeDataList, setEmployeeData] = useState(null);
    const dt = useRef(null);

    React.useEffect(() => {
        if(employeeData && Object.keys(employeeData).length === 0){
            getEmployee().then((res) => {
                if (res.data.data.length) {
                    res.data.data.map((item) => {
                        item.count = 0
                        return 0;
                    })
                    setEmployeeData([...res.data.data])
                }
            })
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClickHandler = (rowData) => {
        let data = JSON.parse(JSON.stringify(employeeData && Object.keys(employeeData).length === 0 ? employeeDataList : employeeData))
        let index = data.findIndex(x => x.id === rowData.id)
        let count = data[index].count + 1
        data[index].count = count
        setEmployeeData([...data])
        dispatch(setUserData(data))
       
    }

    const actionBodyTemplate = (rowData) => {
        return (

            <Button icon="pi pi-eye" className="p-button-rounded p-button-success mr-2" onClick={() => { onClickHandler(rowData) }} />

        );
    }

    return (
        <>
            <h1>Employee Details </h1>
            <DataTable ref={dt} value={employeeData && Object.keys(employeeData).length === 0 ? employeeDataList : employeeData} selection={setEmployeeData}
                dataKey="id"
            >
                <Column field="employee_name" header="Employee Name" style={{ minWidth: '12rem' }}></Column>
                <Column field="employee_salary" header="Employee Salary" style={{ minWidth: '16rem' }}></Column>
                <Column field="employee_age" header="Employee Age" style={{ minWidth: '16rem' }}></Column>
                <Column field="count" header="Watch Count" style={{ minWidth: '16rem' }}></Column>
                <Column body={actionBodyTemplate} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </>
    )
}
export default React.memo(User)
