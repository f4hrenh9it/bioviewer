import React from 'react';
import {LoadingBar} from "./ProfileLoading";
import {ErrorBar} from "./ProfileError";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ReactTable from 'react-table'
import "react-table/react-table.css";

import './Statistics.css';

export const Statistics = ({operationsUserPaged_reducer, loading}) => (
    <div>
        {loading ? <LoadingBar loading={loading}/> :
            operationsUserPaged_reducer.error ? <ErrorBar error={operationsUserPaged_reducer.error}/> :
            <ReactTable
                data={operationsUserPaged_reducer.operations}
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
    operationsUserPaged_reducer: state.operationsUserPaged_reducer,
    loading: state.loading_reducer,
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistics));