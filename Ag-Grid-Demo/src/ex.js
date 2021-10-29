'use strict';

import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onCellValueChanged = (event) => {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  };

  const onRowValueChanged = (event) => {
    var data = event.data;
    console.log(
      'onRowValueChanged: (' +
        data.make +
        ', ' +
        data.model +
        ', ' +
        data.price +
        ', ' +
        data.field5 +
        ')'
    );
  };

  const onBtStopEditing = () => {
    gridApi.stopEditing();
  };

  const onBtStartEditing = () => {
    gridApi.setFocusedCell(2, 'make');
    gridApi.startEditingCell({
      rowIndex: 2,
      colKey: 'make',
    });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button
            style={{ fontSize: '12px' }}
            onClick={() => onBtStartEditing()}
          >
            Start Editing Line 2
          </button>
          <button
            style={{ fontSize: '12px' }}
            onClick={() => onBtStopEditing()}
          >
            Stop Editing
          </button>
        </div>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            defaultColDef={{
              flex: 1,
              editable: true,
            }}
            components={{ numericCellEditor: getNumericCellEditor() }}
            editType={'fullRow'}
            rowData={getRowData()}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
            onRowValueChanged={onRowValueChanged}
          >
            <AgGridColumn
              field="make"
              cellEditor="agSelectCellEditor"
              cellEditorParams={{
                values: ['Porsche', 'Toyota', 'Ford', 'AAA', 'BBB', 'CCC'],
              }}
            />
            <AgGridColumn field="model" />
            <AgGridColumn
              field="field4"
              headerName="Read Only"
              editable={false}
            />
            <AgGridColumn field="price" cellEditor="numericCellEditor" />
            <AgGridColumn
              headerName="Suppress Navigable"
              field="field5"
              suppressNavigable={true}
              minWidth={200}
            />
            <AgGridColumn
              headerName="Read Only"
              field="field6"
              editable={false}
            />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

function getRowData() {
  var rowData = [];
  for (var i = 0; i < 10; i++) {
    rowData.push({
      make: 'Toyota',
      model: 'Celica',
      price: 35000 + i * 1000,
      field4: 'Sample XX',
      field5: 'Sample 22',
      field6: 'Sample 23',
    });
    rowData.push({
      make: 'Ford',
      model: 'Mondeo',
      price: 32000 + i * 1000,
      field4: 'Sample YY',
      field5: 'Sample 24',
      field6: 'Sample 25',
    });
    rowData.push({
      make: 'Porsche',
      model: 'Boxter',
      price: 72000 + i * 1000,
      field4: 'Sample ZZ',
      field5: 'Sample 26',
      field6: 'Sample 27',
    });
  }
  return rowData;
}
function getNumericCellEditor() {
  function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
  }
  function isKeyPressedNumeric(event) {
    var charCode = getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return isCharNumeric(charStr);
  }
  function getCharCodeFromEvent(event) {
    event = event || window.event;
    return typeof event.which === 'undefined' ? event.keyCode : event.which;
  }
  function NumericCellEditor() {}
  NumericCellEditor.prototype.init = function (params) {
    this.focusAfterAttached = params.cellStartedEdit;
    this.eInput = document.createElement('input');
    this.eInput.style.width = '100%';
    this.eInput.style.height = '100%';
    this.eInput.value = isCharNumeric(params.charPress)
      ? params.charPress
      : params.value;
    var that = this;
    this.eInput.addEventListener('keypress', function (event) {
      if (!isKeyPressedNumeric(event)) {
        that.eInput.focus();
        if (event.preventDefault) event.preventDefault();
      }
    });
  };
  NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
  };
  NumericCellEditor.prototype.afterGuiAttached = function () {
    if (this.focusAfterAttached) {
      this.eInput.focus();
      this.eInput.select();
    }
  };
  NumericCellEditor.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
  };
  NumericCellEditor.prototype.isCancelAfterEnd = function () {};
  NumericCellEditor.prototype.getValue = function () {
    return this.eInput.value;
  };
  NumericCellEditor.prototype.focusIn = function () {
    var eInput = this.getGui();
    eInput.focus();
    eInput.select();
    console.log('NumericCellEditor.focusIn()');
  };
  NumericCellEditor.prototype.focusOut = function () {
    console.log('NumericCellEditor.focusOut()');
  };
  return NumericCellEditor;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
