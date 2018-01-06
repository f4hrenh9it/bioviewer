package hbase

import (
	"github.com/lulunevermind/bioviewer/back/logger"
	"github.com/tsuna/gohbase/filter"
	"github.com/tsuna/gohbase/hrpc"
	"github.com/lulunevermind/bioviewer/back/util"
	"context"
	"errors"
	"fmt"
	"reflect"
	//"bytes"
	//"encoding/binary"
)

// Получает внутренний ключ по внешнему и имени IDP, производя поиск в таблице IDPPREFIX+IDP
func GetInternalKey(idp string, userid string) ([]byte, error) {
	logger.Slog.Infow("Получаем внутренний ключ по idp и userid", "idp", idp, "userid", userid)
	family := map[string][]string{"meta": {"id"}}
	getRequest, err := hrpc.NewGetStr(context.Background(), IDPPREFIX+idp, userid, hrpc.Families(family))
	util.CheckErr(err)
	getRsp, err := client.Get(getRequest)
	if len(getRsp.Cells) == 0 {
		return nil, errors.New("пользователь не зарегистрирован в idp")
	}
	if len(getRsp.Cells) > 1 {
		return nil, errors.New("несколько внутненних ключей на один внешний")
	}
	return getRsp.Cells[0].Value, nil
}

// Получает все оригиналы по заданной модальности
func GetOriginals(modality Modality, intKey []byte) ([]map[string]interface{}, error) {
	logger.Slog.Infow("Получаем оригинал для модальности",
		"modality", modality.String(), "table", ORIGINALPREFIX+modality.String(),
		"intKey", intKey)
	pFilter := filter.NewPrefixFilter(intKey)

	getRequest, err := hrpc.NewScanStr(context.Background(),
		ORIGINALPREFIX+modality.String(),
		hrpc.Filters(pFilter))
	util.CheckErr(err)
	scanRsp := client.Scan(getRequest)
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
				//if reflect.DeepEqual(v.Qualifier, []byte("date")) {
				//	buf := bytes.NewBuffer(v.Value)
				//	ts, err := binary.ReadVarint(buf)
				//	util.CheckErr(err)
				//	origInstance["date"] = ts
				//}
				//if k > 0 {
				//	fmt.Printf("========\n")
				//	fmt.Printf("rowKey = %s\n", v.Row)
				//	fmt.Printf("value = %s\n", v.Value)
				//	fmt.Printf("cf:qualifier = %s:%s\n", v.Family, v.Qualifier)
				//	fmt.Printf("ts = %d\n", *v.Timestamp)
				//	fmt.Printf("celltype = %s\n", *v.CellType)
				//	fmt.Printf("========\n")
				//}
			}
			originals = append(originals, origInstance)
		} else {
			break
		}
	}
	if len(originals) == 0 {
		return originals, errors.New("нет оригиналов")
	} else {
		return originals, nil
	}
}

// Изменяет метаданные регистрации (таблица еще не определена)
func PutMetaData(table string, cf string, qualifier string, value string) {
	//TODO: Продумать как хранить и изменять мету относящуюся к регистрации
	// Values maps a ColumnFamily -> Qualifiers -> Values.
	values := map[string]map[string][]byte{cf: {qualifier: []byte(value)}}
	putRequest, err := hrpc.NewPutStr(context.Background(), table, cf, values)
	util.CheckErr(err)
	rsp, err := client.Put(putRequest)
	fmt.Printf("Response of put is = %s", rsp)
}
