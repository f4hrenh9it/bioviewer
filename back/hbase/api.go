package hbase

import (
	"github.com/lulunevermind/bioviewer/back/logger"
	"github.com/tsuna/gohbase/filter"
	"github.com/tsuna/gohbase/hrpc"
	"github.com/lulunevermind/bioviewer/back/util"
	"context"
	"errors"
	"fmt"
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
func GetOriginals(modality Modality, intKey []byte) ([][]byte, error) {
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

	var originals [][]byte
	for {
		if orig, err := scanRsp.Next(); err == nil {
			originals = append(originals, orig.Cells[0].Value)
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
