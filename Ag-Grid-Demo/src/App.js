import React, { useState } from 'react';
import './App.css';
import { AgGridReact,AgGridColumn } from 'ag-grid-react';
//import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
//import Delete from './Delete'
function App() {
  const [gridApi,setGridApi]=useState();
  const [tableData, setTableData] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const columnDefs = [
    { headerName: "ID", field: "id",editable:false,resizable:true},
    { headerName: "Name", field: "name"},
    { headerName: "Email", field: "email"  },
    { headerName: "phone", field: "phone" },
    { headerName: "Date of Birth", field: "dob"},
    // {
    //   headerName: "Gender", field: "gender", editable:false, floatingFilter:false, cellRendererFramework: (params) => <div>
    //     {/* <Button variant="outlined" className="btn btn-primary p-1,pl-2" onClick={() => handleUpdate(params.data)}>Update</Button> */}
    //     <select className="float-right">
    //     <option value='1'>Male</option>
    //     <option value='2'>Female</option>
    //   </select>
    //   </div>
    // },
    {
      headerName: "", field: "id", editable:false, floatingFilter:false, cellRendererFramework: (params) => <div>
        {/* <Button variant="outlined" className="btn btn-primary p-1,pl-2" onClick={() => handleUpdate(params.data)}>Update</Button> */}
        <Button variant="outlined" className="btn btn-danger" onClick={() => handleDelete(params.value)}> Delete</Button>
      </div>
    }
  ]  

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1, filter: true,
    floatingFilter: true, 
  }
  const url = `http://localhost:4000/users`
  const handleDelete = (id) => {
    console.log(tableData);
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }
  
  const onGridReady = (params) => {
    setGridApi(params);
    setGridColumnApi(params.columnApi);
    fetch("http://localhost:4000/users").then(resp => resp.json())
      .then(resp => {
        params.api.applyTransaction({ add: resp }) //adding API data to grid
      })
     
  }
 const onPaginationChange=(pageSize)=>{
   gridApi.api.paginationSetPageSize(Number(pageSize))
 }
 const onAddClick=(params)=>{
  gridApi.api.applyTransaction({add:[{}],addIndex: 0 })
  } 

  const medalCellRenderer = params => <div><Button variant="outlined" className="btn btn-danger" onClick={() => handleDelete(params.value)}>Delete</Button></div>
  const onRowValueChanged=(param)=>{
    console.log(param.data);
    if (param.data.id) {
      fetch(url + `/${param.data.id}`, {
        method: "PUT", body: JSON.stringify(param.data), headers: {
          'content-type': "application/json"
        }
       })
      //.then(resp => resp.json())
      //   .then(resp => {
      //    // handleClose()
      //     getUsers()

      //   })
    }
    else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(param.data), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          getUsers()
        })
    }
  }

  
 return (
    <div className="App">
      <h3>Ag Grid Demo</h3>
      
      <div className="row pb-2">
      <div className="col-10">
     </div>
    <div className="col-2">
        <button className="btn btn-primary btn-md pr-2" onClick={onAddClick}>Add New Record</button>
     </div>
</div>
     
      <div className="ag-theme-alpine" style={{ height: '400px' }}>
     
        <AgGridReact

// frameworkComponents={{
//   CellRenderer: CellRenderer,
// }}
        rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          columnTypes={{
            valueColumn: {
              editable: true,
              aggFunc: 'sum',
              valueParser: 'Number(newValue)',
              filter: 'agNumberColumnFilter',
            },
          }}
          onGridReady={onGridReady}
          editType={'fullRow'}
          suppressAggFuncInHeader={true}
          enableCellChangeFlash={true}
          animateRows={true}
          onRowValueChanged={onRowValueChanged}
          pagination={true}
          paginationPageSize={10}
          onAddClick={onAddClick}
         // rowSelection="multiple"
         enableGroupEdit={false}
    //  onRowDataChanged={()=>alert("hi")}
          //getQuickFilterText={}
          // paginationAutoPageSize={true}
          >
            <AgGridColumn headerName="ID" field="id" editable={false} />
            <AgGridColumn headerName="Name" field="name" />

            <AgGridColumn headerName="Email" field="email" />

            <AgGridColumn headerName="Phone" field="phone" />
            <AgGridColumn headerName="Date of Birth" field="dob" />

            <AgGridColumn headerName="A" field="a" type="valueColumn" />
            <AgGridColumn headerName="B" field="b" type="valueColumn" />


             <AgGridColumn
            headerName="Total"
            valueGetter="data.a + data.b"
            editable={false}
            aggFunc="sum"
            cellClass="total-col"
          />
            <AgGridColumn headerName="" field="id" editable={false} cellRenderer="CellRenderer" /> 

          
        </AgGridReact>
      </div>
      <div className="row pt-2">
      <div className="col-10"></div>
      <div className="col-2">
      <select className="float-right" onChange={(e)=>onPaginationChange(e.target.value)}>
        <option value='10'>10</option>
        <option value='15'>15</option>
        <option value='20'>20</option>
        <option value='25'>25</option>
      </select>
      </div>
       </div>
    </div>
  );
}

export default App;