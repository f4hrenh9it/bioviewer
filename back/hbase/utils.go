package hbase

import (
	"github.com/tsuna/gohbase/hrpc"
	"context"
	"github.com/lulunevermind/bioviewer/back/util"
	"github.com/satori/go.uuid"
)

func CreateFakeOperations() {
	families := map[string]map[string]string{"stats": {"name": "stats"}}

	ct := hrpc.NewCreateTable(context.Background(), []byte(OPERATIONS_TABLE), families)
	err := AdminClient.CreateTable(ct)
	util.CheckErr(err)
}

func FillFakeOperations(amount int) {
	for i := 0; i < amount; i++ {
		var err error
		key := uuid.Must(uuid.NewV4(), err)
		values := map[string]map[string][]byte{"stats": {"op_type": []byte{0, 1, 0, 1}}}
		putRequest, err := hrpc.NewPutStr(context.Background(), OPERATIONS_TABLE, key.String(), values)
		_, err = Client.Put(putRequest)
		util.CheckErr(err)
	}
}

func DeleteFakeOperations() {
	var err error
	disabled := hrpc.NewDisableTable(context.Background(), []byte(OPERATIONS_TABLE))
	deleted := hrpc.NewDeleteTable(context.Background(), []byte(OPERATIONS_TABLE))
	err = AdminClient.DisableTable(disabled)
	err = AdminClient.DeleteTable(deleted)
	util.CheckErr(err)
}
