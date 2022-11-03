import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import style from "./Table.module.css";
import _ from "lodash";
import * as constants from "./Table-constants.js";

const columns = [
  {
    Header: constants.CUSTOMER,
    accessor: constants.accNAME,
    Cell: row => <div className={style.row}>{row.value}</div>
  },
  {
    Header: constants.TRANSACTIONS,
    accessor: constants.accTOTAL_TRANSACTION,
    Cell: row => <div className={style.row}>{row.value}</div>
  },
  {
    Header: constants.REWARDS,
    accessor: constants.accPOINTS,
    Cell: row => <div className={style.row}>{row.value}</div>
  },
  {
    Header: constants.TOTAL_REWARDS,
    accessor: constants.accTOTAL_POINTS,
    Cell: row => <div className={style.row}>{row.value}</div>
  },
  {
    Header: constants.MONTH,
    accessor: constants.accMONTH,
    Cell: row => <div className={style.row}>{row.value}</div>
  }
];

const columns_sub = [
  {
    Header: constants.TRANSACTION_DATE,
    accessor: constants.accTXN_DATE,
    Cell: row => <div className={style.row}>{row.value}</div>
  },
  {
    Header: constants.AMOUNT,
    accessor: constants.acc_AMOUNT,
    Cell: row => <div className={style.row}>${row.value}</div>
  },
  {
    Header: constants.POINTS,
    accessor: constants.accPOINTS,
    Cell: row => <div className={style.row}>{row.value}</div>
  }
];

export class Table extends Component {
  getUserTransactionInfo = row => {
    debugger;
    let byCustMonth = _.filter(this.props.data.pointsPerTransaction, tRow => {
      return (
        row.original.custid === tRow.custid &&
        row.original.monthNumber === tRow.month
      );
    });
    return byCustMonth;
  };
  render() {
    return (
      <div>
        <div>
          <h2 className={style.tblheader}>
            Points Table For Each Customer Per Month
          </h2>
          <br></br>
        </div>
        <ReactTable
          showPagination={false}
          data={this.props.data.summaryByCustomer}
          defaultPageSize={this.props.data.summaryByCustomer.length}
          className={style.data}
          columns={columns}
          SubComponent={row => {
            return (
              <ReactTable
                showPagination={false}
                defaultPageSize={this.getUserTransactionInfo(row).length}
                data={this.getUserTransactionInfo(row)}
                columns={columns_sub}
              />
            );
          }}
        />
      </div>
    );
  }
}
export default Table;
