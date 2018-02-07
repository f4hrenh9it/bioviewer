package phoenix

import (
	"github.com/lulunevermind/bioviewer/back/logger"
	"database/sql"
	"fmt"
)

func Request(requestString string) []map[string]string {
	results := make([]map[string]string, 0)

	if requestString == "" {
		logger.Slog.Infow("Phoenix sql request is empty")
		return results
	}

	rows, err := Phoenix.Query(requestString)
	if err != nil {
		panic(err)
	}
	// если нет результатов, запрос ddl
	if rows.NextResultSet() == false {
		return results
	}

	columnNames, err := rows.Columns()
	if err != nil {
		fmt.Printf("err = %s", err.Error())
	}

	cnl := len(columnNames)
	columnPointers := make([]interface{}, cnl)
	for i := 0; i < cnl; i++ {
		columnPointers[i] = new(sql.RawBytes)
	}

	for rows.Next() {
		rows.Scan(columnPointers...)
		resRow := map[string]string{}
		for i := 0; i < cnl; i++ {
			if rb, ok := columnPointers[i].(*sql.RawBytes); ok {
				resRow[columnNames[i]] = string(*rb)
			}
		}
		results = append(results, resRow)
	}
	return results
}