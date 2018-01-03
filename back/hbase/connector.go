package hbase

import (
	"github.com/tsuna/gohbase"
	"github.com/tsuna/gohbase/hrpc"
	"context"
	"github.com/lulunevermind/bioviewer/back/logger"
	"github.com/lulunevermind/bioviewer/back/util"
	"errors"
	"github.com/tsuna/gohbase/filter"
)

var client gohbase.Client
var adminClient gohbase.AdminClient

func init() {
	client = gohbase.NewClient("fr00nbpadm01,fr00nbphbase02,fr00nbphbase01",
		gohbase.ZookeeperRoot("/hbase-unsecure"))
	adminClient = gohbase.NewAdminClient("fr00nbphbase01")
}

func GetInternalKey(idp string, userid string) ([]byte, error) {
	logger.Slog.Infow("Получаем внутренний ключ по idp и userid", "idp", idp, "userid", userid)
	family := map[string][]string{"meta": {"id"}}
	getRequest, err := hrpc.NewGetStr(context.Background(), IDPPREFIX+idp, userid, hrpc.Families(family))
	util.CheckErr(err)
	getRsp, err := client.Get(getRequest)
	if len(getRsp.Cells) > 1 {
		return nil, errors.New("несколько внутненних ключей на один внешний")
	}
	return getRsp.Cells[0].Value, nil
}

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
