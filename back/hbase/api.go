package hbase

import (
	"github.com/lulunevermind/bioviewer/back/logger"
	"github.com/tsuna/gohbase/filter"
	"github.com/tsuna/gohbase/hrpc"
	"github.com/lulunevermind/bioviewer/back/util"
	"context"
	"errors"
	"reflect"
	"encoding/json"
	"github.com/lulunevermind/bioviewer/back/hbase/stats"
)

// Получает внутренний ключ по внешнему и имени IDP, производя поиск в таблице IDPPREFIX+IDP
func GetInternalKey(idp string, userid string) ([]byte, error) {
	logger.Slog.Infow("Получаем внутренний ключ по idp и userid", "idp", idp, "userid", userid)
	getRequest, err := hrpc.NewGetStr(context.Background(), IDPPREFIX+idp, userid, hrpc.Families(KEYCF))
	util.CheckErr(err)
	getRsp, err := Client.Get(getRequest)
	if err != nil {
		if err.Error() == "table not found" {
			return nil, errors.New("таблица idp не найдена в базе")
		} else {
			return nil, err
		}
	}
	if len(getRsp.Cells) > 0 {
		return getRsp.Cells[0].Value, nil
	} else {
		return nil, errors.New("пользователь не зарегистрирован в idp")
	}
}

// Получает ключи оригиналов по внутреннему ключу
func GetOriginalRows(modality Modality, intKey []byte) [][]byte {
	logger.Slog.Infow("Получаем список ключей оригиналов при помощи скана без поднятия CF",
		"modality", modality.String(), "table", ORIGINALPREFIX+modality.String(),
		"intKey", intKey)

	pFilter := filter.NewPrefixFilter(intKey)
	keyOnlyFilter := filter.NewKeyOnlyFilter(false)
	filterList := filter.NewList(1, pFilter, keyOnlyFilter)
	scanRequest, err := hrpc.NewScanStr(context.Background(),
		ORIGINALPREFIX+modality.String(),
		hrpc.Filters(filterList))
	util.CheckErr(err)

	scanRsp := Client.Scan(scanRequest)
	util.CheckErr(err)
	keys := [][]byte{}
	for {
		if orig, err := scanRsp.Next(); err == nil {
			keys = append(keys, orig.Cells[0].Row)
		} else {
			break
		}
	}
	return keys
}

func GetOriginal(modality Modality, intKey []byte) map[string]interface{} {
	logger.Slog.Infow("Получаем оригинал по ключу",
		"modality", modality.String(), "table", ORIGINALPREFIX+modality.String(),
		"intKey", intKey)
	getReq, err := hrpc.NewGetStr(context.Background(), ORIGINALPREFIX+modality.String(), string(intKey))
	util.CheckErr(err)
	getRsp, err := Client.Get(getReq)

	original := map[string]interface{}{}
	for _, v := range getRsp.Cells {
		if reflect.DeepEqual(v.Qualifier, []byte("data")) {
			original["data"] = v.Value
			original["date"] = *v.Timestamp
		}
		if reflect.DeepEqual(v.Qualifier, []byte("valid")) {
			var val bool
			json.Unmarshal(v.Value, &val)
			original["valid"] = val
		}
	}
	return original
}

// Получает все оригиналы по заданной модальности
func GetOriginals(modality Modality, intKey []byte, future chan *OriginalsFuture) {
	logger.Slog.Infow("Получаем оригиналы для модальности",
		"modality", modality.String(), "table", ORIGINALPREFIX+modality.String(),
		"intKey", intKey)

	pFilter := filter.NewPrefixFilter(intKey)
	families := map[string][]string{"modality": {"data", "valid"}}
	scanRequest, err := hrpc.NewScanStr(context.Background(),
		ORIGINALPREFIX+modality.String(),
		hrpc.Filters(pFilter), hrpc.Families(families))
	util.CheckErr(err)

	scanRsp := Client.Scan(scanRequest)
	util.CheckErr(err)

	originals := []map[string]interface{}{}
	for {
		if orig, err := scanRsp.Next(); err == nil {
			origInstance := map[string]interface{}{}
			for _, v := range orig.Cells {
				if reflect.DeepEqual(v.Qualifier, []byte("data")) {
					origInstance["data"] = v.Value
					origInstance["date"] = *v.Timestamp
				}
				if reflect.DeepEqual(v.Qualifier, []byte("valid")) {
					var val bool
					json.Unmarshal(v.Value, &val)
					origInstance["valid"] = val
				}
			}
			originals = append(originals, origInstance)
		} else {
			break
		}
	}
	if len(originals) == 0 {
		future <- NewOriginalsFuture(originals, errors.New("нет оригиналов"))
	} else {
		future <- NewOriginalsFuture(originals, nil)
	}
}

//// Изменяет метаданные регистрации (таблица еще не определена)
//func PutMetaData(table string, cf string, qualifier string, value string) {
//	//TODO: Продумать как хранить и изменять мету относящуюся к регистрации
//	// Values maps a ColumnFamily -> Qualifiers -> Values.
//	values := map[string]map[string][]byte{cf: {qualifier: []byte(value)}}
//	putRequest, err := hrpc.NewPutStr(context.Background(), table, cf, values)
//	util.CheckErr(err)
//	rsp, err := Client.Put(putRequest)
//	fmt.Printf("Response of put is = %s", rsp)
//}

func GetStatsOperations(opts ...func(*filter.List)) *stats.PageableOperations {
	var scanRequest *hrpc.Scan
	var err error

	if len(opts) == 0 {
		scanRequest, err = hrpc.NewScanStr(context.Background(), OPERATIONS_TABLE)
	} else {
		filterList := stats.NewStatsFilterList(opts...)
		scanRequest, err = hrpc.NewScanStr(context.Background(), OPERATIONS_TABLE, hrpc.Filters(filterList))
	}
	util.CheckErr(err)

	scanRsp := Client.Scan(scanRequest)
	util.CheckErr(err)

	operations := stats.NewPageableOperations(
		stats.OptionOperations(make([]map[string]interface{}, 0)),
		stats.OptionLastRowKey(nil),
	)
	for {
		if row, err := scanRsp.Next(); err == nil {
			operation := make(map[string]interface{}, 0)
			for _, v := range row.Cells {
				if reflect.DeepEqual(v.Qualifier, []byte("address")) {
					operation["date"] = *v.Timestamp
					operation["address"] = string(v.Value)
				}
				if reflect.DeepEqual(v.Qualifier, []byte("info_system")) {
					operation["info_system"] = string(v.Value)
				}
				if reflect.DeepEqual(v.Qualifier, []byte("op_type")) {
					operation["op_type"] = string(v.Value)
				}
				if reflect.DeepEqual(v.Qualifier, []byte("empl_sign")) {
					operation["empl_sign"] = string(v.Value)
				}
			}
			operations.Operations = append(operations.Operations, operation)
			operations.LastRowKey = row.Cells[0].Row
		} else {
			break
		}
	}
	return operations
}
