import React from 'react';
import {LoadingBar} from "./ProfileLoading";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ReactTable from 'react-table'
import "react-table/react-table.css";

import './Statistics.css';

export const Statistics = ({operationsUser, loading}) => (
    <div>
        {loading ? <LoadingBar loading={loading}/> :
            <ReactTable
                data={operationsUser}
                columns={[
                    {
                        Header: "address",
                        columns: [
                            {
                                Header: "address",
                                accessor: "address"
                            },
                            {
                                Header: "date",
                                accessor: "date"
                            },
                            {
                                Header: "empl_sign",
                                accessor: "empl_sign"
                            },
                            {
                                Header: "info_system",
                                accessor: "info_system"
                            },
                            {
                                Header: "op_type",
                                accessor: "op_type"
                            },
                        ]
                    },
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />}
    </div>
);

const mapStateToProps = state => ({
    operationsUser: state.operationsUser_reducer,
    loading: state.loading_reducer,
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistics));